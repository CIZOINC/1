class SkippedVideo < ActiveRecord::Base
  belongs_to :users
  belongs_to :videos
end
