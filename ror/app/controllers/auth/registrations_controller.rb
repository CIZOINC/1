module Auth
  class RegistrationsController < Devise::RegistrationsController
    protect_from_forgery with: :null_session
    skip_before_action :verify_authenticity_token
    def create
      super
      # Access_token should be generated in next request (POST /oauth/token params={grant_type: "password", username: 'email', password: 'password'})
    end
  end
end
