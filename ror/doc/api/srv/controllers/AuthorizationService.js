'use strict';

exports.oauthFacebookGet = function(accessToken) {

  var examples = {};
  
  examples['application/json'] = {
  "access_token" : "aeiou",
  "refresh_token" : "aeiou",
  "scope" : "aeiou",
  "created_at" : "2016-11-21T20:28:14.620+0000",
  "expires_in" : 123
};
  

  
  if(Object.keys(examples).length > 0)
    return examples[Object.keys(examples)[0]];
  
}
exports.oauthTokenPost = function(body) {

  var examples = {};
  
  examples['application/json'] = {
  "access_token" : "aeiou",
  "refresh_token" : "aeiou",
  "scope" : "aeiou",
  "created_at" : "2016-11-21T20:28:14.625+0000",
  "token_type" : "aeiou",
  "expires_in" : 123
};
  

  
  if(Object.keys(examples).length > 0)
    return examples[Object.keys(examples)[0]];
  
}
exports.usersAuthFacebookGet = function() {

  var examples = {};
  
  examples['application/json'] = {
  "access_token" : "aeiou",
  "refresh_token" : "aeiou",
  "scope" : "aeiou",
  "created_at" : "2016-11-21T20:28:14.630+0000",
  "expires_in" : 123
};
  

  
  if(Object.keys(examples).length > 0)
    return examples[Object.keys(examples)[0]];
  
}
