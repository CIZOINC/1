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
  filename_regexp = /\A^[0-9a-z]+[0-9a-z\-\.\_]+[0-9a-z]$\z/
  validates :raw_filename, format: {with: filename_regexp,
                                    message: 'must contain only lowercase letters, numbers, hyphens (-), and periods (.). It must start and end with letters or numbers'},
                            length: {maximum: 25}


  scope :created_after, -> (date){where('created_at>?', date) }
  scope :created_before, -> (date){where('created_at<?', date) }


  def increase_view_count!
    update(view_count: view_count.to_i.succ)
  end

end
