class Auth::ResetPasswordMailer < Devise::Mailer
  include Devise::Controllers::UrlHelpers
  default template_path: 'devise/mailer'
  def send_reset_password_url(user)
    @email = user.email
    mail(to: @email, subject: 'Reset password')
  end
end
