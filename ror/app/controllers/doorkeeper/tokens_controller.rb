module Doorkeeper
  class TokensController < Doorkeeper::ApplicationsController
    skip_before_action :verify_authenticity_token
    protect_from_forgery with: :null_session
    before_action :check_for_grant_type, only: :create
    before_action :check_for_username, only: :create, if: :grant_type_password?

    def create
      response = authorize_response
      self.headers.merge! response.headers
      self.response_body = response.body.to_json
      self.status        = response.status
      username = params[:username]
      grant_type = params[:grant_type]
      scope = params[:scope]
      if grant_type_password?
        if !scope || scope == 'user' || scope.blank?
          user = User.find_by_email(username)
          destroy_useless_tokens(user) if user
        elsif scope == "admin"
          user = User.find_by_email(username)
          if !user.is_admin
            head 403
          elsif user.is_admin
            destroy_useless_tokens(user) if user
          end
        end
      elsif grant_type_refresh_token?
        previous_refresh_token = params[:refresh_token]
        if token = Doorkeeper::AccessToken.find_by_refresh_token(previous_refresh_token)
          user = User.find_by(id: token.resource_owner_id)
        end
        destroy_useless_tokens(user) if user
      end
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

    def destroy_useless_tokens(user)
      destroy_expired_tokens(user)
      destroy_revoked_tokens(user)
    end

    private

    GRANT_TYPES = %w(password refresh_token)

    GRANT_TYPES.each { |method| define_method("grant_type_#{method}?") { params[:grant_type] == method }}

    def check_for_grant_type
      render json: {error: "Invalid grant_type"}, status: 400 and return unless params[:grant_type].in?(GRANT_TYPES)
    end

    def check_for_username
      render json: {error: "Username is required"}, status: 422 and return if params[:username].blank?
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
      @strategy ||= server.token_request params[:grant_type]
    end

    def authorize_response
      @authorize_response ||= strategy.authorize
    end
  end
end