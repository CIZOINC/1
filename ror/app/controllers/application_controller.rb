class ApplicationController < ActionController::Base
  include ErrorsRenderer
  # Prevent CSRF attacks by raising an exception.
  # For APIs, you may want to use :null_session instead.
  protect_from_forgery with: :null_session
  skip_before_action :verify_authenticity_token
  respond_to  :json
  # helper_method :last_token
  before_action :as_admin?, if: :current_user
  helper_method :as_admin?

  def health_check
  	render text: ENV['RAILS_ENV']
  end

  private

  def as_admin?
    doorkeeper_token && doorkeeper_token.scopes.to_s == 'admin'
  end

  def password_params
    { min: Devise.password_length.first, max: Devise.password_length.last }
  end

  def featured_videos_params(already_featured = nil)
    if already_featured
      { featured_videos_count: Video.where('deleted_at IS NULL AND featured = ?', true).count }
    else
      { featured_videos_count: Video.where('deleted_at IS NULL AND featured = ?', true).count + 1 }
    end
  end

  def nothing(status)
    render nothing: true, status: status
  end

end
