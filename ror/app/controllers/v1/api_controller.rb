class V1::ApiController < ApplicationController
  # before_action :set_tokens_to_session
  # before_action :set_token




  private

  def set_tokens_to_session
    session[:access_token] = '0a16e8020460352d3f246f074a5f41c6422618b34b5665191232efbfc17bdd4b'
    session[:refresh_token] = '878d60916e8c3e4104f30e14d99d11a7a8e46c5203fef5176e727f5e92dffc88'
  end

  def set_token
    request.headers["Authorization"] = "Bearer " + session[:access_token]
  end

  def get_response
    puts "resp: #{response.code}"
    response.code
  end


end
