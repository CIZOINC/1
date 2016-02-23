class UserCustomValidator < CustomValidator

  def validate(record)
    super
    #email
    record.errors[:codes] << "422.1"  if blank_email?
    record.errors[:codes] << "422.2"  if (!blank_email? && !valid_email?)
    record.errors[:codes] << "409.2"  if (valid_email? && email_has_been_taken? && new_record?)
    #password
    record.errors[:codes] << "422.4"  if (blank_password? && new_record?)
    record.errors[:codes] << "422.5"  if (!blank_password? && password_too_short?)
    record.errors[:codes] << "422.6"  if (record.password && password_too_long?)
    record.errors[:codes] << "422.7"  if (!blank_password? && blank_password_confirmation? && password_is_valid? && new_record?)
    record.errors[:codes] << "422.8" if password_confirmation_does_not_match_password(record.password, record.try(:password_confirmation))
    #birthday
    record.errors[:codes] << "422.9"  if blank_birthday?
    record.errors[:codes] << "422.10"  if (!blank_birthday? && !valid_birthday?)
  end

  protected

  def new_record?
    @record.new_record?
  end

  def valid_email?
    Devise.email_regexp =~ @record.email
  end

  def password_too_short?
    @record.password.length < Devise.password_length.first
  end

  def password_too_long?
    @record.password.length > Devise.password_length.last
  end

  def valid_birthday?
    @record.birthday =~ /\A\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}.\d{3}Z\z/
  end

  def password_is_valid?
    !password_too_short? && !password_too_long?
  end

  def password_confirmation_does_not_match_password(password, password_confirmation=nil)
    password != password_confirmation if !password_confirmation.blank?
  end

  def email_has_been_taken?
     User.find_by_email(@record.email)
  end

end
