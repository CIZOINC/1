class BatchJob < Struct.new(:videos, :method, :id)
  def perform
    ActiveRecord::Base.transaction do
      all_videos = Video.where("id IN (?)", videos)
      all_videos.each { |video| video.send "#{method}!", id }
    end
  end

  def queue_name
    'batch'
  end
end
