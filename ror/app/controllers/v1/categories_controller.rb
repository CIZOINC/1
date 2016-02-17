class V1::CategoriesController < V1::ApiController
  before_action :set_category, only: [:show, :update, :destroy]
  before_action except: [:index, :show] do
    doorkeeper_authorize! :admin
  end

  def show
  end

  def index
    @categories = Category.all
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
    @category.destroy
    head :no_content
  end

  private

  def set_category
    @category = Category.find(params[:id])
  end

  def categories_params
    params.require(:category).permit(:title)
  end

end
