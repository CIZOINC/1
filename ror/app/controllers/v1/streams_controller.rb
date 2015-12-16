class V1::StreamsController < V1::ApiController
  before_action :set_video, only: [:show, :create, :raw_stream_upload_request]
  before_action :set_stream, only: :show
  before_action :check_for_requirement, only: :show
  before_action :set_region, only: [:raw_stream_upload_request, :create, :destroy, :transcode_notification]
  before_action :set_pipeline, only: [:create, :transcode_notification]

  def show
    render :show, status: 302, location: @stream.link
  end

  def raw_stream_upload_request
    s3 = Aws::S3::Resource.new(region: @region)
    bucket = s3.bucket('cizo-assets')
    file_folder = (Rails.env == 'production') ? "production/raw/#{@video.id}/" : "staging/raw/#{@video.id}/"
    filename = "#{params[:filename]}"
    @video.update_attribute(:raw_filename, filename)
    obj = bucket.object(file_folder + filename)
    @url = URI.parse(obj.presigned_url(:put, acl: 'public-read', expires_in: 300))

    body = File.read('/home/karetnikov_kirill/Downloads/Simpsons.mp4')
    Net::HTTP.start(@url.host) do |http|
        http.send_request("PUT", @url.request_uri, body, {
          "content-type" => "",
        })
    end
  end

  def create
    input_key_prefix = (Rails.env == 'production') ? "production/raw/#{@video.id}" : "staging/raw/#{@video.id}"
    input_key = (Rails.env == 'production') ? "production/raw/#{@video.id}/#{@video.raw_filename}" : "staging/raw/#{@video.id}/#{@video.raw_filename}"
    transcoder_client = Aws::ElasticTranscoder::Client.new(region: @region)

    input = { key: input_key }

    #HLS
      @hls_stream = @video.streams.find_by(stream_type: "hls")
      hls_160k_audio_preset_id = '1448047928709-h3supp';
      hls_464k_preset_id       = '1448047049441-dkgwlg';
      hls_664k_preset_id       = '1448047415455-oufocx';
      hls_3596k_preset_id      = '1448393146722-1iu5sc';
      hls_6628k_preset_id      = '1448048034864-8f527z';

      segment_duration = '10'
      output_key_prefix = (Rails.env == 'production') ? "production/stream/#{@video.id}/hls/" : "staging/stream/#{@video.id}/hls/"
      output_key_hls = @video.raw_filename

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

      outputs_hls = [ hls_464k, hls_664k, hls_3596k, hls_6628k, hls_160k ]
      playlist = {
        name: 'index',
        format: 'HLSv3',
        output_keys: outputs_hls.map { |output| output[:key] }
      }

      job = transcoder_client.create_job(
        pipeline_id: @pipeline_id,
        input: input,
        output_key_prefix: output_key_prefix,
        outputs: outputs_hls,
        playlists: [ playlist ])[:job]

      object = Aws::S3::Object.new(bucket_name: "cizo-assets", region: @region, key: output_key_prefix + 'index.m3u8')
      @hls_stream.update_columns(link: object.public_url, job_id: job.id) if @hls_stream

    #MP4
    web_preset_id = '1351620000001-100070'
    output_key_mp4 = (Rails.env == 'production') ? "production/stream/#{@video.id}/mp4/video.mp4" : "staging/stream/#{@video.id}/mp4/video.mp4"
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

     object = Aws::S3::Object.new(bucket_name: "cizo-assets", region: @region, key: output_key_mp4)


    @mp4_stream.update_columns(link: object.public_url, job_id: job.id) if @mp4_stream

  end

  def transcode_notification
    @stream = Stream.find_by(job_id: params[:jobId])
    @stream.update_attribute(:transcode_status, params[:state].downcase )

    #Give access to the key if job completed
    if @stream.transcode_status == 'completed'
      client = Aws::S3::Client.new(region: @region)
      if @stream.stream_type == 'mp4'
        client.put_object_acl(acl:'public-read', bucket: "cizo-assets", key: params[:outputKeyPrefix] + "video.mp4")
      elsif @stream.stream_type == "hls"
        bucket = Aws::S3::Bucket.new(region: @region, name: 'cizo-assets')
        bucket.objects(prefix: params[:outputKeyPrefix]).each do |obj|
          client.put_object_acl(acl:'public-read', bucket: bucket.name, key: obj.key)
        end
      end

    end

    #delete input file from bucket if no jobs connected with input key
    if no_more_jobs_for(params[:input][:key])
      object = Aws::S3::Object.new(bucket_name: "cizo-assets", region: @region, key: params[:input][:key])
      object.delete
    end
  end

  private

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
    @pipeline_id = (Rails.env == 'production') ? '1449264108808-yw3pko' : '1448045831910-jsofcg'
  end

  def set_stream
    @stream = @video.streams.find_by(stream_type: params[:stream_type])
  end

  def check_for_requirement
    current_user = nil
    if (@video.mpaa_rating > "G" && current_user.nil?) || (@video.mpaa_rating > "G" && !user_age_meets_requirement )
      render json: { error: 'Forbidden video.' }, status: 403
    else
      increase_view_count
    end
  end

  def user_age_meets_requirement
    #user's age should meet requirement
    true
  end

  def increase_view_count
    @video.increase_view_count! if @video
  end

end
