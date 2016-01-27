class V1::VideosController < V1::ApiController
  before_action only: [:create, :update, :hero_image, :destroy,:add_featured, :remove_featured] do
    doorkeeper_authorize! :admin
  end
  before_action :set_video, only: [:show, :destroy, :update, :check_if_video_deleted,:hero_image,:add_featured, :remove_featured]
  before_action :check_if_video_deleted, only: [:show, :update, :destroy, :hero_image, :add_featured, :remove_featured]
  before_action :set_region, only: [:destroy]
  before_action :user_age_meets_requirement, only: [:index, :show, :trending, :featured, :search, :update], if: :current_user

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

    if params[:deleted] == 'true'
      conditions.push('deleted_at IS NOT NULL')
      @show_deleted = true #unless @current_user && as_admin?
    else
      conditions.push('deleted_at IS NULL')
    end

    if params[:visible] == 'false'
      conditions.push('visible = :visible')
      arguments[:visible] = false
      @show_invisible = true unless @current_user && as_admin?
    else
      (conditions.push('visible = :visible') && arguments[:visible] = true) unless (@current_user && as_admin?) || params[:deleted] == 'true'
    end

    conditions_str = conditions.join(" AND ")
    @videos = Video.where(conditions_str, arguments).desc_order

    @videos = @videos.tagged_with(params[:tags]) unless params[:tags].blank?

  end

  def show
  end

  def update
    if @video.update(videos_params)
      render :show, status: :ok, location: @video
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
    if !@video.deleted_at && @video.update_column(:deleted_at, Time.now)
      @video.set_param_to_nil(:featured, :featured_order)
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
    @videos = Video.trending.desc_order
    render :index
  end

  def search
    if search = params[:search]
      if @current_user && as_admin?
        @videos = Video.where(deleted_at: nil).full_search(search).desc_order
      else
        @videos = Video.where("visible = ? AND deleted_at IS NULL", true).full_search(search).limit(1000).desc_order
      end
    end
  end

  def featured
    @featured = true
    if @current_user && as_admin?
      @videos = Video.where("featured = ? AND deleted_at IS NULL", true).order_by_featured
    else
      @videos = Video.where("featured = ? AND visible = ? AND deleted_at IS NULL", true, true).limit(1000).order_by_featured
    end
  end

  def add_featured
    featured_order = params[:featured_order].try(:to_i)
    if featured_order && featured_order > Video.where('deleted_at IS NULL').count
      nothing 404
      return
    end
    @video.add_featured!(featured_order) if @video
    nothing 204
  end

  def remove_featured
    @video.remove_featured! if @video
    nothing 204
  end

  private

  def set_region
    @region = "us-east-1"
  end

  def videos_params
    params.permit(:id, :title, :description, :mature_content, :visible, :category_id, :tag_list, :featured)
  end

  def set_video
    @video = Video.find(params[:id]) if params[:id]
    @video = Video.find(params[:video_id]) if params[:video_id]
  end

end
