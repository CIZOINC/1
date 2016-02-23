# Preview all emails at http://localhost:3000/rails/mailers/reset_password_mailer
class ResetPasswordMailerPreview < ActionMailer::Preview
  def reset_password_instructions
    Devise::Mailer.reset_password_instructions(User.find(121), "faketoken")
  end
end
