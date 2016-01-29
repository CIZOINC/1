class V1::ApiController < ApplicationController
  before_action :current_user
  before_action :as_admin?, if: :current_user
  helper_method :as_admin?

  def current_user
    @current_user = User.find(doorkeeper_token.resource_owner_id) if doorkeeper_token
  end

  private

  def limited_videos(limit = nil)
    params[:count].blank? ? limit : (params[:count].to_i > 200 ? 200 : params[:count].to_i)
  end

  def check_if_video_deleted
    nothing 404 if @video.deleted_at
  end

  def user_age_meets_requirement
    @user_age_meets_requirement = @current_user.is_admin ? true : @current_user.user_age_meets_requirement!
  end

  def as_admin?
    doorkeeper_token.scopes.to_s == 'admin'
  end



  def nothing(status)
    render nothing: true, status: status
  end

  def bucket_name
    'cizo-assets'
  end

  def region
    "us-east-1"
  end

end
