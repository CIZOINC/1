'use strict';

exports.usersGet = function() {

  var examples = {};
  
  examples['application/json'] = {
  "data" : [ {
    "id" : 123,
    "birthday" : "2015-11-29T23:41:27.327+0000",
    "email" : "aeiou",
    "password" : "aeiou"
  } ]
};
  

  
  if(Object.keys(examples).length > 0)
    return examples[Object.keys(examples)[0]];
  
}
exports.usersPut = function(body) {

  var examples = {};
  
  examples['application/json'] = {
  "id" : 123,
  "birthday" : "2015-11-29T23:41:27.331+0000",
  "email" : "aeiou",
  "password" : "aeiou"
};
  

  
  if(Object.keys(examples).length > 0)
    return examples[Object.keys(examples)[0]];
  
}
exports.usersPost = function(body) {

  var examples = {};
  
  examples['application/json'] = {
  "id" : 123,
  "birthday" : "2015-11-29T23:41:27.333+0000",
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
  "birthday" : "2015-11-29T23:41:27.335+0000",
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
  "birthday" : "2015-11-29T23:41:27.337+0000",
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
    "id" : 123,
    "title" : "aeiou",
    "viewable" : true,
    "updated_at" : "2015-11-29T23:41:27.338+0000",
    "description" : "aeiou",
    "category_id" : 123,
    "created_at" : "2015-11-29T23:41:27.338+0000",
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
