'use strict';

exports.usersGet = function() {

  var examples = {};
  
  examples['application/json'] = {
  "data" : [ {
    "id" : 123,
    "birthday" : "2015-12-07T00:35:07.466+0000",
    "email" : "aeiou",
    "password" : "aeiou"
  } ]
};
  

  
  if(Object.keys(examples).length > 0)
    return examples[Object.keys(examples)[0]];
  
}
exports.usersPost = function(body) {

  var examples = {};
  
  examples['application/json'] = {
  "id" : 123,
  "birthday" : "2015-12-07T00:35:07.467+0000",
  "email" : "aeiou",
  "password" : "aeiou"
};
  

  
  if(Object.keys(examples).length > 0)
    return examples[Object.keys(examples)[0]];
  
}
exports.usersMeGet = function() {

  var examples = {};
  
  examples['application/json'] = {
  "id" : 123,
  "birthday" : "2015-12-07T00:35:07.469+0000",
  "email" : "aeiou",
  "password" : "aeiou"
};
  

  
  if(Object.keys(examples).length > 0)
    return examples[Object.keys(examples)[0]];
  
}
exports.usersMePut = function(body) {

  var examples = {};
  
  examples['application/json'] = {
  "id" : 123,
  "birthday" : "2015-12-07T00:35:07.470+0000",
  "email" : "aeiou",
  "password" : "aeiou"
};
  

  
  if(Object.keys(examples).length > 0)
    return examples[Object.keys(examples)[0]];
  
}
exports.usersMeVideosLikesGet = function() {

  var examples = {};
  
  examples['application/json'] = {
  "data" : [ {
    "tags" : [ "aeiou" ],
    "liked" : true,
    "category_id" : 123,
    "id" : 123,
    "title" : "aeiou",
    "updated_at" : "2015-12-07T00:35:07.473+0000",
    "viewable" : true,
    "description" : "aeiou",
    "created_at" : "2015-12-07T00:35:07.473+0000",
    "streams" : [ {
      "transcode_status" : "aeiou",
      "link" : "aeiou",
      "type" : "aeiou"
    } ],
    "hero_image_link" : "aeiou",
    "view_count" : 123,
    "mpaa_rating" : "aeiou"
  } ]
};
  

  
  if(Object.keys(examples).length > 0)
    return examples[Object.keys(examples)[0]];
  
}
exports.usersUserIdGet = function(userId) {

  var examples = {};
  
  examples['application/json'] = {
  "id" : 123,
  "birthday" : "2015-12-07T00:35:07.474+0000",
  "email" : "aeiou",
  "password" : "aeiou"
};
  

  
  if(Object.keys(examples).length > 0)
    return examples[Object.keys(examples)[0]];
  
}
exports.usersUserIdPut = function(body, userId) {

  var examples = {};
  
  examples['application/json'] = {
  "id" : 123,
  "birthday" : "2015-12-07T00:35:07.476+0000",
  "email" : "aeiou",
  "password" : "aeiou"
};
  

  
  if(Object.keys(examples).length > 0)
    return examples[Object.keys(examples)[0]];
  
}
