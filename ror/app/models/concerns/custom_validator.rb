class CustomValidator < ActiveModel::Validator

  def validate(record)
    @record = record
  end

  protected

  %w(email password birthday password_confirmation title category_id description).each do |param|
    define_method("blank_#{param}?") do
      @record.send("#{param}").blank?
    end
  end

end
