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
  has_many :streams
  has_many :likes, dependent: :destroy
  has_many :skipped_videos, dependent: :destroy
  has_many :seen_videos, dependent: :destroy

  validates :title, presence: true
  validates :description, presence: true
  validates :mature_content, presence: true
  validates :category_id, presence: true

  filename_regexp = /\A^[0-9a-z]+[0-9a-z\-\.\_]+[0-9a-z]$\z/
  validates :raw_filename, format: {with: filename_regexp,
                                    message: 'must contain only lowercase letters, numbers, hyphens (-), and periods (.). It must start and end with letters or numbers'},
                           length: {maximum: 25},
                           allow_blank: true


  scope :created_after, -> (date){where('created_at>?', date) }
  scope :created_before, -> (date){where('created_at<?', date) }

  scope :trending, -> (){ where(viewable: true).order(view_count: :desc) }

  %w(in de).each do |method|
    define_method("#{method}crease_view_count!") do
      update_column(:view_count, ((method.eql? 'in') ? self.view_count.to_i.succ : self.view_count.to_i.pred))
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
    skipped_video = SkippedVideo.find_by(params)
    seen_video = SeenVideo.find_by(params)
    if !seen_video && !skipped_video
        SkippedVideo.create(params)
        decrease_view_count!
    end
  end

  def mark_video_as_seen!(user_id)
    @user_id = user_id
    SeenVideo.find_or_create_by(params)
    #TODO
    # seen_video = SeenVideo.find_by(params)
    # if !seen_video
    #   SeenVideo.create(params)
    #   increase_view_count!
    # end
    if skipped_video = SkippedVideo.find_by(params)
      skipped_video.destroy
    end
  end

  def params
    {user_id: @user_id, video_id: self.id}
  end

end
