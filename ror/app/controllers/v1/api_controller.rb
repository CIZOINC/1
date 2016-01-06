class V1::ApiController < ApplicationController
  before_action :current_user
  # before_action :check_if_logged_in
  # before_action :logged_in_as_user?
  # before_action :logged_in_as_admin?

  private

  def user_age_meets_requirement
    @user_age_meets_requirement = @current_user.is_admin ? true : @current_user.user_age_meets_requirement!
  end

  def logged_in_as_admin?
    render json: {errors: "Access denied"}, status: 403 unless @current_user && @current_user.is_admin
  end

  def logged_in_as_user?
    (render json: {errors: "Should be logged in as user"}, status: 403) && return unless @current_user && !@current_user.is_admin
  end

  def current_user
    @current_user = User.find(doorkeeper_token.resource_owner_id) if doorkeeper_token
  end

  def check_if_logged_in
    (render json: {errors: "Should be logged in"}, status: 404) && return if @current_user.nil?
  end
end
