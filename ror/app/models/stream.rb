class Stream < ActiveRecord::Base

  validate: :link, presence: true
  validate: :type, presence: true
  validate: :transcode_status, presence: true
end
