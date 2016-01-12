class V1::UsersController < V1::ApiController
  before_action :set_user, only: [:show, :update, :destroy]
  before_action :set_video, only: [:like_video, :dislike_video, :mark_video_as_seen, :skip_video]
  before_action only: [:me, :destroy_self_account, :update_self_account, :show, :like_video, :dislike_video, :likes, :skipped, :skip_video, :seen, :mark_video_as_seen] do
    doorkeeper_authorize! :user, :admin
  end

  before_action only: [:index, :update, :show] do
    doorkeeper_authorize! :admin
  end

  before_action :user_age_meets_requirement, only: [:likes, :seen, :skipped, :unseen]

  def index
    @users = User.all
  end

  def update
    if @user.update_attributes(users_params)
      if tokens = Doorkeeper::AccessToken.where(resource_owner_id: @user.id)
        @user.is_admin ? set_scopes!(tokens, 'admin') : set_scopes!(tokens, 'user')
      end
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

  def like_video
    @video.like!(@current_user.id, @video.id) if @video
    nothing 204
  end

  def dislike_video
    @video.dislike!(@current_user.id, @video.id) if @video
    nothing 204
  end

  def likes
    @likes = true
    @videos = Video.joins(:likes).where(likes: {user_id: @current_user.id})
  end

  def skipped
    @skipped = true
    @skipped_videos = Video.joins(:skipped_videos).where(skipped_videos: {user_id: @current_user.id})
  end

  def skip_video
    @video.skip!(@current_user.id, @video.id) if @video
    nothing 204
  end

  def seen
    @seen = true
    @seen_videos = Video.joins(:seen_videos).where(seen_videos: {user_id: @current_user.id})
  end

  def unseen
    seen_videos_ids = Video.joins(:seen_videos).where(seen_videos: {user_id: @current_user.id}).pluck(:id)
    @unseen_videos = seen_videos_ids.empty? ? Video.all : Video.where("id not in (?)", seen_videos_ids)
  end

  def mark_video_as_seen
    @video.mark_video_as_seen!(@current_user.id, @video.id) if @video
    nothing 204
  end

  def update_self_account
    if @current_user.update_attributes(self_params)
      render :me, status: 200, location: @current_user
    else
      render json: {errors: @current_user.errors.full_messages}
    end
  end

  private

  def set_scopes!(tokens, scope)
    ActiveRecord::Base.transaction do
      tokens.map {|token| token.update_column(:scopes, scope)}
    end
  end

  def users_params
    params.require(:user).permit(:id, :email, :birthday, :password, :password_confirmation, :is_admin)
  end

  def self_params
    params.require(:user).permit(:id, :email, :birthday, :password, :password_confirmation)
  end


  def set_user
      @user = User.find(params[:id])
  end

  def set_video
    @video = Video.find(params[:video_id])
  end

end
