module ApplicationHelper
  def video_link(video_id)
    if Rails.env.staging?
      "https://staging.cizo.com/app/videos/#{video_id}"
    elsif Rails.env.production?
      "https://cizo.com/videos/#{video_id}"
    end
  end
end
