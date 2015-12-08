json.set! :data do
  json.array! @videos do |video|
    json.partial! 'video', video: video
    json.tags video.try :tags do |tag|
      json.tag tag, :name
    end
  end
end
