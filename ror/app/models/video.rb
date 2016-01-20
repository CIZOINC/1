class Video < ActiveRecord::Base
  include PgSearch
  pg_search_scope :full_search,
                  associated_against: {tags: :name},
                  against: [:title, :description],
                  using: {
                    tsearch: {
                      prefix: true,
                      negation: true,
                      any_word: true
                    },
                    dmetaphone: {
                      any_word: true
                    },
                    trigram:{}
                  }

  mount_uploader :hero_image, HeroImageUploader
  acts_as_taggable

  belongs_to :category
  has_many :streams, dependent: :destroy
  has_many :likes, dependent: :destroy
  has_many :skipped_videos, dependent: :destroy
  has_many :seen_videos, dependent: :destroy

  validates :title, :description, :category_id, presence: true
  filename_regexp = /\A^[0-9a-z]+[0-9a-z\-\.\_]+[0-9a-z]$\z/
  validates :raw_filename, format: {with: filename_regexp,
                                    message: 'must contain only lowercase letters, numbers, hyphens (-), and periods (.). It must start and end with letters or numbers'},
                           length: {maximum: 25},
                           allow_blank: true

  scope :trending, -> (){ where(viewable: true).order(view_count: :desc) }
  # scope :created_after, -> (date){where('created_at>?', date) }
  # scope :created_before, -> (date){where('created_at<?', date) }

  after_create :create_streams

  def create_streams
    ActiveRecord::Base.transaction do
      %w(hls mp4).each do |type|
        self.streams.build(stream_type: type).save(validate: false)
      end
    end
  end

  %w(skip view).each do |i|
    define_method("increase_#{i}_count!") do
      update_column("#{i}_count", self["#{i}_count"].succ)
    end
  end

  def like!(user_id)
    @user_id = user_id
    Like.find_or_create_by(params)
  end

  def dislike!(user_id)
    @user_id = user_id
    if like = Like.find_by(params)
      like.destroy
    end
  end

  def skip!(user_id)
    @user_id = user_id
    if !SeenVideo.find_by(params) && !SkippedVideo.find_by(params)
      SkippedVideo.create(params)
      increase_skip_count!
    end
  end

  def mark_video_as_seen!(user_id)
    @user_id = user_id
    if !SeenVideo.find_by(params)
      SeenVideo.create(params)
      increase_view_count!
    end
    if skipped_video = SkippedVideo.find_by(params)
      skipped_video.destroy
    end
  end

  def params
    {user_id: @user_id, video_id: self.id}
  end

end
