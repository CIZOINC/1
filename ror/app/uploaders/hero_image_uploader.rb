# encoding: utf-8

class HeroImageUploader < CarrierWave::Uploader::Base
  include CarrierWave::RMagick
  # include CarrierWave::MiniMagick

  storage :fog

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

  version :thumb do
    process resize_to_fill: [250, 250]
  end

  def extension_white_list
    %w(jpg jpeg png bmp)
  end

end
