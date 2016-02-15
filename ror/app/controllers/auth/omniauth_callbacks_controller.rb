module Auth
  class OmniauthCallbacksController < Devise::OmniauthCallbacksController
    before_action :check_if_email_exists, only: [:facebook]
    before_action :check_if_birthday_exists, only: [:facebook]
    before_action :check_for_access_token_presence, only: [:fetch_user_by_facebook_token]

    def fetch_user_by_facebook_token
      begin
        uri = "https://graph.facebook.com/me?fields=email,birthday&access_token=" + params[:access_token]
        @response = JSON.parse(open(uri).read[0..-1])
        @response['birthday'] = @response['birthday'] ? format_date(@response['birthday']) : time_to_valid_format(Time.now)
        # render 'fetch_user_by_facebook_token'
        find_or_create_user_by(@response['email'], @response['birthday'])
      rescue OpenURI::HTTPError => e
        error = e.as_json(only: 'io')['io'][0].gsub("\\","")
        render json: error, status: 400
      end
    end

    def facebook
      puts "USER_FB #{auth_hash}"
      raw_info = auth_hash['extra']['raw_info']
      email = raw_info['email']
      birthday = format_date(raw_info['birthday'])
      find_or_create_user_by(email, birthday)
    end

    def failure
      render_errors ['400.4']
    end

    private

    def find_or_create_user_by(email, birthday)
      user = User.find_or_create_by(email: email) do |user|
        user.is_admin = false
        user.password = (password = secret(9, true))
        user.password_confirmation = password
        user.birthday = birthday
      end

      if user.valid?
        #if user has been logged in as admin at least once - he'll get admin's access token - maybe this functionality should be changed
        users_scope = (Doorkeeper::AccessToken.where(resource_owner_id: user.id).pluck(:scopes).include? 'admin') ? 'admin' : 'user'
        @access_token = Doorkeeper::AccessToken.create(resource_owner_id: user.id, expires_in: 1.week.to_i, scopes:  users_scope, refresh_token: secret(32))
        Doorkeeper::TokensController.new.destroy_useless_tokens(user)
        response = Doorkeeper::OAuth::TokenResponse.new(@access_token)
        self.headers.merge! response.headers
        self.response_body = response.body.to_json
        self.status = response.status
      else
        render json: {errors: user.errors.full_messages}, status: 400
      end
    end

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

    def secret(number, password=nil)
      password ? random = SecureRandom.hex(number) : (secret(number) while (Doorkeeper::AccessToken.find_by_refresh_token(random = SecureRandom.hex(number))))
      random
    end

    def format_date(date)
      date = date.split('/')
      date.insert(2, date[0]).shift
      date = date.join('/')
      time_to_valid_format(date)
    end

    def time_to_valid_format(date)
      date.to_time.strftime('%FT%T.%LZ')
    end

    def check_for_access_token_presence
      if params[:access_token].blank?
        render json: {error: t(:at_required)}, status: 422
        return
      end
    end
  end
end
