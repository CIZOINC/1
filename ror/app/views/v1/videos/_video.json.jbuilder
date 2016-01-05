json.extract! video, :id, :created_at, :updated_at, :title, :description, :mpaa_rating, :category_id, :viewable, :hero_image_link, :liked, :view_count
json.tags video.tag_list
json.liked true if @likes
((@current_user.nil? && video.mpaa_rating > "G") || (!@current_user.nil? && !@user_age_meets_requirement)) ? (json.streams nil) : (json.streams video.streams, :link, :stream_type, :transcode_status)
