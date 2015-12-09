json.extract! video, :id, :created_at, :updated_at, :title, :description, :mpaa_rating, :category_id, :viewable, :hero_image_link, :liked, :view_count
json.tags video.tag_list
json.streams video.streams, :link, :stream_type, :transcode_status
