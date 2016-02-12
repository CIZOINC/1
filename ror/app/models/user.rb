class User < ActiveRecord::Base
  # Include default devise modules.
  devise :database_authenticatable, :registerable,
         :recoverable, :rememberable, :trackable,
         :omniauthable, :omniauth_providers => [:facebook]

  after_update :update_tokens, if: :admin_changed?
  validates_with UserCustomValidator

  has_many :liked_videos, dependent: :destroy
  has_many :skipped_videos, dependent: :destroy
  has_many :seen_videos, dependent: :destroy

  after_destroy :destroy_self_tokens

  def user_age_meets_requirement!
    (self.birthday.to_date < 18.years.ago || self.is_admin) ? true : false
  end

  def set_reset_password_token
    raw, enc = Devise.token_generator.generate(self.class, :reset_password_token)

    self.reset_password_token   = enc
    self.reset_password_sent_at = Time.now.utc
    self.save(validate: false)
    raw
  end

  protected

  def destroy_self_tokens
    Doorkeeper::AccessToken.where(resource_owner_id: self.id).destroy_all
  end

  def admin_changed?
    is_admin_changed?
  end

  def update_tokens
    if tokens = Doorkeeper::AccessToken.where(resource_owner_id: self.id)
      self.is_admin ? set_scopes!(tokens, 'admin') : set_scopes!(tokens, 'user')
    end
  end

  def set_scopes!(tokens, scope)
    ActiveRecord::Base.transaction do
      tokens.map {|token| token.update_column(:scopes, scope)}
    end
  end

end
