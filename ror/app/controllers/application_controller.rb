class ApplicationController < ActionController::Base
  # Prevent CSRF attacks by raising an exception.
  # For APIs, you may want to use :null_session instead.
  protect_from_forgery with: :null_session
  skip_before_action  :verify_authenticity_token

  def health_check
  	render text: ENV['RAILS_ENV']
  end

end
