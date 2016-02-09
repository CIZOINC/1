class V1::UsersController < V1::ApiController
  before_action only: [:me, :destroy_self_account, :update_self_account, :show, :like_video, :dislike_video, :liked, :skipped, :skip_video, :seen, :unseen, :mark_video_as_seen] do
    doorkeeper_authorize! :user, :admin
  end

  before_action only: [:index, :update, :show] do
    doorkeeper_authorize! :admin
  end

  before_action :set_params_to_query, only: [:liked, :skipped, :seen, :unseen]
  before_action :set_user, only: [:show, :update]
  before_action :set_video, only: [:like_video, :dislike_video, :mark_video_as_seen, :skip_video, :guest_skip_video, :guest_mark_video_as_seen]
  before_action :user_age_meets_requirement, only: [:liked, :seen, :skipped, :unseen]
  before_action :prevent_last_admin_from_deletion, only: [:destroy_self_account]
  # before_action :prevent_email_changing, only: [:update_self_account]

  def index
    @users = User.all
  end

  def update
    if @user.update_attributes(users_params)
      render :show, status: 200, location: @user
    else
      render json: {errors: @user.errors.full_messages}, status: 422
    end
  end

  def update_self_account
    if @current_user.update_attributes(self_params)
      render :me, status: 200, location: @current_user
    else
      render json: {errors: @current_user.errors.full_messages}, status: 422
    end
  end

  def show
  end

  def me
  end

  def destroy_self_account
    @current_user.destroy
    head :no_content
  end

  %w(like dislike skip).each do |method|
    define_method("#{method}_video") do
      @video.send "#{method}!".to_sym, @current_user.id
      nothing 204
    end
  end

  %w(seen skipped liked).each do |method|
    define_method(method) do
      instance_variable_set("@#{method}", true)
      @arguments["#{method}_user_id".to_sym] = @current_user.id
      @conditions.push("#{method}_videos.user_id = :#{method}_user_id AND deleted_at IS NULL")
      @conditions = @conditions.join(" AND ")
      @videos = Video.joins("#{method}_videos".to_sym).where(@conditions, @arguments)
      limit_videos!
    end
  end

  def unseen
    @unseen = true
    seen_videos_ids = Video.joins(:seen_videos).where(seen_videos: {user_id: @current_user.id}).pluck(:id)
    @arguments[:seen_videos_ids] = seen_videos_ids
    @conditions.push("id not in (:seen_videos_ids)")
    @conditions = @conditions.join(" AND ")
    @videos = seen_videos_ids.empty? ? Video.all : Video.where(@conditions, @arguments)
    limit_videos!
  end

  def mark_video_as_seen
    @video.mark_video_as_seen!(@current_user.id) if @video
    nothing 204
  end

  def guest_mark_video_as_seen
    @video.increase_view_count! if @video
    nothing 204
  end

  def guest_skip_video
    @video.increase_skip_count! if @video
    nothing 204
  end

  private

  def prevent_last_admin_from_deletion
    render json: {error: t(:last_admin)}, status: 422 and return if @current_user.is_admin && User.where(is_admin: true).count == 1
  end

  def limit_videos!
    as_admin? ? (@videos = @videos.limit(limited_videos)) : (@videos = @videos.limit(limited_videos(200)))
  end

  def users_params
    params.require(:user).permit((@current_user.id == @user.id) ? nil : :is_admin)
  end

  def self_params
    params.require(:user).permit(:birthday, :password, :password_confirmation)
  end

  def set_user
    @user = User.find(params[:id])
  end

  def set_video
    @video = Video.find(params[:video_id])
  end

  def set_params_to_query
    @conditions = []
    @arguments = {}

    unless params[:created_before].blank?
      action_name == 'unseen' ? @conditions.push("created_at <= :created_before") : @conditions.push("#{action_name}_videos.created_at <= :created_before")
      @arguments[:created_before] = params[:created_before]
    end

    unless params[:created_after].blank?
      action_name == 'unseen' ? @conditions.push("created_at >= :created_after") : @conditions.push("#{action_name}_videos.created_at >= :created_after")
      @arguments[:created_after] = params[:created_after]
    end

    unless as_admin?
      @conditions.push('visible = :visible')
      @arguments[:visible] = true
    end
  end

end
