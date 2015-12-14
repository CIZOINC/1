class V1::StreamsController < V1::ApiController
  def show
    @video = Video.find(params[:video_id])
    @stream = @video.streams.find_by(stream_type: params[:stream_type])
  end
end
