class V1::UsersController < V1::ApiController
  before_action :set_user, only: [:show]
  def show
  end

  def me
  end

  private

  def set_user
    @user = User.find(params[:id])
  end

  def current_resource_owner
    User.find(doorkeeper_token.resource_owner_id) if doorkeeper_token
  end
end
