module V1::VideosHelper
  def video_link(video_id)
    if Rails.env.staging?
      "https://staging.cizo.com/app/#/videos/#{video_id}"
    elsif Rails.env.production?
      "https://cizo.com/#/videos/#{video_id}"
    end
  end

  %w(seen skipped liked).each do |method|
    define_method("#{method}") do
      @method =  method
      instance_variable_get(:"@#{method}") ?
        set_cond :
        eval(method.capitalize + 'Video').find_by(user_id: @current_user.id, video_id: @video.id) ?
          set_cond :
          (set_cond false)
    end
  end

  def set_cond(value=true)
    @json.set! @method, value
  end
end
