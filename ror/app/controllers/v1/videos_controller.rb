class V1::VideosController < V1::ApiController
  before_action :set_video, only: [:show, :destroy, :update]
  before_action :set_video_by_video_id, only: [:hero_image]
  before_action :set_region, only: [:destroy]

  before_action :user_age_meets_requirement, only: [:index, :show, :trending, :featured, :search, :update], if: :current_user

  before_action only: [:create, :update, :hero_image, :destroy] do
    doorkeeper_authorize! :admin
  end

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

    if @current_user && as_admin?
      @videos = @videos.order(created_at: :desc)
    else
      @videos = @videos.order(created_at: :desc).where(viewable: true).limit(1000)
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
    s3 = Aws::S3::Resource.new(region: @region)
    bucket = s3.bucket('cizo-assets')
    raw_folder = Rails.env.production? ? "production/raw/#{@video.id}" : "staging/raw/#{@video.id}"
    stream_folder = Rails.env.production? ? "production/stream/#{@video.id}" : "staging/stream/#{@video.id}"
    hero_image = Rails.env.production? ? "production/images/videos/#{@video.id}" : "staging/images/videos/#{@video.id}" unless @video.hero_image.nil?
    if @video.destroy
      bucket.objects(prefix: raw_folder).batch_delete!
      bucket.objects(prefix: stream_folder).batch_delete!
      if hero_image
        bucket.objects(prefix: hero_image).batch_delete!
      end
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

  def hero_image
    @video.hero_image = params[:file]
    @video.save(validate: false)
    @video.update_column(:hero_image_link, @video.hero_image.url)
    nothing 202
  end

  def trending
    @videos = Video.trending
    render :index
  end

  def search
    if search = params[:search]
      if @current_user && as_admin?
        @videos = Video.full_search(search)
      else
        @videos = Video.full_search(search).where("viewable = ?", true).limit(1000)
      end
    end
  end

  def featured
    if @current_user && as_admin?
      @videos = Video.where("featured = ?", true).order(created_at: :desc)
    else
      @videos = Video.where("featured = ? AND viewable = ?", true, true).limit(1000)
    end
  end

  private

  def set_region
    @region = "us-east-1"
  end

  def videos_params
    params.permit(:id, :title, :description, :mature_content, :viewable, :category_id, :tag_list, :featured)
  end

  def set_video
    @video = Video.find(params[:id])
  end

  def set_video_by_video_id
    @video = Video.find(params[:video_id])
  end

end
