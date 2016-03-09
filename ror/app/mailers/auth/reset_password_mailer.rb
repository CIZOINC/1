class Auth::ResetPasswordMailer < Devise::Mailer
  default from: "noreply@cizo.com"
  default template_path: 'devise/mailer'
  # include Devise::Controllers::UrlHelpers

  def reset_password_instructions(user, token)
    @email = user.email
    @web_app_url = Rails.env.production? ? "https://wwww.cizo.com/" : "https://staging.cizo.com/app/"
    @reset_url = @web_app_url + "#/resetPassword?token=" + token

    mail(to: @email, subject: 'Reset password instructions')
  end
end
