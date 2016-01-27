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

  scope :trending, -> (){ where("visible = ? AND deleted_at IS NULL", true).order(view_count: :desc) }
  # scope :created_after, -> (date){where('created_at>?', date) }
  # scope :created_before, -> (date){where('created_at<?', date) }
  scope :desc_order, ->(){ order(created_at: :desc)}
  scope :order_by_featured, ->(){order(featured_order: :asc)}

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

  def add_featured!(f_o = nil)
    update_column(:featured, true) && (puts "SET FEATURED TO TRUE") if !featured
    set_featured_order(f_o) if f_o
  end

  def remove_featured!
    if featured
      update_column(:featured, false)
      update_column(:featured_order, nil) if featured_order
      puts "REMOVE FEATURED"
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

  def set_featured_order(f_o)
    @video = Video.find_by_featured_order(f_o)
    if @video
      find_last_video(f_o)
    else
      update_column(:featured_order, f_o)
    end
  end

  def find_last_video(f_o)
    #TODO Add unique: true to featured_order index

    self.update_column(:featured_order, nil) if featured_order
    v = Video.find_by_featured_order(f_o)
    if v.nil?
      last_featured_order = f_o - 1
      array = []
      last_featured_order.downto(@video.featured_order) do |i|
        array << i
      end
      sql = "UPDATE videos
             SET featured_order = (featured_order+1)
             WHERE id IN (
               SELECT id
               FROM videos
               WHERE featured_order in (#{array.join(', ')})
             )"
      ActiveRecord::Base.connection.execute(sql)
      self.update_column(:featured_order, @video.featured_order)
      return
      # sql2 = "DROP INDEX
      #       WITH    custom_videos AS
      #                 (
      #                 SELECT  ID, (featured_order+1) as featured_order
      #                 FROM    videos
      #                 WHERE   featured_order in (#{array.join(', ')})
      #                 ORDER BY featured_order DESC
      #                 )
      #                 UPDATE videos AS v
      #                 SET featured_order = cv.featured_order
      #                 from custom_videos AS cv
      #                 where cv.id = v.id
      #                 "
      # # sql = "WITH videos AS (SELECT ID FROM videos WHERE featured_order in (#{array.join(', ')}) ORDER BY featured_order DESC) UPDATE videos SET featured_order = (featured_order+1)"
      # puts sql

      # self.update_column(:featured_order, @video.featured_order)
    end
    find_last_video(f_o + 1)
  end

  def set_param_to_nil(*params)
    params.each do |param|
      update_column(param, nil) if self["#{param}"]
    end
  end

  def reset_streams
    streams.map {|stream| stream.update_column(:transcode_status, 'pending')}
  end

end
