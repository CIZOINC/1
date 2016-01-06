class V1::StreamsController < V1::ApiController
  before_action :set_video, only: [:show, :create, :raw_stream_upload_request]
  before_action :set_stream, only: :show

  before_action :set_region, only: [:raw_stream_upload_request, :create, :destroy, :transcode_notification]
  before_action :set_pipeline, only: [:create, :transcode_notification]
  # skip_before_action :check_if_logged_in, only: [:show, :create, :raw_stream_upload_request]
  # skip_before_action :logged_in_as_admin?, only: [:show]
  # skip_before_action :logged_in_as_user?, only: [:show, :create, :raw_stream_upload_request]
  before_action :check_for_requirement, only: :show

  before_action only: [:show] do
    doorkeeper_authorize! :admin, :user
  end

  def show
    render :show, status: 302, location: @stream.link
  end

  def raw_stream_upload_request
    s3 = Aws::S3::Resource.new(region: @region)
    bucket = s3.bucket(bucket_name)
    file_folder = Rails.env.production? ? "production/raw/#{@video.id}/" : "staging/raw/#{@video.id}/"

    if (filename = params[:filename]).blank?
      render json: {errors:"filename required"}, status: 403
      return
    end

    apply_format!(filename)
    unless @video.update(raw_filename: filename)
      render json: {errors: @video.errors.full_messages}
      return
    end

    @form = bucket.presigned_post(key: file_folder + filename, expires: Time.now + 300)

    # obj = bucket.object(file_folder+filename)
    # @url = URI.parse(obj.presigned_url(:put, key: file_folder + filename))
    # body = File.read('/home/karetnikov_kirill/Downloads/Simpsons.mp4')
    # Net::HTTP.start(@url.host) do |http|
    #     http.send_request("PUT", @url.request_uri, body, {
    #       "content-type" => "",
    #     })
    #   puts "Uploaded"
    # end
  end

  def create
    input_key_prefix = Rails.env.production? ? "production/raw/#{@video.id}" : "staging/raw/#{@video.id}"
    input_key = Rails.env.production? ? "production/raw/#{@video.id}/#{@video.raw_filename}" : "staging/raw/#{@video.id}/#{@video.raw_filename}"
    transcoder_client = Aws::ElasticTranscoder::Client.new(region: @region)
    input = { key: input_key }
    obj = Aws::S3::Object.new(bucket_name: bucket_name, key: input_key, region: @region)

    #check if file exists on bucket
    unless obj.exists?
      render json: { error: 'Input key does not exist on S3 bucket' }, status: 400
      return
    end

    #check for stream's status
    unless stream_meets_requirements?
      render json: { error: 'Transcode in progess' }, status: 409
      return
    end

    #HLS
    @hls_stream = @video.streams.find_by(stream_type: "hls")
    output_key_prefix_hls = Rails.env.production? ? "production/stream/#{@video.id}/hls/" : "staging/stream/#{@video.id}/hls/"
    define_hls_presets
    outputs_hls = [ define_hls_presets[0], define_hls_presets[1], define_hls_presets[2], define_hls_presets[3], define_hls_presets[4] ]
    playlist = {
      name: 'index',
      format: 'HLSv3',
      output_keys: outputs_hls.map { |output| output[:key] }
    }

    job = transcoder_client.create_job(
      pipeline_id: @pipeline_id,
      input: input,
      output_key_prefix: output_key_prefix_hls,
      outputs: outputs_hls,
      playlists: [ playlist ])[:job]

    object = Aws::S3::Object.new(bucket_name: bucket_name, region: @region, key: output_key_prefix_hls + 'index.m3u8')
    @hls_stream.update_columns(link: output_key_prefix_hls, job_id: job.id, transcode_status: 'submitted') if @hls_stream

    #MP4
    web_preset_id = '1351620000001-100070'
    output_key_prefix_mp4 =  Rails.env.production? ? "production/stream/#{@video.id}/mp4/" : "staging/stream/#{@video.id}/mp4/"
    output_key_mp4 = Rails.env.production? ? output_key_prefix_mp4 + "video.mp4" : output_key_prefix_mp4 + "video.mp4"
    @mp4_stream = @video.streams.find_by(stream_type: "mp4")
     web = {
       key: output_key_mp4,
       preset_id: web_preset_id
     }

     outputs_mp4 = [ web ]

     job = transcoder_client.create_job(
       pipeline_id: @pipeline_id,
       input: input,
       outputs: outputs_mp4)[:job]

     object = Aws::S3::Object.new(bucket_name: bucket_name, region: @region, key: output_key_mp4)
    @mp4_stream.update_columns(link: output_key_prefix_mp4, job_id: job.id, transcode_status: 'submitted') if @mp4_stream
    render nothing: true, status: 202
  end

  def transcode_notification
    @stream = Stream.find_by(job_id: params[:jobId])

    if @stream.nil?
      render nothing: true, status: 404
      return
    end

    @stream.update_attribute(:transcode_status, params[:state].downcase )

    #Give access to the key if job completed
    if @stream.transcode_status == 'completed'
      client = Aws::S3::Client.new(region: @region)
      if @stream.stream_type == 'mp4'
        client.put_object_acl(acl:'public-read', bucket: bucket_name, key: params[:outputs][0][:key])
      elsif @stream.stream_type == "hls"
        bucket = Aws::S3::Bucket.new(region: @region, name: 'cizo-assets')
        bucket.objects(prefix: params[:outputKeyPrefix]).each do |obj|
          client.put_object_acl(acl:'public-read', bucket: bucket.name, key: obj.key)
        end
      end
    end

    #delete input file from bucket if no jobs connected with input key
    if no_more_jobs_for(params[:input][:key])
      object = Aws::S3::Object.new(bucket_name: bucket_name, region: @region, key: params[:input][:key])
      object.delete
    end
    render nothing: true, status: 202
  end

  private

  def apply_format!(filename)
    filename.squish!.gsub!(" ","_")
    filename.downcase!
  end

  def define_hls_presets
    output_key_hls = @video.raw_filename
    hls_160k_audio_preset_id = '1448047928709-h3supp';
    hls_464k_preset_id       = '1448047049441-dkgwlg';
    hls_664k_preset_id       = '1448047415455-oufocx';
    hls_3596k_preset_id      = '1448393146722-1iu5sc';
    hls_6628k_preset_id      = '1448048034864-8f527z';
    segment_duration = '10'

    hls_160k = {
      key: 'hls_160k_' + output_key_hls,
      preset_id: hls_160k_audio_preset_id,
      segment_duration: segment_duration
    }

    hls_464k = {
      key: 'hls_464k_' + output_key_hls,
      preset_id: hls_464k_preset_id,
      segment_duration: segment_duration
    }

    hls_664k = {
      key: 'hls_664k_' + output_key_hls,
      preset_id: hls_664k_preset_id,
      segment_duration: segment_duration
    }

    hls_3596k = {
      key: 'hls_3596k_' + output_key_hls,
      preset_id: hls_3596k_preset_id,
      segment_duration: segment_duration
    }

    hls_6628k = {
      key: 'hls_6628k_' + output_key_hls,
      preset_id: hls_6628k_preset_id,
      segment_duration: segment_duration
    }
    [ hls_464k, hls_664k, hls_3596k, hls_6628k, hls_160k ]
  end

  def stream_meets_requirements?
    streams = @video.streams
    streams.each do |s|
      return false unless s.transcode_status == 'pending' || s.transcode_status == 'completed' || s.transcode_status == 'error' || s.transcode_status == 'canceled' || s.transcode_status.nil?
    end
  end

  #check if no progressing jobs for this input
  def no_more_jobs_for(raw_file)
    client = Aws::ElasticTranscoder::Client.new(region: @region)
    jobs = client.list_jobs_by_pipeline(pipeline_id: @pipeline_id).jobs.select{|i| i.input.key == raw_file}
    jobs.select{|job| job.output.status == "Progressing"}.empty?
  end

  def set_video
    @video = Video.find_by(id: params[:video_id])
  end

  def set_region
    @region = "us-east-1"
  end

  def set_pipeline
    @pipeline_id = Rails.env.production? ? '1449264108808-yw3pko' : '1448045831910-jsofcg'
  end

  def bucket_name
    'cizo-assets'
  end

  def set_stream
    @stream = @video.streams.find_by(stream_type: params[:stream_type])
  end

  def check_for_requirement
    if (@video.mpaa_rating > "G" && (@current_user.nil? || !@current_user.user_age_meets_requirement!))
      render json: { error: 'Forbidden video' }, status: 403
    else
      increase_view_count
    end
  end

  def increase_view_count
    @video.increase_view_count! if @video
  end

end
