'use strict';

exports.usersGet = function() {

  var examples = {};
  
  examples['application/json'] = {
  "data" : [ {
    "birthday" : "2015-12-07T22:31:39.554+0000",
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
  "birthday" : "2015-12-07T22:31:39.555+0000",
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
  "birthday" : "2015-12-07T22:31:39.557+0000",
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
  "birthday" : "2015-12-07T22:31:39.558+0000",
  "password" : "aeiou",
  "id" : 123,
  "email" : "aeiou"
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
    "streams" : [ {
      "transcode_status" : "aeiou",
      "link" : "aeiou",
      "type" : "aeiou"
    } ],
    "created_at" : "2015-12-07T22:31:39.559+0000",
    "description" : "aeiou",
    "title" : "aeiou",
    "liked" : true,
    "tags" : [ "aeiou" ],
    "viewable" : true,
    "updated_at" : "2015-12-07T22:31:39.559+0000",
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
  "birthday" : "2015-12-07T22:31:39.560+0000",
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
  "birthday" : "2015-12-07T22:31:39.561+0000",
  "password" : "aeiou",
  "id" : 123,
  "email" : "aeiou"
};
  

  
  if(Object.keys(examples).length > 0)
    return examples[Object.keys(examples)[0]];
  
}
