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
  validates :featured_order, numericality: {greater_than_or_equal_to: 1}, allow_nil: true

  scope :trending, -> (){ where("visible = ? AND deleted_at IS NULL", true).order(view_count: :desc) }
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
    if self.featured_order
      if f_o
        return if f_o == featured_order
        conditions = {'>' => "start_fo_more_than_finish_fo", '<' => 'start_fo_less_than_finish_fo'}
        conditions.keys.each { |key| execute_sql_for conditions[key] if eval("(@start_fo ||= self.featured_order) #{key} (@finish_fo ||= f_o)")}
      end
    else
      if f_o
        @f_o = f_o
        ActiveRecord::Base.connection.execute(sql_query('featured_order_not_presents_yet')) if Video.find_by_featured_order(@f_o)
        update_self_params
      else
        @new_featured_order = Video.where(featured: true).pluck(:featured_order).max.to_i + 1
        update_self_params
      end
    end
  end

  def remove_featured!
    if featured
      update_column(:featured, false)
      execute_sql_for('delete_featured') if featured_order
    end
  end

  def like!(user_id)
    @user_id = user_id
    LikedVideo.find_or_create_by(params)
  end

  def dislike!(user_id)
    @user_id = user_id
    if like = LikedVideo.find_by(params)
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

  def set_param_to_nil(*params)
    params.each do |param|
      update_column(param, nil) if self["#{param}"]
    end
  end

 protected

  def params
    {user_id: @user_id, video_id: self.id}
  end

  def reset_streams
    streams.map {|stream| stream.update_column(:transcode_status, 'pending')}
  end

  def update_self_params
    update_column(:featured_order, @f_o || @new_featured_order)
    update_column(:featured, true) if !featured
  end

  def execute_sql_for(custom_case)
    ActiveRecord::Base.connection.execute(sql_query(custom_case))
    update_column(:featured_order, @finish_fo)
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
