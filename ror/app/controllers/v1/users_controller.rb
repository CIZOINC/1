class V1::UsersController < V1::ApiController
  before_action :set_user, only: [:show, :update, :destroy]
  skip_before_action :check_if_logged_in, only:[:index, :show, :create, :update]
  skip_before_action :logged_in_as_admin?, only: [:index, :me, :update_self_account, :destroy_self_account, :likes]
  skip_before_action :logged_in_as_user?, only: [:index, :show, :create, :update]
  before_action :user_age_meets_requirement, only: [:likes]
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

  def me
  end

  def destroy_self_account
    if @current_user.destroy
      Doorkeeper::AccessToken.where(resource_owner_id: @current_user).destroy_all
      head :no_content
    end
  end

  def likes
    @likes = true
    @videos = Video.joins(:likes).where(likes: {user_id: @current_user.id})
  end

  def update_self_account
    if @current_user.update_attributes(users_params)
      render :me, status: 200, location: @current_user
    else
      render json: {errors: @current_user.errors.full_messages}
    end
  end

  private

  def users_params
    params.require(:user).permit(:id, :email, :birthday, :password, :password_confirmation)
  end

  def set_user
      @user = User.find(params[:id])
  end

end
