class ApplicationController < ActionController::Base
  # include Doorkeeper::Rails::Helpers
  include ErrorsRenderer
  # Prevent CSRF attacks by raising an exception.
  # For APIs, you may want to use :null_session instead.
  protect_from_forgery with: :null_session
  skip_before_action :verify_authenticity_token
  respond_to  :json
  helper_method :last_token
  before_action :as_admin?, if: :current_user
  helper_method :as_admin?

  def health_check
  	render text: ENV['RAILS_ENV']
  end
  #
  def doorkeeper_authorize!(*scopes)
    update_user_scope
    super
  end

  private

  def as_admin?
    doorkeeper_token.scopes.to_s == 'admin'
  end

  def update_user_scope
    user = User.find_by_id(doorkeeper_token.resource_owner_id) if doorkeeper_token
    user.update_scope(as_admin?) if user
  end

  def last_token(user)
    Doorkeeper::AccessToken.where(resource_owner_id: user.id).last
  end

  def password_params
    { min: Devise.password_length.first, max: Devise.password_length.last }
  end

  def featured_videos_params(already_featured=nil)
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
