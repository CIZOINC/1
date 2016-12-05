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

  def filename
    "#{SecureRandom.uuid}.#{file.extension}" if original_filename.present?
  end

  version :large_banner do
    process resize_to_fit: [1000, 500] # Use 1000 to maintain aspect ratio. The height will be the constraining factor
  end

  version :medium_banner do
    process resize_to_fit: [1000, 300] # Use 1000 to maintain aspect ratio. The height will be the constraining factor
  end

  version :thumb_banner do
    process resize_to_fit: [1000, 155] # Use 1000 to maintain aspect ratio. The height will be the constraining factor
    after :store, :completed
  end

  %w(completed processing).each do |method|
    define_method(method) do |file|
      Video.find(model.id).update_column(:hero_image_upload_status, method)
    end
  end

end
