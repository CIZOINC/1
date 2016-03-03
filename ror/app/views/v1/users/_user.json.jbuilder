json.extract! user, :id, :email, :birthday
json.is_admin user.is_admin if as_admin?

