# encoding: utf-8

class HeroImageUploader < CarrierWave::Uploader::Base
  include ::CarrierWave::Backgrounder::Delay
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

  version :thumb_banner do
    process resize_to_fill: [250, 250]
  end

  # def extension_white_list
  #   %w(jpg jpeg png bmp)
  # end

  # def filename
  #   "original_filename.jpeg" if original_filename.present?
  # end

  # def get_dimensions
  #   if file && model
  #     width, height = `identify -format "%wx%h" #{file.path}`.split(/x/).map(&:to_i)
  #     $portrait = true if height > width
  #     puts "GV portrait is setted at #{Time.now}"
  #   end
  # end



  # def resize_to_fill(width, height, gravity = 'Center')
  #   manipulate! do |img|
  #     cols, rows = img[:dimensions]
  #     puts cols
  #     img.combine_options do |cmd|
  #       if width != cols || height != rows
  #         scale_x = width/cols.to_f
  #         scale_y = height/rows.to_f
  #         if scale_x >= scale_y
  #           cols = (scale_x * (cols + 0.5)).round
  #           rows = (scale_x * (rows + 0.5)).round
  #           cmd.resize "#{cols}"
  #         else
  #           cols = (scale_y * (cols + 0.5)).round
  #           rows = (scale_y * (rows + 0.5)).round
  #           cmd.resize "x#{rows}"
  #         end
  #       end
  #       cmd.gravity gravity
  #       cmd.background "rgba(255,255,255,0.0)"
  #       cmd.extent "#{width}x#{height}" if cols != width || rows != height
  #     end
  #     img = yield(img) if block_given?
  #     img
  #   end
  # end
  #
  # def landscape?
  #   get_dimensions[0] >= get_dimensions[1]
  # end
  #
  # def portrait?
  #   get_dimensions[1] > get_dimensions[0]
  # end
# end

end
