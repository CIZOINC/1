json.extract! video, :id, :created_at, :updated_at, :title, :description, :mature_content, :category_id, :viewable, :hero_image_link, :view_count, :skip_count
if @current_user
  @likes ? (json.liked true) : (Like.find_by(user_id: @current_user.id, video_id: video.id) ? (json.liked true) : (json.liked false))
  @unseen ? (json.seen false) : (@seen ? (json.seen true) : (SeenVideo.find_by(user_id: @current_user.id, video_id: video.id) ? (json.seen true) : (json.seen false)))
  @skipped ? (json.skipped true) : (SkippedVideo.find_by(user_id: @current_user.id, video_id: video.id) ? (json.skipped true) : (json.skipped false))
end
json.tags video.tag_list
((@current_user.nil? || (!@current_user.nil? && !@user_age_meets_requirement)) && video.mature_content) ? (json.streams nil) : (json.partial! 'v1/streams/stream', video: video)
