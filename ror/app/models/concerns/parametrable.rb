module Parametrable
  def password_params
    {min: Devise.password_length.first, max: Devise.password_length.last}
  end
end
