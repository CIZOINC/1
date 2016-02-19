if @show_invisible || @show_deleted
  json.extract! video, :id
else
  json.extract! video, :id, :created_at, :updated_at, :title, :description, :mature_content, :category_id, :visible, :featured
  if video.hero_image.url
    json.set! :hero_images do
      json.hero_image_link video.hero_image.url
      %w(large_banner medium_banner thumb_banner).each { |size| json.set! "hero_image_link_#{size}", video.hero_image.url(size.to_sym) }
    end
  end
  json.featured_order video.featured_order if @featured
  if @current_user
    json.deleted_at video.deleted_at if as_admin?
    %w(view skip).each {|i| json.set! "#{i}_count", video["#{i}_count"] }  if as_admin?
    @liked ? (json.liked true) : (LikedVideo.find_by(user_id: @current_user.id, video_id: video.id) ? (json.liked true) : (json.liked false))
    @unseen ? (json.seen false) : (@seen ? (json.seen true) : (SeenVideo.find_by(user_id: @current_user.id, video_id: video.id) ? (json.seen true) : (json.seen false)))
    @skipped ? (json.skipped true) : (SkippedVideo.find_by(user_id: @current_user.id, video_id: video.id) ? (json.skipped true) : (json.skipped false))
  end
  json.tag_list video.tag_list.empty? ? nil : video.tag_list.to_s
  # ((@current_user.nil? || (!@current_user.nil? && !@user_age_meets_requirement)) && video.mature_content) ? (json.streams nil) : (json.partial! 'v1/streams/stream', video: video)
  json.partial! 'v1/streams/stream', video: video
end
