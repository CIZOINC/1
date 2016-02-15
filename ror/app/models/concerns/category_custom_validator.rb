class CategoryCustomValidator < CustomValidator
  def validate(record)
    super
    record.errors[:codes] << '422.12' if blank_title?
    record.errors[:codes] << '409.1' if title_has_been_taken?
  end

  protected

  def title_has_been_taken?
    Category.find_by_title(@record.title)
  end
end
