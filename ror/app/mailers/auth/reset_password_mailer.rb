class Auth::ResetPasswordMailer < Devise::Mailer
  default from: "noreply@cizo.com"
  default template_path: 'devise/mailer'
  # include Devise::Controllers::UrlHelpers

  def reset_password_instructions(user, token)
    # attachments['logo'] = File.read(Rails.root.join('app', 'assets', 'images', 'logo.png'))
    # attachments['logo']['Content-Type'] = 'image/png'
    @user = user
    @email = user.email
    @token = token
    mail(to: @email, subject: 'Reset password instructions')
  end
end
