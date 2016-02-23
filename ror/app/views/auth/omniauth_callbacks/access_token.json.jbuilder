json.extract! @access_token, :token, :expires_in, :refresh_token
json.created_at @access_token.created_at.to_i
json.scope @access_token.scopes.to_s
