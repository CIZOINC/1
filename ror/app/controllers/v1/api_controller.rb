class V1::ApiController < ApplicationController
  before_action :set_headers

  private

  def set_headers
      response.headers['Access-Control-Allow-Origin'] = '*'
      response.headers['Access-Control-Allow-Headers'] = 'Origin, X-Requested-With, Content-Type, Accept'
  end
end
