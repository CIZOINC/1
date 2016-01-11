class User < ActiveRecord::Base
  # Include default devise modules.
  devise :database_authenticatable, :registerable,
         :recoverable, :rememberable, :trackable, :validatable
         
  birthday_format=/\A\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}.\d{3}Z\z/
  validates :birthday, presence: true,
                       format:{with: birthday_format,
                        message: "format is invalid(example: 2015-12-28T06:11:29.973Z)"
                       }

  def user_age_meets_requirement!
    (self.birthday.to_date < 18.years.ago || self.is_admin) ? true : false
  end

  # scope :admin, -> {where(is_admin: false)  }
  # scope :public, -> {where(is_admin: false)}

  # after_save :update_token
  # #
  # def update_token
  #   if self.persisted?
  #     # client = OAuth2::Client.new('b4b45c8fbaabfc197a356889fedce01a5979a6dcd6519c3e4abf80395c0ffa26', '5ef56a686d35f57da5d218dba8850e68f0a3d4b548a27f37141bab1829dd30a3', :site => "http://localhost:3000/")
  #     # access_token = client.password.get_token('kkaretnikov@weezlabs.com', '123456789')
  #     self.update_column(:token, ":token")
  # end
  # end

end