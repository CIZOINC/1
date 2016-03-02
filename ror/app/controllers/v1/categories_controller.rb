class V1::CategoriesController < V1::ApiController
  before_action :set_category, only: [:show, :update, :destroy]
  before_action except: [:index, :show] do
    doorkeeper_authorize! :admin
  end

  def show
  end

  def index
    unless params[:title].blank?
      @categories = Category.where(canonical_title: params[:title].to_canonical)
    else
      @categories = Category.all
    end
  end

  def create
    @category = Category.new(categories_params)
    if @category.save
      render :show, status: 200, location: @category
    else
      render_errors @category.errors[:codes]
    end
  end

  def update
    if @category.update_attributes(categories_params)
      render :show, status: 200, location: @category
    else
      render_errors @category.errors[:codes]
    end
  end

  def destroy
    if @category.destroy
      head :no_content
    else
      videos = Video.where("deleted_at IS NULL AND category_id = ?", @category.id)
      render_errors @category.errors[:codes], videos_count:"#{(videos.count > 1) ? 'are' : 'is'} #{videos.count} #{'video'.pluralize(videos.count)}"
    end
  end

  private

  def set_category
    @category = Category.find(params[:id])
  end

  def categories_params
    params.require(:category).permit(:title)
  end

end
