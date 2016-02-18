class HeroImageValidator < CustomValidator
  def validate(record)
    super
    record.errors[:codes] << '422.22' if hero_image_extension_not_allowed
  end

  protected

  def hero_image_extension_not_allowed
    !hero_image_extension(@record.hero_image).in? extension_white_list
  end

  def hero_image_extension(filename)
    (filename.send :original_filename ).split('.').last
  end

  def extension_white_list
    %w(jpg jpeg png bmp)
  end

end
