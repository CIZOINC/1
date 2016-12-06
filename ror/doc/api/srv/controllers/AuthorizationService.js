'use strict';

exports.oauthFacebookGet = function(accessToken) {

  var examples = {};
  
  examples['application/json'] = {
  "access_token" : "aeiou",
  "refresh_token" : "aeiou",
  "scope" : "aeiou",
  "created_at" : "2016-12-06T20:46:07.113+0000",
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
  "created_at" : "2016-12-06T20:46:07.116+0000",
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
  "created_at" : "2016-12-06T20:46:07.120+0000",
  "expires_in" : 123
};
  

  
  if(Object.keys(examples).length > 0)
    return examples[Object.keys(examples)[0]];
  
}
