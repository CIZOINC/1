class V1::VideosController < V1::ApiController
  before_action :set_video, only: [:show, :destroy, :update]
  before_action :set_video_by_video_id, only: [:hero_image, :like, :dislike]
  before_action :set_region, only: [:destroy]

  skip_before_action :check_if_logged_in, only:[:index, :show, :create, :update, :destroy, :hero_image, :trending]
  skip_before_action :logged_in_as_admin?, only: [:index, :show, :like, :dislike, :trending]
  skip_before_action :logged_in_as_user?, only: [:index, :show, :create, :update, :destroy, :hero_image, :trending]
  before_action :user_age_meets_requirement, only: [:index, :show, :trending], if: :current_user

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

    if @current_user && @current_user.is_admin
      @videos = @videos.order(created_at: :desc)
    else
      @videos = @videos.limit(1000).where(viewable: true)
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
      ActiveRecord::Base.transaction do
        %w(hls mp4).each do |type|
          @video.streams.build(stream_type: type).save(validate: false)
        end
      end
      render :show, status: :created, location: @video
    else
      render json: @video.errors, status: :unprocessable_entity
    end
  end

  def hero_image
    @video.hero_image = params[:file]
    @video.save(validate: false)
    nothing 202
  end

  def like
    @like = Like.find_or_create_by(user_id: @current_user.id, video_id: @video.id)
    if @like
      nothing 204
    else
      nothing 404
    end
  end

  def dislike
    @like = Like.find_by(user_id: @current_user.id, video_id: @video.id)
    @like.destroy if @like
    nothing 204
  end

  def trending
    @videos = Video.trending
    render :index
  end

  private

  def user_age_meets_requirement
    @user_age_meets_requirement = @current_user.is_admin ? true : @current_user.user_age_meets_requirement!
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

  def set_video_by_video_id
    @video = Video.find(params[:video_id])
  end

  def nothing(status)
    render nothing: true, status: status
  end

end
