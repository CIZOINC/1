class V1::VideosController < V1::ApiController
  before_action :set_video, only: [:show, :destroy, :update]

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
    timestamp = Time.now.to_i
    @video = Video.find(params[:id])
    s3 = Aws::S3::Resource.new(region: "us-west-2")
    obj = s3.bucket('cizo-example').object("#{@video.id}/#{params[:filename]}_#{timestamp}")
    url = URI.parse(obj.presigned_url(:put, acl: 'public-read', expires_in: 3600))

    body = File.read('/home/karetnikov_kirill/Turkey Dubstep [high].mp4')
    Net::HTTP.start(url.host) do |http|
      http.send_request("PUT", url.request_uri, body, {
        "content-type" => "",
      })
    end
    @url = url
  end

  private

  def videos_params
    params.permit(:id, :title, :description, :mpaa_rating, :category_id, :tag_list)
  end

  def method_name

  end
  def set_video
    @video = Video.find(params[:id])
  end

end
