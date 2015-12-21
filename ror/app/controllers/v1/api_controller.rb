class V1::ApiController < ApplicationController
  require 'rest-client'
  # before_action :authenticate_user!
  before_action :current_user

  def current_user
    if doorkeeper_token
      @current_user ||= User.find(doorkeeper_token.resource_owner_id)
      puts doorkeeper_token
    else
      response = RestClient.post 'http://localhost:3000/oauth/token', {
        grant_type: "password",
        username: "kkaretnikov@weezlabs.com",
        password: "123456789"
      }
      puts response
    end
  end


end
