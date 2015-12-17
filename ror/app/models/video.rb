class Video < ActiveRecord::Base
  mount_uploader :hero_image, HeroImageUploader
  acts_as_taggable

  belongs_to :category
  has_many :streams

  validates :title, presence: true
  validates :description, presence: true
  validates :mpaa_rating, presence: true
  validates :category_id, presence: true
  validates :mpaa_rating, inclusion: {in: %w(G PG PG-13 R NC-17),
            message:  'Must be one of the following strings: "G", "PG", "PG-13", "R", "NC-17"'}

  scope :created_after, -> (date){where('created_at>?', date) }
  scope :created_before, -> (date){where('created_at<?', date) }


  def increase_view_count!
    update(view_count: view_count.to_i.succ)
  end

end
