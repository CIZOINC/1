class Category < ActiveRecord::Base
  has_many :videos
  validates_with CategoryCustomValidator
  before_destroy :any_videos_in_category?

  protected

  def any_videos_in_category?
    if !Video.where("deleted_at IS NULL AND category_id = ?", self.id).empty?
      self.errors[:codes] << '403.8'
      return false
    end
  end
end
