class V1::CategoriesController < V1::ApiController
  before_action :set_category, only: [:show, :update, :destroy]

  def show
  end

  def index
    @categories = Category.all
  end

  def create
    @category = Category.new(categories_params)
    if current_admin.nil?
      status_403
    else
      if @category.save
        render :show, status: 200, location: @category
      elsif @category.errors.added?(:title, blank)
        error(500)
      elsif @category.errors.added?(:title, taken)
        error(409)
      end      
    end
  end

  def update
    if current_admin.nil?
      status_403
    else
      if @category.update_attributes(categories_params)
        render :show, status: 200, location: @category
      elsif @category.errors.added?(:title, blank)
        error(500)
      elsif @category.errors.added?(:title, taken)
        error(409)
      else
        render nothing: true, status: 500
      end
    end
  end

  def destroy
    if current_admin.nil?
      status_403
    else
      @category.destroy
      head :no_content
    end
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

  def current_admin
    "nil"
  end

  def categories_params
    params.require(:category).permit(:id, :title)
  end

  def status_403
    render json: {errors: "Access denied"}, status: 403
  end

  def error(status)
    render json:{error: @category.errors.full_messages}, status: status
  end
end
