module Auth
  class PasswordsController < Devise::PasswordsController
    before_action :assert_reset_token_passed, only: [:update, :edit]

    def password_reset
      email = params[:email]
      unless email.blank?
        if valid_email?(email)
          @user = User.find_by_email(email)
        else
          render_errors ['422.2'] and return
        end
      else
        render_errors ['422.1'] and return
      end
      # @user.send_reset_password_instructions if @user
      nothing 200
      ResetPasswordMailer.reset_password_instructions(@user, @user.set_reset_password_token).deliver_now if @user

    end

    def edit
      user = User.with_reset_password_token(@reset_password_token = params[:reset_password_token])
      if user
        if user.reset_password_sent_at < 1.hour.ago
          render_errors ['400.3']
        else
          render :edit, status: 200
        end
      else
        render_errors ['400.2']
      end
    end

    def update
      @user = User.with_reset_password_token(params[:reset_password_token])
      if @user
        if @user.reset_password_sent_at < 1.hour.ago
          render_errors ['400.3']
        else
          if @user.update(password: params[:password])
            render location: @user, status: 200
          else
            render_errors @user.errors.messages[:codes], password_params
          end
        end
      else
        render_errors ['400.2']
      end
    end

    private

    def assert_reset_token_passed
      if params[:reset_password_token].blank?
          render_errors ['400.1'] and return
      end
    end

    def valid_email?(email)
      /\A[^@\s]+@([^@\s]+\.)+[^@\W]+\z/ =~ email
    end
  end
end
