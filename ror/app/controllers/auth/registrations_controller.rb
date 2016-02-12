module Auth
  class RegistrationsController < Devise::RegistrationsController
    include Parametrable
    protect_from_forgery with: :null_session
    skip_before_action :verify_authenticity_token
    skip_before_action :require_no_authentication
    before_action :configure_permitted_parameters

    def create
      build_resource(sign_up_params)

      if resource.save
        render 'v1/registrations/show', status: 200
      else
        render json: {error_codes: @user.errors.messages[:codes], error_messages: t(@user.errors.messages[:codes], password_params)}, status: 422
      end
    end

    protected

     def configure_permitted_parameters
       devise_parameter_sanitizer.for(:sign_up).push(:birthday)
     end
  end
end
