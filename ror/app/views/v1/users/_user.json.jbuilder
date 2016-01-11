json.extract! user, :id, :email, :birthday
json.extract! user, :is_admin if Rails.env.development?
