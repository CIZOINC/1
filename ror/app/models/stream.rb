class Stream < ActiveRecord::Base
  belongs_to :video
  validates :link, presence: true
  validates :type, presence: true
  validates :transcode_status, presence: true

end
