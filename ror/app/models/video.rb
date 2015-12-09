class Video < ActiveRecord::Base
  belongs_to :category
  has_many :taggings
  has_many :tags, through: :taggings
  has_many :streams


  accepts_nested_attributes_for :tags


  validates :title, presence: true
  validates :description, presence: true
  validates :mpaa_rating, presence: true
  validates :category_id, presence: true
  validates :mpaa_rating, inclusion: {in: %w(G PG PG-13 R NC-17),
            message:  'Must be one of the following strings: "G", "PG", "PG-13", "R", "NC-17"'}

  scope :created_after, -> (date){where('created_at>?', date) }
  scope :created_before, -> (date){where('created_at<?', date) }
end
