class V1::VideosController < V1::ApiController
  before_action :set_video, only: [:show, :destroy, :update, :check_if_video_deleted,:hero_image,:add_featured, :remove_featured]
  before_action :set_arguments, only: [:index, :trending, :search, :featured]
  before_action only: [:create, :update, :hero_image, :destroy,:add_featured, :remove_featured] do
    doorkeeper_authorize! :admin
  end

  before_action only: [:show], if: :video_is_invisible? do
    doorkeeper_authorize! :admin
  end

  before_action :check_if_video_deleted, only: [:show, :update, :destroy, :hero_image, :add_featured, :remove_featured]
  before_action :check_if_file_presents_in_params, only: [:hero_image]
  before_action :set_bucket, only: [:destroy]
  before_action :able_to_be_featured?, only: [:add_featured]

  def index
    @conditions = []

    unless params[:created_before].blank?
      @conditions.push('created_at <= :created_before')
      @arguments[:created_before] = params[:created_before]
    end

    unless params[:created_after].blank?
      @conditions.push('created_at >= :created_after')
      @arguments[:created_after] = params[:created_after]
    end

    unless params[:category].blank?
      @conditions.push("category_id = (SELECT id FROM categories WHERE canonical_title = :category)")
      @arguments[:category] = params[:category].to_canonical
      puts params[:category].to_canonical
      puts @arguments
      puts @conditions
    end

    if params[:deleted] == 'true'
      @conditions.push('deleted_at IS NOT NULL')
      @show_deleted = true #unless @current_user && as_admin?
    else
      @conditions.push('deleted_at IS NULL')
    end

    unless params[:max_id].blank?
       @conditions.push('id < :max_id')
       @arguments[:max_id] = params[:max_id].to_i
    end

    unless params[:since_id].blank?
      @conditions.push('id > :since_id')
      @arguments[:since_id] = params[:since_id].to_i
    end

    set_mature_content
    set_visibility

    @videos = Video.where(@conditions.join(" AND "), @arguments).desc_order
    @videos = @videos.tagged_with(params[:tags]) unless params[:tags].blank?

    (@current_user && as_admin?) ? (@videos = @videos.limit(limited_videos)) : (@videos = @videos.limit(limited_videos(200)))

  end

  def show
  end

  def update
    if @video.update(videos_params)
      render :show, status: :ok, location: @video
    else
      render_errors @video.errors[:codes]
    end
  end

  def destroy
    if @video.update_column(:deleted_at, Time.now)
      @video.remove_featured!
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
      render_errors @video.errors[:codes]
    end
  end

  def hero_image
    return if hero_image_errors_any?
    nothing 202 if @video.update_attributes(hero_image_unique_token: nil, hero_image: @file, hero_image_upload_status: "pending")
  end

  def trending
    @conditions = ["visible = true AND deleted_at IS NULL"]
    set_mature_content
    @videos = Video.where(@conditions.join(" AND "), @arguments).trending.limit(200)
    render :index
  end

  def search
    @conditions = ["deleted_at IS NULL"]
    if search = params[:search]
      set_mature_content
      set_visibility
      if @current_user && as_admin?
        @videos = Video.where(@conditions.join(" AND "), @arguments).full_search(search)
      else
        @conditions.push('visible = :visible')
        @arguments[:visible] = true
        @videos = Video.where(@conditions.join(" AND "), @arguments).full_search(search).limit(200)
      end
    end
  end

  def featured
    @featured = true
    @conditions = ['featured = true AND deleted_at IS NULL']
    set_mature_content
    if @current_user && as_admin?
      @videos = Video.where(@conditions.join(" AND "), @arguments).order_by_featured
    else
      @videos = Video.where(@conditions.join(" AND "), @arguments).limit(200).order_by_featured
    end
  end

  def add_featured
    featured_order = params[:featured_order].try(:to_i)
    featured_videos_count = Video.where('featured = ? AND visible = ? AND deleted_at IS NULL', true, true).count
    if featured_order
      if ( @video.featured_order && (!featured_order.in?(1..featured_videos_count)))     ||
         (!@video.featured_order && (!featured_order.in?(1..featured_videos_count + 1) ))
        render_errors ['400.6'], featured_videos_params(@video.featured)
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

  def hero_image_errors_any?
    render_errors(['422.3']) and return true if hero_image_is_uploading
    render_errors(['422.22'], hero_image_params) if hero_image_extension_not_allowed
  end

  def carrierwave_jobs
    djs = Delayed::Job.where(queue: "carrierwave")
    djs.map{|x| YAML.load(x.handler)}
  end

  def carrierwave_jobs_ids
    carrierwave_jobs.map(&:id).map(&:to_i)
  end

  def hero_image_is_uploading
    @video.id.in? carrierwave_jobs_ids
  end

  def hero_image_params
    {allowed_types: allowed_types , uploaded_file_extension: uploaded_file_extension}
  end

  def allowed_types
    extension_white_list.join(", ")
  end

  def uploaded_file_extension
    @file.original_filename.split('.').last
  end

  def extension_white_list
    %w(jpg jpeg png bmp)
  end

  def hero_image_extension_not_allowed
    !uploaded_file_extension.in? extension_white_list
  end

  def videos_params
    params.permit(:id, :title, :subtitle, :description_title, :description, :mature_content, :visible, :category_id, :tag_list)
  end

  def set_video
    @video = Video.find(params[:id]) if params[:id]
    @video = Video.find(params[:video_id]) if params[:video_id]
  end

  def video_is_invisible?
    !@video.visible?
  end

  def able_to_be_featured?
    render_errors ['400.7'] and return if video_is_invisible?
  end

  def hero_image_path
    unless @video.hero_image.nil?
      Rails.env.production? ?
        "production/images/videos/#{@video.id}" :
        "staging/images/videos/#{@video.id}"
    end
  end

  def set_arguments
    @arguments = {}
  end

end
