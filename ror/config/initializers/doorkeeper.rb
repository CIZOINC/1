Doorkeeper.configure do
  orm :active_record

  # This block will be called to check whether the resource owner is authenticated or not.
  # resource_owner_authenticator do
  #   # raise "Please configure doorkeeper resource_owner_authenticator block located in #{__FILE__}"
  #   # Put your resource owner authentication logic here.
  #   # Example implementation:
  #   #   User.find_by_id(session[:user_id]) || redirect_to(new_user_session_url)
  #   current_user
  # end
  default_scopes :user

  # other available scopes
  optional_scopes :admin

  resource_owner_from_credentials do |routes|
     user = User.find_for_database_authentication(email: params[:username])
     user if user && user.valid_for_authentication? { user.valid_password?(params[:password]) }
  end

  # Access token expiration time (default 2 hours).
  # If you want to disable expiration, set this to nil.
  access_token_expires_in 1.week

  use_refresh_token

end

Doorkeeper.configuration.token_grant_types << "password"
