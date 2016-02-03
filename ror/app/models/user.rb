class User < ActiveRecord::Base
  # Include default devise modules.
  devise :database_authenticatable, :registerable,
         :recoverable, :rememberable, :trackable, :validatable,
         :omniauthable, :omniauth_providers => [:facebook]
  birthday_format=/\A\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}.\d{3}Z\z/
  # email_format = /\A([\w+\-].?)+@[a-z\d\-]+(\.[a-z]+)*\.[a-z]+\z/
  validates :birthday, presence: true,
                       format:{with: birthday_format,
                        message: "format is invalid(example: 2015-12-28T06:11:29.973Z)"
                       }

  validates :password_confirmation, presence: true, on: :create
  # validates :email, format:{ with: email_format}
  validates :is_admin, allow_nil: false, inclusion: {in: [true, false], message: "must be 'true' or 'false'"}

  def user_age_meets_requirement!
    (self.birthday.to_date < 18.years.ago || self.is_admin) ? true : false
  end

end