json.extract! user, :id, :email, :birthday
if action_name == "me"
  json.is_admin as_admin?
else
  if token = last_token(user)
    (token.scopes.to_s == 'admin') ? (json.is_admin true) : (json.is_admin false)
  else
    json.is_admin user.is_admin
  end
end
