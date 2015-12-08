class Video < ActiveRecord::Base
  belongs_to :category
  has_many :taggings
  has_many :tags, through: :taggings


  validates :title, presence: true
  validates :description, presence: true
  validates :mpaa_rating, presence: true
  validates :category_id, presence: true

  scope :created_after, -> (date){where('created_at>?', date) }
  scope :created_before, -> (date){where('created_at<?', date) }
end
