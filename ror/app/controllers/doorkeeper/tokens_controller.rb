module Doorkeeper
  class TokensController < Doorkeeper::ApplicationsController
    include ErrorsRenderer

    skip_before_action :verify_authenticity_token
    protect_from_forgery with: :null_session
    before_action :set_params, only: [:create]
    before_action :check_for_grant_type, only: [:create]
    before_action :check_for_credentials, only: [:create]
    before_action :check_if_user_is_allowed_to_login_as_admin, only: :create, if: :grant_type_password?

    def create
      render_errors login_failed? and return if login_failed?
      response = authorize_response
      self.headers.merge! response.headers
      self.response_body = response.body.to_json
      self.status        = response.status
      if grant_type_password?
        user = User.find_by_email(@username)
        destroy_useless_tokens(user) if user
      elsif grant_type_refresh_token?
        if token = Doorkeeper::AccessToken.find_by_refresh_token(@refresh_token)
          user = User.find_by(id: token.resource_owner_id)
        end
        destroy_useless_tokens(user) if user
      end
    end

    def destroy_useless_tokens(user)
      destroy_expired_tokens(user)
      destroy_revoked_tokens(user)
    end

    private

    def check_if_user_is_allowed_to_login_as_admin
      user = User.find_by_email(@username)
      render_errors ['403.7'] and return if user && user.valid_for_authentication? && !user.is_admin && @scope == 'admin'
    end

    def revoke
      if doorkeeper_token && doorkeeper_token.accessible?
        revoke_token(request['token']) if request['token']
      end
      render nothing: true, status: 200
    end

    def destroy_expired_tokens(user)
      expired_tokens = Doorkeeper::AccessToken.where('resource_owner_id = ? AND created_at < ?', user.id, 1.week.ago)
      expired_tokens.destroy_all
    end

    def destroy_revoked_tokens(user)
      revoked_tokens = Doorkeeper::AccessToken.where('resource_owner_id = ? AND revoked_at IS NOT ? AND revoked_at < ?', user.id, nil, DateTime.now)
      revoked_tokens.destroy_all
    end

    GRANT_TYPES = %w(password refresh_token)

    GRANT_TYPES.each { |method| define_method("grant_type_#{method}?") { @grant_type == method }}

    def check_for_grant_type
      render_errors ['422.19'] and return if @grant_type.blank?
      render_errors ['422.17'] and return unless @grant_type.in?(GRANT_TYPES)
    end

    def check_for_credentials
      errors = []
      required_params.each do |code, value|
        errors << code if value.blank?
      end
      render_errors errors if !errors.empty?
    end

    def required_params
      if grant_type_password?
        {
          '422.1' => @username,
          '422.4' => @password,
          '422.2' => @username.blank? ? true : valid_email?,
          '422.16' => @scope.blank? ? true : valid_scope?
        }
      elsif grant_type_refresh_token?
        { "422.18"=> @refresh_token }
      end
    end

    def login_failed?
      if authorize_response.class.to_s.demodulize == "ErrorResponse"
        grant_type_password? ? (errors = [] << '400.11') : (errors = [] << '400.12')
        errors
      end
    end

    def revoke_token(token)
      token = AccessToken.by_token(token) || AccessToken.by_refresh_token(token)
      if token && doorkeeper_token.same_credential?(token)
        token.revoke
        true
      else
        false
      end
    end

    def strategy
      @strategy ||= server.token_request @grant_type
    end

    def authorize_response
      @authorize_response ||= strategy.authorize
    end

    def valid_email?
      Devise.email_regexp =~ @username.downcase
    end

    def valid_scope?
      @scope.in?(%w(user admin)) ? true : false
    end

    def set_params
      @username = params[:username]
      @password = params[:password]
      @refresh_token = params[:refresh_token]
      @scope = params[:scope]
      @grant_type = params[:grant_type]
    end

  end
end
