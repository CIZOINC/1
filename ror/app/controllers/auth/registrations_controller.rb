module Auth
  class RegistrationsController < Devise::RegistrationsController
    def create
      # email = params[:email]
      # password = params[:password]
      # password_confirmation = params[:password_confirmation]
      # user = User.new(email: email, password: password, password_confirmation: password_confirmation)
      #
      # if user.save
      #   client = OAuth2::Client.new('b4b45c8fbaabfc197a356889fedce01a5979a6dcd6519c3e4abf80395c0ffa26', '5ef56a686d35f57da5d218dba8850e68f0a3d4b548a27f37141bab1829dd30a3', :site => "http://localhost:3000/")
      #   access_token = client.password.get_token('kkaretnikov@weezlabs.com', '123456789')
      #   puts "Access token #{access_token.token}"
      #   # user.update_column(:token, "access_token.token")
      #   render json:{ email: user.email, password: user.password }
      # else
      #   render json: {errors: user.errors.full_messages}
      # end
      super
    end
  end
end
