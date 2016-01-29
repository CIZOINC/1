Doorkeeper.configure do
  orm :active_record

  default_scopes :user
  optional_scopes :admin

  resource_owner_from_credentials do |routes|
     user = User.find_for_database_authentication(email: params[:username])
     user if user && user.valid_for_authentication? { user.valid_password?(params[:password]) }
  end

  admin_authenticator do |routes|
    render json: {error: "Access denied"}, status: 403
  end

  access_token_expires_in 1.week
  use_refresh_token

end

Doorkeeper.configuration.token_grant_types << "password"
