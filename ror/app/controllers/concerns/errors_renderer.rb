module ErrorsRenderer
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
end
