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

  version :large do
    process resize_to_limit: [1000, 1000]
  end

  version :medium, :from_version => :large do
    process resize_to_limit: [500, 500]
  end

  version :thumb, :from_version => :medium do
    process resize_to_fit: [250, 250]
  end

  def extension_white_list
    %w(jpg jpeg png bmp)
  end

end
