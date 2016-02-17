class VideoCustomValidator < CustomValidator
  def validate(record)
    super
    record.errors[:codes] << "403.6" if featured_conditions
    record.errors[:codes] << '422.12' if blank_title?
    record.errors[:codes] << '422.13' if blank_category_id?
    record.errors[:codes] << '422.14' if blank_description?
    record.errors[:codes] << '422.15' if invalid_category_id?
    record.errors[:codes] << '400.8' if trying_to_make_featured_video_invisible

  end

  protected

  def featured_conditions
    (@record.featured && !@record.featured_order) || (!@record.featured && @record.featured_order)
  end

  def invalid_category_id?
    puts @record.category_id
    
    !Category.find_by_id(@record.category_id.to_i)
  end

  def trying_to_make_featured_video_invisible
    !@record.visible && @record.featured
  end

end
