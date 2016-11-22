'use strict';

exports.oauthFacebookGet = function(accessToken) {

  var examples = {};
  
  examples['application/json'] = {
  "access_token" : "aeiou",
  "refresh_token" : "aeiou",
  "scope" : "aeiou",
  "created_at" : "2016-11-22T18:55:07.019+0000",
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
  "created_at" : "2016-11-22T18:55:07.023+0000",
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
  "created_at" : "2016-11-22T18:55:07.028+0000",
  "expires_in" : 123
};
  

  
  if(Object.keys(examples).length > 0)
    return examples[Object.keys(examples)[0]];
  
}
