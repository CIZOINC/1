class V1::VideosController < V1::ApiController
  before_action :set_video, only: [:show, :destroy, :update, :streams, :stream_transcode_request]
  before_action :set_region, only: [:stream_transcode_request, :streams]

  def index
    conditions = []
    arguments = {}

    unless params[:created_before].blank?
      conditions.push('created_at <= :created_before')
      arguments[:created_before] = params[:created_before]
    end

    unless params[:created_after].blank?
      conditions.push('created_at >= :created_after')
      arguments[:created_after] = params[:created_after]
    end

    unless params[:category].blank?
      conditions.push("category_id = (SELECT id FROM categories WHERE title = :category)")
      arguments[:category] = params[:category]
    end
    conditions = conditions.join(" AND ")

    @videos = Video.where(conditions, arguments)

    unless params[:tags].blank?
      @videos = @videos.tagged_with(params[:tags])
    end
  end

  def show
  end

  def update
    if @video.update(videos_params)
      render :show, status: :created, location: @video
    else
      render json: @video.errors, status: :unprocessable_entity
    end
  end

  def destroy
    @video.destroy
    head :no_content
  end

  def create
    @video = Video.new(videos_params)
    if @video.save
      render :show, status: :created, location: @video
    else
      render json: @video.errors, status: :unprocessable_entity
    end
  end

  def stream_transcode_request
    s3 = Aws::S3::Resource.new(region: @region)
    obj = s3.bucket('cizo-example').object("staging/raw/#{@video.id}/#{params[:filename]}")
    @url = URI.parse(obj.presigned_url(:put, acl: 'public-read', expires_in: 300))
    # puts url
      # url = URI::HTTPS.build([nil, "cizo-example.s3-us-west-2.amazonaws.com", nil, "/91/MyAwesomeFile_1449826027", "X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Credential=AKIAJWMTWVQJCMXSZGLA%2F20151211%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20151211T092707Z&X-Amz-Expires=120&X-Amz-SignedHeaders=host&x-amz-acl=public-read&X-Amz-Signature=b87e4933de6c216eb60f57f173659e55e34d81e1d78c460ed8c4cf607a363dfd", nil])

    # body = File.read('/home/karetnikov_kirill/Downloads/The+Simpsons+Movie+-+1080p+Trailer.mp4')
    # Net::HTTP.start(@url.host) do |http|
    #     http.send_request("PUT", @url.request_uri, body, {
    #       "content-type" => "",
    #     })
    # end
  end

  def streams
    if params[:type] == 'hls'
      pipeline_id = '1449830739426-81tqoj'
      input_key = "staging/raw/#{@video.id}/#{params[:filename]}"

      # HLS Presets that will be used to create an adaptive bitrate playlist.
      hls_64k_audio_preset_id = '1351620000001-200071';
      hls_0400k_preset_id     = '1351620000001-200050';
      hls_0600k_preset_id     = '1351620000001-200040';
      hls_1000k_preset_id     = '1351620000001-200030';
      hls_1500k_preset_id     = '1351620000001-200020';
      hls_2000k_preset_id     = '1351620000001-200010';

      # HLS Segment duration that will be targeted.
      segment_duration = '2'

      #All outputs will have this prefix prepended to their output key.
      output_key_prefix = "staging/stream/#{@video.id}/#{params[:filename]}/hls"

      # Create the client for Elastic Transcoder.
      transcoder_client = Aws::ElasticTranscoder::Client.new(region: @region)

      # Setup the job input using the provided input key.
      input = { key: input_key }

      #Setup the job outputs using the HLS presets.
      output_key = Digest::SHA256.hexdigest(input_key.encode('UTF-8'))

      hls_audio = {
        key: 'hlsAudio/' + output_key,
        preset_id: hls_64k_audio_preset_id,
        segment_duration: segment_duration
      }

      hls_400k = {
        key: 'hls0400k/' + output_key,
        preset_id: hls_0400k_preset_id,
        segment_duration: segment_duration
      }

      hls_600k = {
        key: 'hls0600k/' + output_key,
        preset_id: hls_0600k_preset_id,
        segment_duration: segment_duration
      }

      hls_1000k = {
        key: 'hls1000k/' + output_key,
        preset_id: hls_1000k_preset_id,
        segment_duration: segment_duration
      }

      hls_1500k = {
        key: 'hls1500k/' + output_key,
        preset_id: hls_1500k_preset_id,
        segment_duration: segment_duration
      }

      hls_2000k = {
        key: 'hls2000k/' + output_key,
        preset_id: hls_2000k_preset_id,
        segment_duration: segment_duration
      }

      outputs = [ hls_audio, hls_400k, hls_600k, hls_1000k, hls_1500k, hls_2000k ]
      playlist = {
        name: 'hls_' + output_key,
        format: 'HLSv3',
        output_keys: outputs.map { |output| output[:key] }
      }

      job = transcoder_client.create_job(
        pipeline_id: pipeline_id,
        input: input,
        output_key_prefix: output_key_prefix + output_key + '/',
        outputs: outputs,
        playlists: [ playlist ])[:job]
   elsif params[:type] == 'mp4'
     pipeline_id = '1449830739426-81tqoj'
     input_key = "staging/raw/#{@video.id}/#{params[:filename]}"

     # MP4 Presets that will be used to create an adaptive bitrate playlist.
     generic_1080p_audio_preset_id      = '1351620000001-000001';
     generic_720p_audio_preset_id       = '1351620000001-000010';
     generic_480p_16_9_audio_preset_id  = '1351620000001-000020';
     generic_480p_4_3_audio_preset_id   = '1351620000001-000030';
     generic_360p_16_9_audio_preset_id  = '1351620000001-000040';
     generic_360p_4_3_audio_preset_id   = '1351620000001-000050';

     # HLS Segment duration that will be targeted.
     segment_duration = '5'

     #All outputs will have this prefix prepended to their output key.
     output_key_prefix = "staging/stream/#{@video.id}/#{params[:filename]}.mp4"

     # Create the client for Elastic Transcoder.
     transcoder_client = Aws::ElasticTranscoder::Client.new(region: @region)

     # Setup the job input using the provided input key.
     input = { key: input_key }

     #Setup the job outputs using the HLS presets.
     output_key = Digest::SHA256.hexdigest(input_key.encode('UTF-8'))

     generic_1080p = {
       key: 'generic_1080p/' + output_key,
       preset_id: generic_1080p_audio_preset_id
     }

     generic_720p = {
       key: 'generic_720p/' + output_key,
       preset_id: generic_720p_audio_preset_id
     }

     generic_480p_16_9 = {
       key: 'generic_480p_16_9/' + output_key,
       preset_id: generic_480p_16_9_audio_preset_id
     }

     generic_480p_4_3 = {
       key: 'generic_480p_4_3/' + output_key,
       preset_id: generic_480p_4_3_audio_preset_id
     }

     generic_360p_16_9 = {
       key: 'generic_360p_16_9/' + output_key,
       preset_id: generic_360p_16_9_audio_preset_id
     }

     generic_360p_4_3 = {
       key: 'generic_360p_4_3/' + output_key,
       preset_id: generic_360p_4_3_audio_preset_id
     }

     outputs = [ generic_1080p ]
    #  playlist = {
    #    name: 'mp4_' + output_key,
    #    format: 'HLSv3',
    #    output_keys: outputs.map { |output| output[:key] }
    #  }

     job = transcoder_client.create_job(
       pipeline_id: pipeline_id,
       input: input,
       output_key_prefix: output_key_prefix + output_key + '/',
       outputs: outputs)[:job]
   end

  end

  private

  def set_region
    @region = "us-west-2"
  end

  def videos_params
    params.permit(:id, :title, :description, :mpaa_rating, :category_id, :tag_list)
  end

  def set_video
    @video = Video.find(params[:id])
  end

end
