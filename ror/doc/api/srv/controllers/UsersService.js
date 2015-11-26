'use strict';

exports.usersGet = function() {

  var examples = {};
  
  examples['application/json'] = {
  "data" : [ {
    "birthday" : "2015-11-26T01:42:22.943+0000",
    "password" : "aeiou",
    "id" : 123,
    "email" : "aeiou"
  } ]
};
  

  
  if(Object.keys(examples).length > 0)
    return examples[Object.keys(examples)[0]];
  
}
exports.usersPut = function(body) {

  var examples = {};
  
  examples['application/json'] = {
  "birthday" : "2015-11-26T01:42:22.946+0000",
  "password" : "aeiou",
  "id" : 123,
  "email" : "aeiou"
};
  

  
  if(Object.keys(examples).length > 0)
    return examples[Object.keys(examples)[0]];
  
}
exports.usersPost = function(body) {

  var examples = {};
  
  examples['application/json'] = {
  "birthday" : "2015-11-26T01:42:22.947+0000",
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
  "birthday" : "2015-11-26T01:42:22.948+0000",
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
  "birthday" : "2015-11-26T01:42:22.949+0000",
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
    "viewable" : true,
    "updated_at" : "2015-11-26T01:42:22.949+0000",
    "category_id" : 123,
    "streams" : [ {
      "transcode_status" : "aeiou",
      "link" : "aeiou",
      "type" : "aeiou"
    } ],
    "created_at" : "2015-11-26T01:42:22.949+0000",
    "description" : "aeiou",
    "id" : 123,
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
