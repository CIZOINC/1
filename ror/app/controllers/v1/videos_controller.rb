class V1::VideosController < V1::ApiController
  before_action :set_video, only: [:show, :destroy]
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

    # unless params[:tags].blank?
    #   params[:tags].split(',').each do |tag|
    #     conditions.push("tags = (SELECT id FROM tags WHERE name = tag)")
    #     arguments[tag] = tag
    #   end
    # end

    conditions = conditions.join(" AND ")

    @videos = Video.where(conditions, arguments)
  end

  def show
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

  private

  def videos_params
    params.permit(:id, :title, :description, :mpaa_rating, :category_id, :viewable, :hero_image_link, :liked, :view_count)
  end

  def set_video
    @video = Video.find(params[:id])
  end

end
