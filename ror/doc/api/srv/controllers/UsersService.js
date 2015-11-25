'use strict';

exports.usersGet = function() {

  var examples = {};
  
  examples['application/json'] = {
  "data" : [ {
    "birthday" : "2015-11-25T23:00:07.179+0000",
    "password" : "aeiou",
    "last_name" : "aeiou",
    "id" : "aeiou",
    "first_name" : "aeiou",
    "email" : "aeiou"
  } ]
};
  

  
  if(Object.keys(examples).length > 0)
    return examples[Object.keys(examples)[0]];
  
}
exports.usersPut = function(body) {

  var examples = {};
  
  examples['application/json'] = {
  "birthday" : "2015-11-25T23:00:07.189+0000",
  "password" : "aeiou",
  "last_name" : "aeiou",
  "id" : "aeiou",
  "first_name" : "aeiou",
  "email" : "aeiou"
};
  

  
  if(Object.keys(examples).length > 0)
    return examples[Object.keys(examples)[0]];
  
}
exports.usersPost = function(body) {

  var examples = {};
  
  examples['application/json'] = {
  "birthday" : "2015-11-25T23:00:07.191+0000",
  "password" : "aeiou",
  "last_name" : "aeiou",
  "id" : "aeiou",
  "first_name" : "aeiou",
  "email" : "aeiou"
};
  

  
  if(Object.keys(examples).length > 0)
    return examples[Object.keys(examples)[0]];
  
}
exports.usersMeGet = function() {

  var examples = {};
  
  examples['application/json'] = {
  "birthday" : "2015-11-25T23:00:07.192+0000",
  "password" : "aeiou",
  "last_name" : "aeiou",
  "id" : "aeiou",
  "first_name" : "aeiou",
  "email" : "aeiou"
};
  

  
  if(Object.keys(examples).length > 0)
    return examples[Object.keys(examples)[0]];
  
}
exports.usersMePut = function(body) {

  var examples = {};
  
  examples['application/json'] = {
  "birthday" : "2015-11-25T23:00:07.193+0000",
  "password" : "aeiou",
  "last_name" : "aeiou",
  "id" : "aeiou",
  "first_name" : "aeiou",
  "email" : "aeiou"
};
  

  
  if(Object.keys(examples).length > 0)
    return examples[Object.keys(examples)[0]];
  
}
exports.usersMeVideosLikesGet = function() {

  var examples = {};
  
  examples['application/json'] = {
  "data" : [ {
    "viewable" : true,
    "updated_at" : "2015-11-25T23:00:07.195+0000",
    "streams" : [ {
      "transcode_status" : "aeiou",
      "link" : "aeiou",
      "type" : "aeiou"
    } ],
    "created_at" : "2015-11-25T23:00:07.195+0000",
    "description" : "aeiou",
    "id" : 123456789,
    "title" : "aeiou",
    "hero_image_link" : "aeiou",
    "mpaa_rating" : "aeiou",
    "view_count" : 123,
    "tags" : [ "aeiou" ]
  } ]
};
  

  
  if(Object.keys(examples).length > 0)
    return examples[Object.keys(examples)[0]];
  
}
