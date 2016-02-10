class Auth::ResetPasswordMailer < Devise::Mailer
  default from: "from@example.com"
  default template_path: 'devise/mailer'
  # include Devise::Controllers::UrlHelpers

  def reset_password_instructions(user, token)
    @user = user
    @email = user.email
    @token = token
    mail(to: @email, subject: 'Reset password instructions')
  end
end
