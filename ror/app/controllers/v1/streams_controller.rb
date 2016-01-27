class V1::StreamsController < V1::ApiController
  before_action only: [:raw_stream_upload_request, :create ] do
    doorkeeper_authorize! :admin
  end
  before_action :set_video, only: [:show, :create, :raw_stream_upload_request]
  before_action :set_stream, only: :show
  before_action :check_if_key_presents_in_params, only: :create
  before_action :check_if_filename_presents_in_params, only: :raw_stream_upload_request
  before_action :check_if_stream_meets_requirements?, only: :create
  before_action :set_bucket, only: [:raw_stream_upload_request, :create]
  # before_action :set_region, only: [:raw_stream_upload_request, :create, :destroy, :transcode_notification]
  before_action :set_pipeline, only: [:create, :transcode_notification]
  before_action :check_for_requirement, only: :show


  def show
    request.headers['Authorization'].clear if request.headers['Authorization']
    prefix = host + bucket_name + env + "/stream/#{@video.id}/#{@stream.stream_type}/"
    @location =   params[:stream_type] == 'mp4' ? (prefix + 'video.mp4') : (prefix + 'index.m3u8')
    redirect_to @location, status: 302
  end

  def raw_stream_upload_request
    file_folder = Rails.env.production? ? "production/raw/#{@video.id}/" : "staging/raw/#{@video.id}/"




    apply_format!(@filename)
    valid_filename?(@filename)
    @form = @bucket.presigned_post(key: file_folder + @filename, expires: Time.now + 300)

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
    check_if_object_exists(obj)
    #key = 'staging/raw/#{@video.id}/movie.mov'

    # input_key_prefix = Rails.env.production? ? "production/raw/#{@video.id}/" : "staging/raw/#{@video.id}/"
    # input_key = bucket.objects(prefix: input_key_prefix).collect(&:key).delete_if{|x| x == input_key_prefix}[0]#.map{|x| x.gsub(prefix, '')}[0]
    # puts input_key
    # input_key = Rails.env.production? ? "production/raw/#{@video.id}/#{@video.raw_filename}" : "staging/raw/#{@video.id}/#{@video.raw_filename}"



    # obj = Aws::S3::Object.new(bucket_name: bucket_name, key: input_key, region: region)

    #check if file exists on bucket



    #check for stream's status
    # check_if_stream_meets_requirements?


    bucket.objects(prefix: params[:key].gsub('raw', 'stream').split('/').take(3).join('/')).batch_delete!
    #HLS
    @hls_stream = @video.streams.find_by(stream_type: "hls")

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

    @hls_stream.update_columns(link: prefix + "videos/#{@video.id}/streams/#{@hls_stream.stream_type}", job_id: job.id, transcode_status: 'submitted') if @hls_stream

    #MP4

    # output_key_mp4 = Rails.env.production? ? output_key_prefix_mp4 + "video.mp4" : output_key_prefix_mp4 + "video.mp4"
    output_key_mp4 = output_key_prefix_mp4 + "video.mp4"
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

    @mp4_stream.update_columns(link: prefix + "videos/#{@video.id}/streams/#{@mp4_stream.stream_type}", job_id: job.id, transcode_status: 'submitted') if @mp4_stream
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
        bucket = Aws::S3::Bucket.new(region: region, name: 'cizo-assets')
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
    unless obj.exists?
      render json: { error: 'Input key does not exist on S3 bucket' }, status: 400
      return
    end
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
    # @output_key_hls = @video.raw_filename
    @output_key_hls = params[:key].split('/').last.gsub('.','_')
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

  def set_pipeline
    @pipeline_id = Rails.env.production? ? '1449264108808-yw3pko' : '1448045831910-jsofcg'
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
