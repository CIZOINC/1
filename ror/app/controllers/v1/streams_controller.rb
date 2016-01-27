class V1::StreamsController < V1::ApiController
  before_action only: [:upload_ticket, :create ] do
    doorkeeper_authorize! :admin
  end
  before_action :set_video, only: [:show, :create, :upload_ticket]
  before_action :check_if_video_deleted, only: [:show, :upload_ticket, :create]
  before_action :set_stream, only: :show
  before_action :check_if_key_presents_in_params, only: :create
  before_action :check_if_filename_presents_in_params, only: :upload_ticket
  before_action :check_if_stream_meets_requirements?, only: :create
  before_action :set_bucket, only: [:upload_ticket, :create]
  before_action :check_for_requirement, only: :show


  def show
    request.headers['Authorization'].clear if request.headers['Authorization']
    prefix = host + bucket_name + env + "/stream/#{@video.id}/#{@stream.stream_type}/"
    @location =   params[:stream_type] == 'mp4' ? (prefix + 'video.mp4') : (prefix + 'index.m3u8')
    redirect_to @location, status: 302
  end

  def upload_ticket
    apply_format!(@filename)
    valid_filename?(@filename)
    @form = @bucket.presigned_post(key: file_folder + "#{SecureRandom.uuid}/" + @filename, expires: Time.now + 300)

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
    obj = @bucket.object(@key)
    transcoder_client = Aws::ElasticTranscoder::Client.new(region: region)
    input = { key: @key }
    return if check_if_object_exists(obj)
    @bucket.objects(prefix: stream_folder).batch_delete!

    #HLS
    hls_stream = @video.streams.find_by(stream_type: "hls")
    define_hls_presets
    outputs_hls = [ define_hls_presets[0], define_hls_presets[1], define_hls_presets[2], define_hls_presets[3], define_hls_presets[4] ]
    playlist = {
      name: 'index',
      format: 'HLSv3',
      output_keys: outputs_hls.map { |output| output[:key] }
    }

    job = transcoder_client.create_job(
      pipeline_id: pipeline_id,
      input: input,
      output_key_prefix: output_key_prefix_hls,
      outputs: outputs_hls,
      playlists: [ playlist ])[:job]

    hls_stream.update_columns(link: prefix + link(hls_stream), job_id: job.id, transcode_status: 'submitted') if hls_stream

    #MP4
    mp4_stream = @video.streams.find_by(stream_type: "mp4")
    web = {
     key: output_key_prefix_mp4 + "video.mp4",
     preset_id: web_preset_id
    }

    job = transcoder_client.create_job(
     pipeline_id: pipeline_id,
     input: input,
     outputs: [web])[:job]

    mp4_stream.update_columns(link: prefix + link(mp4_stream), job_id: job.id, transcode_status: 'submitted') if mp4_stream
    nothing 202
  end

  def transcode_notification
    @stream = Stream.find_by(job_id: params[:jobId])

    if @stream.nil?
      nothing 404
      return
    end

    @stream.update_attribute(:transcode_status, params[:state].downcase )

    #Give access to the key if job completed
    if @stream.transcode_status == 'completed'
      client = Aws::S3::Client.new(region: region)
      if @stream.stream_type == 'mp4'
        client.put_object_acl(acl:'public-read', bucket: bucket_name, key: params[:outputs][0][:key])
      elsif @stream.stream_type == "hls"
        bucket = Aws::S3::Bucket.new(region: region, name: bucket_name)
        bucket.objects(prefix: params[:outputKeyPrefix]).each do |obj|
          client.put_object_acl(acl:'public-read', bucket: bucket.name, key: obj.key)
        end
      end
    end

    #delete input file from bucket if no jobs connected with input key
    # if no_more_jobs_for(params[:input][:key])
    #   object = Aws::S3::Object.new(bucket_name: bucket_name, region: region, key: params[:input][:key])
    #   object.delete
    # end
    nothing 202
  end

  private

  def set_bucket
    s3 = Aws::S3::Resource.new(region: region)
    @bucket = s3.bucket(bucket_name)
  end

  def check_if_stream_meets_requirements?
    unless stream_meets_requirements?
      render json: { error: 'Transcode in progess' }, status: 409
      return
    end
  end

  def check_if_object_exists(obj)
    render json: { error: 'Input key does not exist on S3 bucket' }, status: 400 unless obj.exists?
  end

  %w(key filename).each do |param|
    define_method("check_if_#{param}_presents_in_params") do
      unless instance_variable_set("@#{param}", params[param])#eval("@#{param}") = params[param].blank?
        render json: {errors:"#{param.capitalize} is required"}, status: 403
        return
      end
    end
  end

  def valid_filename?(filename)
    filename_regexp = /\A^[0-9a-z]+[0-9a-z\-\.\_]+[0-9a-z]$\z/
    unless filename =~ filename_regexp
      render json: {error: 'Filename must contain only lowercase letters, numbers, hyphens (-), and periods (.). It must start and end with letters or numbers'}, status: 403
      return
    end
  end

  def apply_format!(filename)
    filename.squish!.gsub!(" ","_")
    filename.downcase!
  end

  def define_hls_presets
    @output_key_hls = params[:key].split('/').last.gsub('.','_') # here we can use common name such as 'video', 'output', 'video_output or something similar to avoid this computing
    [ hls_464k, hls_664k, hls_3596k, hls_6628k, hls_160k ]
  end

  %w(hls_464k hls_664k hls_3596k hls_6628k hls_160k).each do |preset|
    define_method(preset) do
      {
        key: preset + '_'+ @output_key_hls,
        preset_id: eval("#{preset}_preset_id"),
        segment_duration: segment_duration
      }
    end
  end

  def stream_meets_requirements?
    streams = @video.streams
    streams.each do |s|
      return false unless s.transcode_status == 'pending' || s.transcode_status == 'completed' || s.transcode_status == 'error' || s.transcode_status == 'canceled' || s.transcode_status.nil?
    end
  end

  #check if no progressing jobs for this input
  # def no_more_jobs_for(raw_file)
  #   client = Aws::ElasticTranscoder::Client.new(region: region)
  #   jobs = client.list_jobs_by_pipeline(pipeline_id: @pipeline_id).jobs.select{|i| i.input.key == raw_file}
  #   jobs.select{|job| job.output.status == "Progressing"}.empty?
  # end

  def set_video
    @video = Video.find_by(id: params[:video_id])
  end

  def pipeline_id
    Rails.env.production? ? '1449264108808-yw3pko' : '1448045831910-jsofcg'
  end

  def file_folder
    Rails.env.production? ? "production/raw/#{@video.id}/" : "staging/raw/#{@video.id}/"
  end

  def bucket_name
    'cizo-assets'
  end

  def region
    "us-east-1"
  end

  def host
    'https://s3.amazonaws.com/'
  end

  def env
    Rails.env.production? ? '/production' : '/staging'
  end

  def prefix
    Rails.env.production? ? "http://api.cizo.com/" : "http://staging.cizo.com/"
  end

  #presets
  def hls_160k_preset_id
    '1448047928709-h3supp'
  end

  def hls_464k_preset_id
    '1448047049441-dkgwlg';
  end

  def hls_664k_preset_id
    '1448047415455-oufocx'
  end

  def hls_3596k_preset_id
    '1448393146722-1iu5sc'
  end

  def hls_6628k_preset_id
    '1448048034864-8f527z'
  end

  def web_preset_id
    '1351620000001-100070'
  end

  def segment_duration
    '10'
  end

  def stream_folder
    Rails.env.production? ? "production/stream/#{@video.id}/" : "staging/stream/#{@video.id}/"
  end

  def link(stream)
    "videos/#{@video.id}/streams/#{stream.stream_type}"
  end

  %w(hls mp4).each do |format|
    define_method("output_key_prefix_#{format}") do
      Rails.env.production? ? "production/stream/#{@video.id}/#{format}/" : "staging/stream/#{@video.id}/#{format}/"
    end
  end

  def set_stream
    @stream = @video.streams.find_by(stream_type: params[:stream_type])
  end


  def check_for_requirement
    render json: { error: 'Forbidden video' }, status: 403 if (@video.mature_content && (@current_user.nil? || !@current_user.user_age_meets_requirement!))
  end

end
