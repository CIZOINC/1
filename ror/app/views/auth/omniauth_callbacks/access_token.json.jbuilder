json.extract! @access_token, :token, :expires_in, :refresh_token
json.scopes @access_token.scopes.to_s
