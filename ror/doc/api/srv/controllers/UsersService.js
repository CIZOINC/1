'use strict';

exports.usersGet = function() {

  var examples = {};
  
  examples['application/json'] = {
  "data" : [ {
    "birthday" : "2016-01-26T22:33:31.875+0000",
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
  "birthday" : "2016-01-26T22:33:31.875+0000",
  "password" : "aeiou",
  "id" : 123,
  "email" : "aeiou"
};
  

  
  if(Object.keys(examples).length > 0)
    return examples[Object.keys(examples)[0]];
  
}
exports.usersGuestVideosSeenVideoIdPut = function(videoId) {

  var examples = {};
  

  
}
exports.usersGuestVideosSkippedVideoIdPut = function(videoId) {

  var examples = {};
  

  
}
exports.usersMeGet = function() {

  var examples = {};
  
  examples['application/json'] = {
  "birthday" : "2016-01-26T22:33:31.877+0000",
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
  "birthday" : "2016-01-26T22:33:31.878+0000",
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
exports.usersMeVideosLikedGet = function(createdBefore, createdAfter, count) {

  var examples = {};
  
  examples['application/json'] = {
  "data" : [ {
    "visible" : true,
    "streams" : [ {
      "transcode_status" : "aeiou",
      "link" : "aeiou",
      "stream_type" : "aeiou"
    } ],
    "created_at" : "2016-01-26T22:33:31.879+0000",
    "description" : "aeiou",
    "title" : "aeiou",
    "liked" : true,
    "seen" : true,
    "skipped" : true,
    "mature_content" : true,
    "updated_at" : "2016-01-26T22:33:31.879+0000",
    "category_id" : 123,
    "tag_list" : "aeiou",
    "id" : 123,
    "hero_image_link" : "aeiou",
    "view_count" : 123,
    "skip_count" : 123
  } ]
};
  

  
  if(Object.keys(examples).length > 0)
    return examples[Object.keys(examples)[0]];
  
}
exports.usersMeVideosLikedVideoIdPut = function(videoId) {

  var examples = {};
  

  
}
exports.usersMeVideosLikedVideoIdDelete = function(videoId) {

  var examples = {};
  

  
}
exports.usersMeVideosSeenGet = function(createdBefore, createdAfter, count) {

  var examples = {};
  
  examples['application/json'] = {
  "data" : [ {
    "visible" : true,
    "streams" : [ {
      "transcode_status" : "aeiou",
      "link" : "aeiou",
      "stream_type" : "aeiou"
    } ],
    "created_at" : "2016-01-26T22:33:31.882+0000",
    "description" : "aeiou",
    "title" : "aeiou",
    "liked" : true,
    "seen" : true,
    "skipped" : true,
    "mature_content" : true,
    "updated_at" : "2016-01-26T22:33:31.882+0000",
    "category_id" : 123,
    "tag_list" : "aeiou",
    "id" : 123,
    "hero_image_link" : "aeiou",
    "view_count" : 123,
    "skip_count" : 123
  } ]
};
  

  
  if(Object.keys(examples).length > 0)
    return examples[Object.keys(examples)[0]];
  
}
exports.usersMeVideosSeenVideoIdPut = function(videoId) {

  var examples = {};
  

  
}
exports.usersMeVideosSkippedGet = function(createdBefore, createdAfter, count) {

  var examples = {};
  
  examples['application/json'] = {
  "data" : [ {
    "visible" : true,
    "streams" : [ {
      "transcode_status" : "aeiou",
      "link" : "aeiou",
      "stream_type" : "aeiou"
    } ],
    "created_at" : "2016-01-26T22:33:31.885+0000",
    "description" : "aeiou",
    "title" : "aeiou",
    "liked" : true,
    "seen" : true,
    "skipped" : true,
    "mature_content" : true,
    "updated_at" : "2016-01-26T22:33:31.885+0000",
    "category_id" : 123,
    "tag_list" : "aeiou",
    "id" : 123,
    "hero_image_link" : "aeiou",
    "view_count" : 123,
    "skip_count" : 123
  } ]
};
  

  
  if(Object.keys(examples).length > 0)
    return examples[Object.keys(examples)[0]];
  
}
exports.usersMeVideosSkippedVideoIdPut = function(videoId) {

  var examples = {};
  

  
}
exports.usersMeVideosUnseenGet = function(createdBefore, createdAfter, count) {

  var examples = {};
  
  examples['application/json'] = {
  "data" : [ {
    "visible" : true,
    "streams" : [ {
      "transcode_status" : "aeiou",
      "link" : "aeiou",
      "stream_type" : "aeiou"
    } ],
    "created_at" : "2016-01-26T22:33:31.887+0000",
    "description" : "aeiou",
    "title" : "aeiou",
    "liked" : true,
    "seen" : true,
    "skipped" : true,
    "mature_content" : true,
    "updated_at" : "2016-01-26T22:33:31.887+0000",
    "category_id" : 123,
    "tag_list" : "aeiou",
    "id" : 123,
    "hero_image_link" : "aeiou",
    "view_count" : 123,
    "skip_count" : 123
  } ]
};
  

  
  if(Object.keys(examples).length > 0)
    return examples[Object.keys(examples)[0]];
  
}
exports.usersUserIdGet = function(userId) {

  var examples = {};
  
  examples['application/json'] = {
  "birthday" : "2016-01-26T22:33:31.889+0000",
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
  "birthday" : "2016-01-26T22:33:31.889+0000",
  "password" : "aeiou",
  "id" : 123,
  "email" : "aeiou"
};
  

  
  if(Object.keys(examples).length > 0)
    return examples[Object.keys(examples)[0]];
  
}
