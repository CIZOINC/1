class V1::ApiController < ApplicationController
  before_action :cors_set_access_control_headers


  def cors_set_access_control_headers
    puts "HEADERS SETTED"
    response.headers['Access-Control-Allow-Origin'] = '*'
    response.headers['Access-Control-Allow-Methods'] = 'POST, GET, PUT, DELETE'
    response.headers['Access-Control-Allow-Headers'] = 'Origin, X-Requested-With, Content-Type, Accept'
  end

end
