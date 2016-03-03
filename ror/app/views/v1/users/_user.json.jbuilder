json.extract! user, :id, :email, :birthday
if action_name == "me"
  json.is_admin as_admin?
else
  json.as_admin user.logged_in_as_admin
end
