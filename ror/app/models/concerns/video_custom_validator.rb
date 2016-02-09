class VideoCustomValidator < ActiveModel::Validator
  def validate(record)
    if (record.featured && !record.featured_order) || (!record.featured && record.featured_order)
      record.errors[:featured_and_featured_order] << "Unable to save record. If featured true, featured_order can not be nil and vice versa"
    end
  end
end
