class V1::StreamsController < V1::ApiController
  before_action :set_video, only: [:show, :create]
  before_action :set_stream, only: :show
  before_action :check_for_requirement, only: :show
  before_action :set_region, only: [:stream_upload_request, :create, :destroy]
  before_action :set_pipeline, only: [:create]

  def show
  end

  def create
    input_key_prefix = "staging/raw/#{@video.id}"
    input_key = "staging/raw/#{@video.id}/#{params[:filename]}"
    transcoder_client = Aws::ElasticTranscoder::Client.new(region: @region)
    input = { key: input_key }

    #HLS
    if params[:type].include?('hls')
      hls_160k_audio_preset_id = '1448047928709-h3supp';
      hls_464k_preset_id       = '1448047049441-dkgwlg';
      hls_664k_preset_id       = '1448047415455-oufocx';
      hls_3596k_preset_id      = '1448393146722-1iu5sc';
      hls_6628k_preset_id      = '1448048034864-8f527z';

      segment_duration = '10'
      output_key_prefix = "staging/stream/#{@video.id}/hls/"


      output_key_hls = params[:filename]

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

      @video.streams.build(link:"link", job_id: job.id, type: "hls").save(validate: false)

    end

    #MP4
    if params[:type].include?('mp4')
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

      @video.streams.build(link:"link", job_id: job.id, stream_type: "mp4").save(validate: false)
    end

  end

  def transcode_notification
    @stream = Stream.find_by(job_id: params[:jobId])
    @stream.update_attribute(:transcode_status, params[:state].downcase )
    #TODO add cases for all states
  end

  private

  def set_video
    @video = Video.find_by(id: params[:video_id])
  end

  def set_region
    @region = "us-east-1"
  end

  def set_pipeline
    if Rails.env == 'stage' || 'development'
      @pipeline_id = '1448045831910-jsofcg'
    elsif Rails.env == 'production'
      @pipeline_id = '1449264108808-yw3pko'
    end
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

  # def streams_params
  #   params.require(:stream).permit(:id, :link, :transcode_status, :stream_type)
  # end

  # def wait_for_job(client, job)
  #   begin
  #     client.wait_until(:job_complete, {id: job.id}) do |w|
  #       w.delay = 5
  #       w.max_attempts = 60
  #       puts client.read_job(id: job.id).job.status
  #     end
  #     puts status = client.read_job(id: job.id).job.status
  #     if status == 'Complete'
  #       client = Aws::SNS::Client.new(region: @region)
  #       @stream = @video.streams.build(job_id: job.id).save(validate: false)
  #       @stream.inspect
  #       client.publish({topic_arn: "arn:aws:sns:us-east-1:667987826167:testTopicFromConsole", message: "Job #{job.id} is completed!"})
  #     end
  #   rescue Aws::Waiters::Errors::WaiterFailed => e
  #     puts e
  #   end
  #
  # end

end
