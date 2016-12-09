@json = json
@video = video
if @show_invisible || @show_deleted
  json.extract! video, :id
else
  json.extract! video, :id, :created_at, :updated_at, :title, :subtitle, :description_title, :description, :mature_content, :category_id, :visible, :featured

  if video.hero_image.url && video.hero_image_ready?
    json.set! :hero_images do
      json.hero_image_link video.hero_image.url
      %w(large_banner medium_banner thumb_banner).each { |size| json.set! "hero_image_link_#{size}", video.hero_image.url(size.to_sym) }
    end
  end

  json.featured_order video.featured_order if @featured

  if @current_user
    if as_admin?
      json.deleted_at video.deleted_at
      json.hero_image_upload_status video.hero_image_upload_status
    end

    %w(view skip).each {|i| json.set! "#{i}_count", video["#{i}_count"] } if as_admin?

    liked
    @unseen ? (json.seen false) : seen
    skipped
  end

  json.link video_link(video.id)
  json.tag_list video.tag_list.empty? ? nil : video.tag_list.to_s
  # ((@current_user.nil? || (!@current_user.nil? && !@user_age_meets_requirement)) && video.mature_content) ? (json.streams nil) : (json.partial! 'v1/streams/stream', video: video)
  json.partial! 'v1/streams/stream', video: video
end
