module Auth
  class PasswordsController < Devise::PasswordsController
    before_action :assert_reset_token_passed, only: :update
    
    def password_reset
      email = params[:email]
      unless email.blank?
        if valid_email?(email)
          @user = User.find_by_email(email)
        else
          error_400 'Invalid email' and return
        end
      else
        error_400 'Email can\'t be blank' and return
      end
      @user.send_reset_password_instructions if @user
      render nothing: true, status: 200
    end

    def edit
      user = User.with_reset_password_token(@reset_password_token = params[:reset_password_token])
      if user
        if user.reset_password_sent_at < 1.hour.ago
          error_400 "reset_password_token has expired, please request a new one"
        else
          render :edit, status: 200
        end
      else
        error_400 "Invalid reset_password_token"
      end
    end

    def update
      @user = User.with_reset_password_token(params[:reset_password_token])
      if @user
        if @user.reset_password_sent_at < 1.hour.ago
          error_400 "reset_password_token has expired, please request a new one"
        else
          if @user.update(password: params[:password])
            render location: @user, status: 200
          else
            render json: {errors: @user.errors.full_messages}
          end
        end
      else
        error_400 "Token is not valid, please generate a new one"
      end
    end

    private

    def assert_reset_token_passed
      if params[:reset_password_token].blank?
          error_400 'reset_password_token is required' and return
      end
    end

    def valid_email?(email)
      /\A[^@\s]+@([^@\s]+\.)+[^@\W]+\z/ =~ email
    end

    def error_400(message)
      render json: {error: message}, status: 400
    end
  end
end
