module Auth
  class OmniauthCallbacksController < Devise::OmniauthCallbacksController
    # protect_from_forgery with: :null_session
    # skip_before_action :verify_authenticity_token
    before_action :check_if_email_exists, only: [:facebook]
    before_action :check_if_birthday_exists, only: [:facebook]

    def facebook
      puts "USER_FB #{auth_hash}"
      raw_info = auth_hash['extra']['raw_info']

      email = raw_info['email']
      birthday = format_date(raw_info['birthday'])
      provider = auth_hash['provider']
      uid = auth_hash.uid

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
      render json: {errors: 'Login failed'}
    end

    private

    def auth_hash
      request.env['omniauth.auth']
    end

    %w(email birthday).each do |method|
      define_method "check_if_#{method}_exists" do
        if auth_hash.extra.raw_info["#{method}"].blank?
          redirect_to "/users/auth/facebook?auth_type=rerequest&scope=#{method.gsub('birthday', 'user_birthday')}"
        end
      end
    end

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
