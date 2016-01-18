json.extract! user, :id, :email, :birthday
if Rails.env.development?
  json.extract! user, :is_admin
  json.logged_in_as_admin as_admin? if action_name == 'me'
end
