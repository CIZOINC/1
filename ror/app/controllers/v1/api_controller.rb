class V1::ApiController < ApplicationController
  before_action :current_user

  private

  def limited_videos(limit = nil)
    params[:count].blank? ? limit : (params[:count].to_i > 200 ? 200 : params[:count].to_i)
  end

  def check_if_video_deleted
    render_errors ['404.1'] if @video.deleted_at
  end

  def current_user
    @current_user = User.find(doorkeeper_token.resource_owner_id) if doorkeeper_token
  end

  def bucket_name
    'cizo-assets'
  end

  def region
    "us-east-1"
  end

  def stream_folder
    Rails.env.production? ? "production/stream/#{@video.id}/" : "staging/stream/#{@video.id}/"
  end

  def set_bucket
    @bucket = Aws::S3::Bucket.new(region: region, name: bucket_name)
  end

  %w(key filename file data).each_with_index do |param, index|
    define_method("check_if_#{param}_presents_in_params") do
      unless !params[param].blank? && instance_variable_set("@#{param}", params[param])
        render_errors ["403.#{index+1}"]
        return true
      end
    end
  end

  def set_mature_content
    if params[:show_mature_content] == "false"
      @conditions.push('mature_content = :show_mature_content')
      @arguments[:show_mature_content] = false
    end
  end

  def set_visibility
    if params[:visible] == 'false'
      @conditions.push('visible = :visible')
      @arguments[:visible] = false
      @show_invisible = true unless @current_user && as_admin?
    elsif params[:visible] == 'true'
      visible_conditions
    else
      visible_conditions unless @current_user && as_admin?
    end
  end

  def visible_conditions
    unless params[:deleted] == 'true'
      (@conditions.push('visible = :visible') && @arguments[:visible] = true)
    end
  end

end
