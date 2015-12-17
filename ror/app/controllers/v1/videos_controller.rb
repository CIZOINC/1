class V1::VideosController < V1::ApiController
  before_action :set_video, only: [:show, :destroy, :update]
  before_action :set_region, only: [:destroy]
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
    raw_folder = (Rails.env == 'production') ? "production/raw/#{@video.id}" : "staging/raw/#{@video.id}"
    stream_folder = (Rails.env == 'production') ? "production/stream/#{@video.id}" : "staging/stream/#{@video.id}"
    hero_image = (Rails.env == 'production') ? "production/images/videos/#{@video.id}" : "staging/images/videos/#{@video.id}" unless @video.hero_image.nil?
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
    @video = Video.find(params[:video_id])
    @video.hero_image = params[:file]
    @video.save(validate: false)
    render json: {}, status: 202
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
