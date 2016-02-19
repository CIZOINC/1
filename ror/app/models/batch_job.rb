class BatchJob < Struct.new(:videos, :method, :id)
  def perform
    # ActiveRecord::Base.transaction do
      # videos.each { |video| video.send "#{method}!", id }
    # end
  end

  def queue_name
    'batch'
  end
end
