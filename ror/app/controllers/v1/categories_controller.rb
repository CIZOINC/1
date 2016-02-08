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
    elsif @category.errors.added?(:title, blank)
      error 422
    elsif @category.errors.added?(:title, taken)
      error 409
    end
  end

  def update
    if @category.update_attributes(categories_params)
      render :show, status: 200, location: @category
    elsif @category.errors.added?(:title, blank)
      error 422
    elsif @category.errors.added?(:title, taken)
      error 409
    end
  end

  def destroy
    @category.destroy
    head :no_content
  end

  private

  def blank
    'can\'t be blank'
  end

  def taken
    'has already been taken'
  end

  def set_category
    @category = Category.find(params[:id])
  end

  def categories_params
    params.require(:category).permit(:id, :title)
  end

  def error(status)
    render json:{error: @category.errors.full_messages}, status: status
  end

end
