class ApplicationController < ActionController::Base
  # Prevent CSRF attacks by raising an exception.
  # For APIs, you may want to use :null_session instead.
  protect_from_forgery with: :null_session
  skip_before_action :verify_authenticity_token
  respond_to  :json

  def health_check
  	render text: ENV['RAILS_ENV']
  end

  def render_errors(error_codes, params={}, status_code=422)
  	render json: normalize_errors(error_codes, params), status: status_code
  end

  def normalize_errors(error_codes, params={})
    normalized_errors = error_codes.inject([]) {|errors, code| errors << {code: code, message: t(code, params)}}
    {errors: normalized_errors}
  end

end
