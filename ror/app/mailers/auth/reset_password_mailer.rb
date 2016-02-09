class Auth::ResetPasswordMailer < Auth::ApplicationMailer
  def send_reset_password_url(user)
    @email = user.email
    mail(to: @email, subject: 'Reset password')
  end
end
