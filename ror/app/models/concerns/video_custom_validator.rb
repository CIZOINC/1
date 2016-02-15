class VideoCustomValidator < CustomValidator
  def validate(record)
    super
    record.errors[:codes] << "403.6" if featured_conditions

  end

  protected

  def featured_conditions
    (@record.featured && !@record.featured_order) || (!@record.featured && @record.featured_order)
  end
end
