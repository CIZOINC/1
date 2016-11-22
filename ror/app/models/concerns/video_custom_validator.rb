class VideoCustomValidator < CustomValidator
  def validate(record)
    super
    record.errors[:codes] << "403.6"  if featured_conditions
    record.errors[:codes] << '422.12' if blank_title?
    record.errors[:codes] << '422.13' if blank_category_id?
    record.errors[:codes] << '422.14' if blank_description?
    record.errors[:codes] << '422.15' if invalid_category_id? && category_not_blank
    record.errors[:codes] << '400.8'  if trying_to_make_featured_video_invisible
    record.errors[:codes] << "400.9"  if trying_to_make_video_without_hero_image_visible
    record.errors[:codes] << "400.10" if trying_to_make_video_with_incompleted_streams_visible
    record.errors[:codes] << "400.13" unless record.errors[:subtitle].blank?
    record.errors[:codes] << "400.14" unless record.errors[:description_title].blank?
  end

  protected

  def category_not_blank
    !@record.category_id.blank?
  end

  def featured_conditions
    (@record.featured && !@record.featured_order) || (!@record.featured && @record.featured_order)
  end

  def invalid_category_id?
    !Category.find_by_id(@record.category_id.to_i)
  end

  def trying_to_make_featured_video_invisible
    !@record.visible && @record.featured
  end

  def trying_to_make_video_without_hero_image_visible
    @record.visible && !@record.hero_image_url
  end

  def trying_to_make_video_with_incompleted_streams_visible
    @record.visible && record_has_incompleted_streams
  end

  def record_has_incompleted_streams
    (@record.streams.map {|stream| stream.incomplete?}).include? true
  end

end
