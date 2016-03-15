class Auth::ResetPasswordMailer < Devise::Mailer
  default from: "noreply@cizo.com"
  default template_path: 'devise/mailer'
  # include Devise::Controllers::UrlHelpers

  def reset_password_instructions(user, token)
    @email = user.email

    @web_app_url = Rails.env.production? ? "https://www.cizo.com/" : "https://staging.cizo.com/app/"
    @reset_url = @web_app_url + "#/resetPassword/" + token
    logo  = File.read(Rails.root.join('app','assets', 'images', 'logo.png'))
    attachments.inline['logo'] = logo
    mail(to: @email, subject: 'Reset password instructions')
  end
end
