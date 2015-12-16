'use strict';

exports.usersGet = function() {

  var examples = {};
  
  examples['application/json'] = {
  "data" : [ {
    "id" : 123,
    "birthday" : "2015-12-16T06:33:11.924+0000",
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
  "birthday" : "2015-12-16T06:33:11.926+0000",
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
  "birthday" : "2015-12-16T06:33:11.927+0000",
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
  "birthday" : "2015-12-16T06:33:11.929+0000",
  "email" : "aeiou",
  "password" : "aeiou"
};
  

  
  if(Object.keys(examples).length > 0)
    return examples[Object.keys(examples)[0]];
  
}
exports.usersMeDelete = function() {

  var examples = {};
  

  
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
    "updated_at" : "2015-12-16T06:33:11.931+0000",
    "viewable" : true,
    "description" : "aeiou",
    "created_at" : "2015-12-16T06:33:11.931+0000",
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
  "birthday" : "2015-12-16T06:33:11.933+0000",
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
  "birthday" : "2015-12-16T06:33:11.935+0000",
  "email" : "aeiou",
  "password" : "aeiou"
};
  

  
  if(Object.keys(examples).length > 0)
    return examples[Object.keys(examples)[0]];
  
}
