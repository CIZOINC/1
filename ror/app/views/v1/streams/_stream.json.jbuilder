json.streams video.streams do |stream|
   json.extract! stream, :link, :stream_type
   json.extract! stream, :transcode_status if @current_user.try(:is_admin)
end
# json.streams video.streams, :link, :stream_type, :transcode_status
