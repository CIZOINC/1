class V1::ApiController < ApplicationController
  # before_action :authenticate_user!
  before_action :refresh_token, if: :token_is_expired?
  before_action :generate_token, if: :nil_token?
  # before_action :check_for_token
  # after_action :unauthorized



  private

  def get_response
    puts "resp: #{response.code}"
    response.code
  end

  # def check_for_token
  #   puts "TOKEN: #{valid_doorkeeper_token?}"
  # end

  def token_is_expired?
    puts (doorkeeper_token && doorkeeper_token.expired?)
    doorkeeper_token && doorkeeper_token.expired?
  end

  def nil_token?
    doorkeeper_token.nil?
  end

  def refresh_token
    puts "need_to_refresh_token"
    user = User.find_by(access_token: "903892c31a8694f36fc2b16324a0577a2c670d9cb563a24f35d2dc1174df780a")

    puts user
    uri =URI.parse(oauth_token_url)
    puts uri
    request = Net::HTTP::Post.new(uri.path)
    puts request
    request.form_data = {grant_type: "refresh_token", refresh_token: user.try(:refresh_token)}
    con = Net::HTTP.new(uri.host, '3000')
    con.start {|http| http.request(request)}
  end

  def generate_token
    puts 'generate token'
  end
end
