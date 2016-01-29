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
  has_many :liked_videos, dependent: :destroy
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
    # @video = Video.find_by_featured_order(f_o) if f_o
    if self.featured_order
      puts "VIDEO HAS FO #{featured_order}"
      if f_o
        @start_fo = self.featured_order
        @finish_fo = f_o

        if @start_fo < @finish_fo
          puts "Start less than finish"
          ActiveRecord::Base.connection.execute(sql_query('start_fo_less_than_finish_fo'))
                      update_column(:featured_order, @finish_fo)
        elsif @start_fo > @finish_fo
          puts "Start more than finish"
          ActiveRecord::Base.connection.execute(sql_query('start_fo_more_than_finish_fo'))
          update_column(:featured_order, @finish_fo)
        else
          return
        end
        puts "FO: #{f_o}"
      end
    else
      puts "VIDEO HAS NO FO"
      if f_o
        puts "NEED TO SET FO :#{f_o}"
          @f_o = f_o
          ActiveRecord::Base.connection.execute(sql_query('featured_order_not_presents_yet')) if Video.find_by_featured_order(f_o)
          update_column(:featured_order, f_o)
          update_column(:featured, true) if !featured
      else
        max_featured_order = Video.where(featured: true).pluck(:featured_order).max.to_i
        update_column(:featured_order, max_featured_order + 1)
        update_column(:featured, true) if !featured
      end
    end
  end

  def remove_featured!
    if featured
      update_column(:featured, false)
      if featured_order
        ActiveRecord::Base.connection.execute(sql_query('delete_featured'))
        update_column(:featured_order, nil)
      end
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

  def set_param_to_nil(*params)
    params.each do |param|
      update_column(param, nil) if self["#{param}"]
    end
  end

  def reset_streams
    streams.map {|stream| stream.update_column(:transcode_status, 'pending')}
  end

  def sql_query(sql)
    case sql
      when 'delete_featured'
        "UPDATE videos
              SET featured_order = (featured_order-1)
              WHERE id IN (
                SELECT id
                FROM videos
                WHERE featured_order > #{featured_order}
              )"
      when 'featured_order_not_presents_yet'
        "UPDATE videos
              SET featured_order = (featured_order+1)
              WHERE id IN (
                SELECT id
                FROM videos
                WHERE featured_order >= #{@f_o}
              )"
      when 'start_fo_less_than_finish_fo'
        "UPDATE videos
                    SET featured_order = (featured_order-1)
                    WHERE id IN (
                      SELECT id
                      FROM videos
                      WHERE featured_order > #{@start_fo} AND featured_order <= #{@finish_fo}
                    ) "
       when 'start_fo_more_than_finish_fo'
         "UPDATE videos
                    SET featured_order = (featured_order+1)
                    WHERE id IN (
                      SELECT id
                      FROM videos
                      WHERE featured_order < #{@start_fo} AND featured_order >= #{@finish_fo}
                    ) "
    end
  end

end
