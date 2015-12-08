class V1::ApiController < ApplicationController
  before_action :set_headers

  def set_headers
    headers['Access-Control-Allow-Origin'] = request.env['HTTP_ORIGIN']
    headers['Access-Control-Allow-Headers'] = '*,x-requested-with'
  end
end
