class CategoryCustomValidator < CustomValidator
  def validate(record)
    super
    record.errors[:codes] << '422.12' if blank_title?
    record.errors[:codes] << '409.1'  if title_has_been_taken?
  end

  protected

  def title_has_been_taken?
     find_by_canonical_title && !attepmt_to_update_self
  end

  def attepmt_to_update_self
    find_by_canonical_title.try(:id) == @record.id
  end

  def find_by_canonical_title
    Category.find_by_canonical_title(@record.title.to_canonical)
  end
end
