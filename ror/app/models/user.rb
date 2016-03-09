class User < ActiveRecord::Base

  devise :database_authenticatable, :registerable,
         :recoverable, :rememberable, :trackable,
         :omniauthable, :omniauth_providers => [:facebook]

  after_update :update_tokens, if: :admin_changed?
  validates_with UserCustomValidator

  has_many :liked_videos, dependent: :destroy
  has_many :skipped_videos, dependent: :destroy
  has_many :seen_videos, dependent: :destroy

  before_destroy :prevent_user_from_destroy, if: :last_admin?
  after_destroy :destroy_self_tokens

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

  def last_admin?
    self.is_admin && User.where(is_admin: true).count == 1
  end

  def prevent_user_from_destroy
    self.errors[:codes] << '422.11'
    false
  end

  def admin_changed?
    is_admin_changed?
  end

  def update_tokens
    if tokens = Doorkeeper::AccessToken.where(resource_owner_id: self.id)
      set_scopes!(tokens, 'user') if not self.is_admin # downgrade all existing tokens to 'user' scope if a user is no longer an admin
    end
  end

  def set_scopes!(tokens, scope)
    ActiveRecord::Base.transaction do
      tokens.map {|token| token.update_column(:scopes, scope)}
    end
  end

end
