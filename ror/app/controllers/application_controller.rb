class ApplicationController < ActionController::Base
  # Prevent CSRF attacks by raising an exception.
  # For APIs, you may want to use :null_session instead.
  protect_from_forgery with: :null_session
  skip_before_action :verify_authenticity_token
  respond_to  :json

  def health_check
  	render text: ENV['RAILS_ENV']
  end

  private

  def render_errors(error_codes, params={})
  	render json: normalize_errors(error_codes, params), status: status_code(error_codes)
  end

  def normalize_errors(error_codes, params={})
    normalized_errors = error_codes.inject([]) {|errors, code| errors << {code: code, message: t(code, params)}}
    {errors: normalized_errors}
  end

  def status_code(error_codes)
    error_codes[0].split('.')[0]
  end

  def password_params
    {min: Devise.password_length.first, max: Devise.password_length.last}
  end

  def nothing(status)
    render nothing: true, status: status
  end

end
