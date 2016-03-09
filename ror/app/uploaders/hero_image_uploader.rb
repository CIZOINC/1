# encoding: utf-8
class HeroImageUploader < CarrierWave::Uploader::Base

  include ::CarrierWave::Backgrounder::Delay
  include CarrierWave::RMagick
  # include CarrierWave::MiniMagick

  storage :fog

  after :cache, :processing

  def store_dir
    if Rails.env.production?
      "production/images/videos/#{model.id}"
    else
      "staging/images/videos/#{model.id}"
    end
  end

  version :large_banner do
    process resize_to_fill: [1000, 476]
  end

  version :medium_banner do
    process resize_to_fill: [500, 238]
  end

  version :thumb_banner do
    process resize_to_fill: [250, 250]
    after :store, :completed
  end

  %w(completed processing).each do |method|
    define_method(method) do |file|
      Video.find(model.id).update_column(:hero_image_upload_status, method)
    end
  end

end
