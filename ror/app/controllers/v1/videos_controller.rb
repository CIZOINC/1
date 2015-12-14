class V1::VideosController < V1::ApiController
  before_action :set_video, only: [:show, :destroy, :update, :streams, :stream_upload_request]
  before_action :set_region, only: [:stream_upload_request, :streams]
  before_action :set_pipeline, only: [:streams]

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

  def stream_upload_request
    s3 = Aws::S3::Resource.new(region: @region)
    obj = s3.bucket('cizo-assets').object("staging/raw/#{@video.id}/#{params[:filename]}")
    @url = URI.parse(obj.presigned_url(:put, acl: 'public-read', expires_in: 300))

    # body = File.read('/home/karetnikov_kirill/Downloads/Simpsons.mp4')
    # Net::HTTP.start(@url.host) do |http|
    #     http.send_request("PUT", @url.request_uri, body, {
    #       "content-type" => "",
    #     })
    # end
  end

  def streams
    input_key = "staging/raw/#{@video.id}/#{params[:filename]}"
    transcoder_client = Aws::ElasticTranscoder::Client.new(region: @region)
    input = { key: input_key }

    if params[:type].include?('hls')
      #HLS
      hls_160k_audio_preset_id = '1448047928709-h3supp';
      hls_464k_preset_id       = '1448047049441-dkgwlg';
      hls_664k_preset_id       = '1448047415455-oufocx';
      hls_3596k_preset_id      = '1448393146722-1iu5sc';
      hls_6628k_preset_id      = '1448048034864-8f527z';

      segment_duration = '10'
      output_key_prefix = "staging/stream/#{@video.id}/hls/"


      output_key_hls = params[:filename]

      hls_160k_audio = {
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

      outputs_hls = [ hls_160k_audio, hls_464k, hls_664k, hls_3596k, hls_6628k ]
      playlist = {
        name: 'hls_' + output_key_hls,
        format: 'HLSv3',
        output_keys: outputs_hls.map { |output| output[:key] }
      }

      job = transcoder_client.create_job(
        pipeline_id: @pipeline_id,
        input: input,
        output_key_prefix: output_key_prefix,
        outputs: outputs_hls,
        playlists: [ playlist ])[:job]
      wait_for_job(transcoder_client, job)
    end

    if params[:type].include?('mp4')
        #MP4
       web_preset_id = '1351620000001-100070'
       output_key_mp4 = "staging/stream/#{@video.id}/mp4/video.mp4"
       web = {
         key: output_key_mp4,
         preset_id: web_preset_id
       }

       outputs_mp4 = [ web ]

       job = transcoder_client.create_job(
         pipeline_id: @pipeline_id,
         input: input,
         outputs: outputs_mp4)[:job]

      wait_for_job(transcoder_client, job)
    end
  end

  private

  def set_pipeline
    if Rails.env == 'stage' || 'development'
      @pipeline_id = '1448045831910-jsofcg'
    elsif Rails.env == 'production'
      @pipeline_id = '1449264108808-yw3pko'
    end
  end

  def wait_for_job(client, job)
    begin
      client.wait_until(:job_complete, {id: job.id}) do |w|
        w.delay = 5
        w.max_attempts = 60
        puts client.read_job(id: job.id).job.status
      end
      puts status = client.read_job(id: job.id).job.status
      if status == 'Complete'
        client = Aws::SNS::Client.new(region: @region)
        client.publish({topic_arn: "arn:aws:sns:us-east-1:667987826167:testTopicFromConsole", message: "Job Completed!"})
      end
    rescue Aws::Waiters::Errors::WaiterFailed => e
      puts e
    end

  end

  def set_region
    @region = "us-east-1"
  end

  def videos_params
    params.permit(:id, :title, :description, :mpaa_rating, :category_id, :tag_list)
  end

  def set_video
    @video = Video.find(params[:id])
  end

end
