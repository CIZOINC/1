module Auth
  class PasswordsController < Devise::PasswordsController
    def password_reset
      email = params[:email]
      unless email.blank?
        @user = User.find_by_email(email)
      else
        render json: {error: 'Email can\'t be blank' }, status: 400
        return
      end
      
      render nothing: true, status: 200
    end
  end
end
