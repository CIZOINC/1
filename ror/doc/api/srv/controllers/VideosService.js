'use strict';

exports.videosGet = function() {

  var examples = {};
  
  examples['application/json'] = {
  "data" : [ {
    "viewable" : true,
    "updated_at" : "2015-11-25T23:00:07.206+0000",
    "streams" : [ {
      "transcode_status" : "aeiou",
      "link" : "aeiou",
      "type" : "aeiou"
    } ],
    "created_at" : "2015-11-25T23:00:07.206+0000",
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
exports.videosVideoIdGet = function(videoId) {

  var examples = {};
  
  examples['application/json'] = {
  "viewable" : true,
  "updated_at" : "2015-11-25T23:00:07.209+0000",
  "streams" : [ {
    "transcode_status" : "aeiou",
    "link" : "aeiou",
    "type" : "aeiou"
  } ],
  "created_at" : "2015-11-25T23:00:07.209+0000",
  "description" : "aeiou",
  "id" : 123456789,
  "title" : "aeiou",
  "hero_image_link" : "aeiou",
  "mpaa_rating" : "aeiou",
  "view_count" : 123,
  "tags" : [ "aeiou" ]
};
  

  
  if(Object.keys(examples).length > 0)
    return examples[Object.keys(examples)[0]];
  
}
exports.videosVideoIdPut = function(body, videoId) {

  var examples = {};
  
  examples['application/json'] = {
  "viewable" : true,
  "updated_at" : "2015-11-25T23:00:07.213+0000",
  "streams" : [ {
    "transcode_status" : "aeiou",
    "link" : "aeiou",
    "type" : "aeiou"
  } ],
  "created_at" : "2015-11-25T23:00:07.213+0000",
  "description" : "aeiou",
  "id" : 123456789,
  "title" : "aeiou",
  "hero_image_link" : "aeiou",
  "mpaa_rating" : "aeiou",
  "view_count" : 123,
  "tags" : [ "aeiou" ]
};
  

  
  if(Object.keys(examples).length > 0)
    return examples[Object.keys(examples)[0]];
  
}
exports.videosVideoIdDelete = function(videoId) {

  var examples = {};
  

  
}
exports.videosVideoIdHeroImagePost = function(videoId) {

  var examples = {};
  

  
}
exports.videosVideoIdLikePut = function(videoId) {

  var examples = {};
  

  
}
exports.videosVideoIdLikeDelete = function(videoId) {

  var examples = {};
  

  
}
exports.videosVideoIdStreamPost = function(body, videoId) {

  var examples = {};
  

  
}
exports.videosVideoIdStreamTranscodeRequestGet = function(videoId) {

  var examples = {};
  
  examples['application/json'] = {
  "aws_access_key_id" : "aeiou",
  "signature" : "aeiou",
  "acl" : "aeiou",
  "key" : "aeiou",
  "policy" : "aeiou"
};
  

  
  if(Object.keys(examples).length > 0)
    return examples[Object.keys(examples)[0]];
  
}
