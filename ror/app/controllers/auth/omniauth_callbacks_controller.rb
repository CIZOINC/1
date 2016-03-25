module Auth
  class OmniauthCallbacksController < Devise::OmniauthCallbacksController
    before_action :check_if_email_exists, only: [:facebook]
    before_action :check_if_age_range_exists, only: [:facebook]
    before_action :check_for_access_token_presence, only: [:fetch_user_by_facebook_token]

    def fetch_user_by_facebook_token
      begin
        uri = "https://graph.facebook.com/me?fields=email,age_range&access_token=" + params[:access_token]
        @response = JSON.parse(open(uri).read[0..-1])
        birthday = birthday_from_age_range(@response['age_range'])
        find_or_create_user_by(@response['email'], birthday)
      rescue OpenURI::HTTPError => e
        # error = e.as_json(only: 'io')['io'][0].gsub("\\","")
        # code =  JSON.parse(error)['error']['code']
        render_errors ['422.21']
      end
    end

    def facebook
      raw_info = auth_hash['extra']['raw_info']
      email = raw_info['email']
      age_range = raw_info['age_range']

      find_or_create_user_by(email, birthday_from_age_range(age_range))
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
        users_scope = (Doorkeeper::AccessToken.where(resource_owner_id: user.id)
                                              .pluck(:scopes).include? 'admin') ?
                                                'admin' :
                                                'user'
        @access_token = Doorkeeper::AccessToken.create(resource_owner_id: user.id,
                                                       expires_in: 1.week.to_i,
                                                       scopes:  users_scope,
                                                       refresh_token: secret(32))
        Doorkeeper::TokensController.new.destroy_useless_tokens(user)
        response = Doorkeeper::OAuth::TokenResponse.new(@access_token)
        self.headers.merge! response.headers
        self.response_body = response.body.to_json
        self.status = response.status
      else
        puts user.birthday
        puts user.errors[:codes]
        render_errors user.errors[:codes]
      end
    end

    def auth_hash
      request.env['omniauth.auth']
    end

    %w(email age_range).each do |method|
      define_method "check_if_#{method}_exists" do
        if auth_hash.extra.raw_info["#{method}"].blank?
          redirect_to "/users/auth/facebook?auth_type=rerequest&"\
                      "scope=#{method.gsub('age_range', 'public_profile')}"
        end
      end
    end

    def secret(number, password=nil)
      random = SecureRandom.hex(number)
      unless password
        while Doorkeeper::AccessToken.find_by_refresh_token(random)
          secret(number)
        end
      end
      random
    end

    def birthday_from_age_range(age_range)
      min_age = age_range['min']
      fake_birthday = Time.now - min_age.years
      fake_birthday.strftime('%FT%T.%LZ')
    end

    def check_for_access_token_presence
      render_errors ['422.20'] and return if params[:access_token].blank?
    end
  end
end
