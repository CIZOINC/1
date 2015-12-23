class V1::UsersController < V1::ApiController
  before_action :set_user, only: [:show, :update, :destroy]
  before_action :current_user, only: [:me, :update_self_account, :destroy_self_account, :index, :show, :update]
  before_action :admin?, only: [:index, :update, :destroy, :show]


  def index
    @users = User.all
  end

  def update
    if @user.update_attributes(users_params)
      render :show, status: 200, location: @user
    else
      render json: {errors: @user.errors.full_messages}, status: 403
    end
  end

  def show
  end

  def destroy
  end

  def me
  end

  def destroy_self_account
    if @current_user.destroy
    end
  end

  def update_self_account
    if @current_user.update_attributes(users_params)
      render :me, status: 200, location: @current_user
    else
      render json: {errors: @current_user.errors.full_messages}
    end
  end

  def likes

  end

  private

  def users_params
    params.require(:user).permit(:id, :email, :birthday, :password, :password_confirmation)
  end

  def set_user
      @user = User.find(params[:id])
  end

  def admin?
    render json: {errors: "Access denied"}, status: 403 unless @current_user.is_admin
  end

  def current_user
    @current_user = User.find(doorkeeper_token.resource_owner_id) if doorkeeper_token
    (render json: {errors: "Should be logged in"}, status: 404) && return  if @current_user.nil?
  end

end
