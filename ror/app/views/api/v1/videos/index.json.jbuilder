json.array! @videos do |video|
  json.extract! video, :id, :created_at, :updated_at, :title, :description, :mpaa_rating, :liked, :hero_image_link, :view_count

  json.category_id video.try :category_id
  json.viewable video.try :viewable

end
