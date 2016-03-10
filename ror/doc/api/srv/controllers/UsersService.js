'use strict';

exports.usersGet = function() {

  var examples = {};
  
  examples['application/json'] = {
  "data" : [ {
    "birthday" : "2016-03-10T21:00:14.066+0000",
    "password" : "aeiou",
    "password_confirmation" : "aeiou",
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
  "birthday" : "2016-03-10T21:00:14.067+0000",
  "password" : "aeiou",
  "password_confirmation" : "aeiou",
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
  "birthday" : "2016-03-10T21:00:14.069+0000",
  "password" : "aeiou",
  "password_confirmation" : "aeiou",
  "id" : 123,
  "email" : "aeiou"
};
  

  
  if(Object.keys(examples).length > 0)
    return examples[Object.keys(examples)[0]];
  
}
exports.usersMePut = function(body) {

  var examples = {};
  
  examples['application/json'] = {
  "birthday" : "2016-03-10T21:00:14.069+0000",
  "password" : "aeiou",
  "password_confirmation" : "aeiou",
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
    "link" : "aeiou",
    "created_at" : "2016-03-10T21:00:14.070+0000",
    "description" : "aeiou",
    "title" : "aeiou",
    "deleted_at" : "2016-03-10T21:00:14.070+0000",
    "liked" : true,
    "seen" : true,
    "skipped" : true,
    "mature_content" : true,
    "updated_at" : "2016-03-10T21:00:14.070+0000",
    "category_id" : 123,
    "hero_images" : {
      "hero_image_link_thumb_banner" : "aeiou",
      "hero_image_link_medium_banner" : "aeiou",
      "hero_image_link" : "aeiou",
      "hero_image_link_large_banner" : "aeiou"
    },
    "tag_list" : "aeiou",
    "id" : 123,
    "hero_image_upload_status" : "aeiou",
    "view_count" : 123,
    "skip_count" : 123
  } ]
};
  

  
  if(Object.keys(examples).length > 0)
    return examples[Object.keys(examples)[0]];
  
}
exports.usersMeVideosLikedPut = function(body) {

  var examples = {};
  

  
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
    "link" : "aeiou",
    "created_at" : "2016-03-10T21:00:14.074+0000",
    "description" : "aeiou",
    "title" : "aeiou",
    "deleted_at" : "2016-03-10T21:00:14.074+0000",
    "liked" : true,
    "seen" : true,
    "skipped" : true,
    "mature_content" : true,
    "updated_at" : "2016-03-10T21:00:14.074+0000",
    "category_id" : 123,
    "hero_images" : {
      "hero_image_link_thumb_banner" : "aeiou",
      "hero_image_link_medium_banner" : "aeiou",
      "hero_image_link" : "aeiou",
      "hero_image_link_large_banner" : "aeiou"
    },
    "tag_list" : "aeiou",
    "id" : 123,
    "hero_image_upload_status" : "aeiou",
    "view_count" : 123,
    "skip_count" : 123
  } ]
};
  

  
  if(Object.keys(examples).length > 0)
    return examples[Object.keys(examples)[0]];
  
}
exports.usersMeVideosSeenPut = function(body) {

  var examples = {};
  

  
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
    "link" : "aeiou",
    "created_at" : "2016-03-10T21:00:14.078+0000",
    "description" : "aeiou",
    "title" : "aeiou",
    "deleted_at" : "2016-03-10T21:00:14.078+0000",
    "liked" : true,
    "seen" : true,
    "skipped" : true,
    "mature_content" : true,
    "updated_at" : "2016-03-10T21:00:14.078+0000",
    "category_id" : 123,
    "hero_images" : {
      "hero_image_link_thumb_banner" : "aeiou",
      "hero_image_link_medium_banner" : "aeiou",
      "hero_image_link" : "aeiou",
      "hero_image_link_large_banner" : "aeiou"
    },
    "tag_list" : "aeiou",
    "id" : 123,
    "hero_image_upload_status" : "aeiou",
    "view_count" : 123,
    "skip_count" : 123
  } ]
};
  

  
  if(Object.keys(examples).length > 0)
    return examples[Object.keys(examples)[0]];
  
}
exports.usersMeVideosSkippedPut = function(body) {

  var examples = {};
  

  
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
    "link" : "aeiou",
    "created_at" : "2016-03-10T21:00:14.080+0000",
    "description" : "aeiou",
    "title" : "aeiou",
    "deleted_at" : "2016-03-10T21:00:14.080+0000",
    "liked" : true,
    "seen" : true,
    "skipped" : true,
    "mature_content" : true,
    "updated_at" : "2016-03-10T21:00:14.080+0000",
    "category_id" : 123,
    "hero_images" : {
      "hero_image_link_thumb_banner" : "aeiou",
      "hero_image_link_medium_banner" : "aeiou",
      "hero_image_link" : "aeiou",
      "hero_image_link_large_banner" : "aeiou"
    },
    "tag_list" : "aeiou",
    "id" : 123,
    "hero_image_upload_status" : "aeiou",
    "view_count" : 123,
    "skip_count" : 123
  } ]
};
  

  
  if(Object.keys(examples).length > 0)
    return examples[Object.keys(examples)[0]];
  
}
exports.usersPasswordPut = function(body) {

  var examples = {};
  

  
}
exports.usersPasswordEditGet = function(resetPasswordToken) {

  var examples = {};
  

  
}
exports.usersPasswordResetPost = function(body) {

  var examples = {};
  

  
}
exports.usersUserIdGet = function(userId) {

  var examples = {};
  
  examples['application/json'] = {
  "birthday" : "2016-03-10T21:00:14.083+0000",
  "password" : "aeiou",
  "password_confirmation" : "aeiou",
  "id" : 123,
  "email" : "aeiou"
};
  

  
  if(Object.keys(examples).length > 0)
    return examples[Object.keys(examples)[0]];
  
}
exports.usersUserIdPut = function(body, userId) {

  var examples = {};
  
  examples['application/json'] = {
  "birthday" : "2016-03-10T21:00:14.084+0000",
  "password" : "aeiou",
  "password_confirmation" : "aeiou",
  "id" : 123,
  "email" : "aeiou"
};
  

  
  if(Object.keys(examples).length > 0)
    return examples[Object.keys(examples)[0]];
  
}
