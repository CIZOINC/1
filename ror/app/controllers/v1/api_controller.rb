class V1::ApiController < ApplicationController
  # before_action :set_tokens_to_session
  # before_action :set_token
  before_action :current_user
  before_action :check_if_logged_in
  before_action :logged_in_as_user?
  before_action :logged_in_as_admin?
  before_action :get_info, if: :current_user




  private

  def get_info
    puts @current_user.id
    puts @current_user.birthday.to_date < 18.years.ago
  end

  def set_tokens_to_session
    session[:access_token] = '5c8ff03f3f00f5d291f4acec9d60b3e85b88b68ce46197c6fea4aba0190001b6'
    session[:refresh_token] = '878d60916e8c3e4104f30e14d99d11a7a8e46c5203fef5176e727f5e92dffc88'
  end

  def set_token
    request.headers["Authorization"] = "Bearer " + session[:access_token]
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
