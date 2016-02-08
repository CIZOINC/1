class V1::VideosController < V1::ApiController
  before_action :set_video, only: [:show, :destroy, :update, :check_if_video_deleted,:hero_image,:add_featured, :remove_featured]

  before_action only: [:create, :update, :hero_image, :destroy,:add_featured, :remove_featured] do
    doorkeeper_authorize! :admin
  end

  before_action only: [:show], if: :video_is_invisible? do
    doorkeeper_authorize! :admin
  end

  before_action :check_if_video_deleted, only: [:show, :update, :destroy, :hero_image, :add_featured, :remove_featured]
  before_action :user_age_meets_requirement, only: [:index, :show, :trending, :featured, :search, :update], if: :current_user
  before_action :check_for_file, only: [:hero_image]
  before_action :set_bucket, only: [:destroy]
  before_action :able_to_be_featured?, only: [:add_featured]

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

    unless params[:max_id].blank?
       conditions.push('id < :max_id')
       arguments[:max_id] = params[:max_id].to_i
    end

    unless params[:since_id].blank?
      conditions.push('id > :since_id')
      arguments[:since_id] = params[:since_id].to_i
    end

    if params[:visible] == 'false'
      conditions.push('visible = :visible')
      arguments[:visible] = false
      @show_invisible = true unless @current_user && as_admin?
    else
      (conditions.push('visible = :visible') && arguments[:visible] = true) unless (@current_user && as_admin?) || params[:deleted] == 'true'
    end

    conditions = conditions.join(" AND ")
    @videos = Video.where(conditions, arguments).desc_order
    @videos = @videos.tagged_with(params[:tags]) unless params[:tags].blank?

    (@current_user && as_admin?) ? (@videos = @videos.limit(limited_videos)) : (@videos = @videos.limit(limited_videos(200)))

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
    if !@video.deleted_at && @video.update_column(:deleted_at, Time.now)
      @video.set_param_to_nil(:featured, :featured_order)
      @bucket.objects(prefix: stream_folder).batch_delete!
      @bucket.objects(prefix: hero_image_path).batch_delete! if hero_image_path
    end
    head :no_content
  end

  def create
    @video = Video.new(videos_params)
    if @video.save
      render :show, status: :created, location: @video
    else
      render json: @video.errors, status: 422
    end
  end

  def hero_image
    @video.update(hero_image: params[:file]) ? nothing(202) : (render json: {errors: @video.errors}, status: 422)
  end

  def trending
    @videos = Video.trending.desc_order.limit(200)
    render :index
  end

  def search
    if search = params[:search]
      if @current_user && as_admin?
        @videos = Video.where(deleted_at: nil).full_search(search).desc_order
      else
        @videos = Video.where("visible = ? AND deleted_at IS NULL", true).full_search(search).limit(200).desc_order
      end
    end
  end

  def featured
    @featured = true
    if @current_user && as_admin?
      @videos = Video.where("featured = ? AND deleted_at IS NULL", true).order_by_featured
    else
      @videos = Video.where("featured = ? AND visible = ? AND deleted_at IS NULL", true, true).limit(200).order_by_featured
    end
  end

  def add_featured
    featured_order = params[:featured_order].try(:to_i)
    featured_videos_count = Video.where('featured = ? AND visible = ? AND deleted_at IS NULL', true, true).count
    if featured_order
      if ((@video.featured_order && featured_order > featured_videos_count) || (!@video.featured_order && featured_order > featured_videos_count + 1)) || featured_order<=0
        nothing 400
        return
      end
    end
    @video.add_featured!(featured_order) if @video
    nothing 204
  end

  def remove_featured
    @video.remove_featured! if @video
    nothing 204
  end

  private

  def videos_params
    params.permit(:title, :description, :mature_content, :visible, :category_id, :tag_list)
  end

  def set_video
    @video = Video.find(params[:id]) if params[:id]
    @video = Video.find(params[:video_id]) if params[:video_id]
  end

  def check_for_file
    render json: {error: 'File is required'}, status: 400 and return unless params[:file]
  end

  def video_is_invisible?
    !@video.visible?
  end

  def able_to_be_featured?
    render json: {error: 'Invisible videos can not be marked as featured'}, status: 400 and return if video_is_invisible?
  end

  def hero_image_path
    Rails.env.production? ? "production/images/videos/#{@video.id}" : "staging/images/videos/#{@video.id}" unless @video.hero_image.nil?
  end

end
