class V1::VideosController < V1::ApiController
  before_action :set_video, only: [:show, :destroy, :update, :stream_upload_request]
  before_action :set_region, only: [:stream_upload_request, :destroy]
  # before_action :set_pipeline, only: [:streams]

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
    current_user = nil
    if (current_user.nil? && @video.mpaa_rating > "PG") || !user_age_meets_requirement
      @access_to_stream_denied = true
    end
  end

  def update
    if @video.update(videos_params)
      render :show, status: :created, location: @video
    else
      render json: @video.errors, status: :unprocessable_entity
    end
  end

  def destroy
    s3 = Aws::S3::Resource.new(region: @region)
    bucket = s3.bucket('cizo-assets')
    raw_folder = "staging/raw/#{@video.id}"
    stream_folder = "staging/stream/#{@video.id}"
    if @video.destroy
      bucket.objects(prefix: raw_folder).delete
      bucket.objects(prefix: stream_folder).delete
    end

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
    bucket = s3.bucket('cizo-assets')
    file_folder = "staging/raw/#{@video.id}/"
    file = "#{params[:filename]}"
    #check if folder doesn't exist on bucket
    # unless bucket.objects(prefix: file_folder) > 0
    # end
    obj = bucket.object(file_folder + file)
    @url = URI.parse(obj.presigned_url(:put, acl: 'public-read', expires_in: 300))

    body = File.read('/home/karetnikov_kirill/Downloads/Simpsons.mp4')
    Net::HTTP.start(@url.host) do |http|
        http.send_request("PUT", @url.request_uri, body, {
          "content-type" => "",
        })
    end
  end


  private

  def user_age_meets_requirement
    true
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
