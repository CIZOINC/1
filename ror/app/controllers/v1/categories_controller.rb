class V1::CategoriesController < V1::ApiController
  before_action :set_category, only: [:show, :update, :destroy]
  skip_before_action :check_if_logged_in, only:[:index, :create, :update, :destroy]
  skip_before_action :logged_in_as_admin?, only: [:index]
  skip_before_action :logged_in_as_user?, only: [:index, :create, :update, :destroy]

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
      error 500
    elsif @category.errors.added?(:title, taken)
      error 409
    end
  end

  def update
    if @category.update_attributes(categories_params)
      render :show, status: 200, location: @category
    elsif @category.errors.added?(:title, blank)
      error 500
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
