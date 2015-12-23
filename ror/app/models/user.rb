class User < ActiveRecord::Base
  # Include default devise modules.
  devise :database_authenticatable, :registerable,
         :recoverable, :rememberable, :trackable, :validatable

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
