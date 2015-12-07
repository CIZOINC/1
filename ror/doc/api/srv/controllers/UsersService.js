'use strict';

exports.usersGet = function() {

  var examples = {};
  
  examples['application/json'] = {
  "data" : [ {
    "birthday" : "2015-12-07T20:18:55.384+0000",
    "password" : "aeiou",
    "id" : 123,
    "email" : "aeiou"
  } ]
};
  

  
  if(Object.keys(examples).length > 0)
    return examples[Object.keys(examples)[0]];
  
}
exports.usersPost = function(body) {

  var examples = {};
  
  examples['application/json'] = {
  "birthday" : "2015-12-07T20:18:55.385+0000",
  "password" : "aeiou",
  "id" : 123,
  "email" : "aeiou"
};
  

  
  if(Object.keys(examples).length > 0)
    return examples[Object.keys(examples)[0]];
  
}
exports.usersMeGet = function() {

  var examples = {};
  
  examples['application/json'] = {
  "birthday" : "2015-12-07T20:18:55.385+0000",
  "password" : "aeiou",
  "id" : 123,
  "email" : "aeiou"
};
  

  
  if(Object.keys(examples).length > 0)
    return examples[Object.keys(examples)[0]];
  
}
exports.usersMePut = function(body) {

  var examples = {};
  
  examples['application/json'] = {
  "birthday" : "2015-12-07T20:18:55.386+0000",
  "password" : "aeiou",
  "id" : 123,
  "email" : "aeiou"
};
  

  
  if(Object.keys(examples).length > 0)
    return examples[Object.keys(examples)[0]];
  
}
exports.usersMeVideosLikesGet = function() {

  var examples = {};
  
  examples['application/json'] = {
  "data" : [ {
    "streams" : [ {
      "transcode_status" : "aeiou",
      "link" : "aeiou",
      "type" : "aeiou"
    } ],
    "created_at" : "2015-12-07T20:18:55.389+0000",
    "description" : "aeiou",
    "title" : "aeiou",
    "liked" : true,
    "tags" : [ "aeiou" ],
    "viewable" : true,
    "updated_at" : "2015-12-07T20:18:55.389+0000",
    "category_id" : 123,
    "id" : 123,
    "hero_image_link" : "aeiou",
    "mpaa_rating" : "aeiou",
    "view_count" : 123
  } ]
};
  

  
  if(Object.keys(examples).length > 0)
    return examples[Object.keys(examples)[0]];
  
}
exports.usersUserIdGet = function(userId) {

  var examples = {};
  
  examples['application/json'] = {
  "birthday" : "2015-12-07T20:18:55.390+0000",
  "password" : "aeiou",
  "id" : 123,
  "email" : "aeiou"
};
  

  
  if(Object.keys(examples).length > 0)
    return examples[Object.keys(examples)[0]];
  
}
exports.usersUserIdPut = function(body, userId) {

  var examples = {};
  
  examples['application/json'] = {
  "birthday" : "2015-12-07T20:18:55.391+0000",
  "password" : "aeiou",
  "id" : 123,
  "email" : "aeiou"
};
  

  
  if(Object.keys(examples).length > 0)
    return examples[Object.keys(examples)[0]];
  
}
