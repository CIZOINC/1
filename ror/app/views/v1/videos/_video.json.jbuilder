json.extract! video, :id, :created_at, :updated_at, :title, :description, :mpaa_rating, :category_id, :viewable, :hero_image_link, :view_count
((@current_user && Like.find_by(user_id: @current_user.id, video_id: video.id)) || @likes) ? (json.liked true) : (json.liked false)

json.tags video.tag_list
((@current_user.nil? || (!@current_user.nil? && !@user_age_meets_requirement)) && video.mpaa_rating > "G") ? (json.streams nil) : (json.partial! 'v1/streams/stream', video: video)
