class Stream < ActiveRecord::Base
  belongs_to :video
  validates :link, presence: true
  validates :stream_type, presence: true , inclusion: {in: %w(mp4 hls)}
  validates :transcode_status, presence: true, inclusion: {in: %w(pending submitted progressing complete canceled error)}


  def incomplete?
    self.transcode_status != "completed"
  end
end
