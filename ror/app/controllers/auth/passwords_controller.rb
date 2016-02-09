module Auth
  class PasswordsController < Devise::PasswordsController
    before_action :assert_reset_token_passed, only: :update

    def password_reset
      email = params[:email]
      unless email.blank?
        if valid_email?(email)
          @user = User.find_by_email(email)
        else
          error 422, :invalid_email and return
        end
      else
        error 422, :blank_email and return
      end
      @user.send_reset_password_instructions if @user
      render nothing: true, status: 200
      # ResetPasswordMailer.send_reset_password_url(@user).deliver_later!(wait: 1.minute) if @user


    end

    def edit
      user = User.with_reset_password_token(@reset_password_token = params[:reset_password_token])
      if user
        if user.reset_password_sent_at < 1.hour.ago
          error 400, :expired_rpt
        else
          render :edit, status: 200
        end
      else
        error 400, :invalid_rpt
      end
    end

    def update
      @user = User.with_reset_password_token(params[:reset_password_token])
      if @user
        if @user.reset_password_sent_at < 1.hour.ago
          error 400, :expired_rpt
        else
          if @user.update(password: params[:password])
            render location: @user, status: 200
          else
            render json: {errors: @user.errors.full_messages}, status: 422
          end
        end
      else
        error 400, :invalid_rpt
      end
    end

    private

    def assert_reset_token_passed
      if params[:reset_password_token].blank?
          error 400, :rpt_required and return
      end
    end

    def valid_email?(email)
      /\A[^@\s]+@([^@\s]+\.)+[^@\W]+\z/ =~ email
    end

    def error(status, message)
      render json: {error: t(message)}, status: status
    end
  end
end
