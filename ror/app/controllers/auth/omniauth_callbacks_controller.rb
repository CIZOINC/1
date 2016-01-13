module Auth
  class OmniauthCallbacksController < Devise::OmniauthCallbacksController
    def facebook
      facebook_user = request.env['omniauth.auth']
      puts "USER_FB #{facebook_user}"
      raw_info = facebook_user['extra']['raw_info']

      email = raw_info['email']
      birthday = format_date(raw_info['birthday'])
      provider = facebook_user['provider']
      uid = facebook_user.uid

      if user = User.find_by_email(email)
        users_scope = Doorkeeper::AccessToken.find_by(resource_owner_id: user.id).try(:scopes)
        @access_token = Doorkeeper::AccessToken.create(resource_owner_id: user.id, expires_in: 1.week.to_i, scopes:  users_scope || "user", refresh_token: secret(64, true))
        puts "USER EXISTS: #{user.to_json}"
        render 'auth/omniauth_callbacks/access_token'
      else
        user = User.create(email: email, is_admin: false, birthday: birthday, provider: provider, uid: uid, password: password = secret(9), password_confirmation: password)
        @access_token = Doorkeeper::AccessToken.create(resource_owner_id: user.id, expires_in: 1.week.to_i, scopes: 'user', refresh_token: secret(64, true)) if user.valid?
        puts "USER CREATED: #{user.to_json}"
        puts user.errors.full_messages
        if @access_token
          render 'auth/omniauth_callbacks/access_token'
        else
          render json: {errors: user.errors.full_messages}
        end
      end
    end

    def failure
      redirect_to root_path
    end

    private

    def secret(number, downcase = nil)
      secret = ''
      number.times do |i|
        secret << [*('a'..'z'), *('A'..'Z'), *('0'..'9')].shuffle[0]
      end
      secret.downcase! if downcase
      secret(number, downcase = false) if Doorkeeper::AccessToken.find_by_refresh_token(secret)
      secret
    end

    def format_date(date)
      date.to_time.strftime('%FT%T.%LZ')
    end

  end
end
