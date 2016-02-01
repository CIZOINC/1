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
      V1::ResetPasswordMailer.send_reset_password_url(@user).deliver_later! if @user

      render nothing: true, status: 200
    end
  end
end
