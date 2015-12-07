'use strict';

exports.videosGet = function(category, tags, createdBefore, createdAfter) {

  var examples = {};
  
  examples['application/json'] = {
  "data" : [ {
    "tags" : [ "aeiou" ],
    "liked" : true,
    "category_id" : 123,
    "id" : 123,
    "title" : "aeiou",
    "updated_at" : "2015-12-07T00:35:07.478+0000",
    "viewable" : true,
    "description" : "aeiou",
    "created_at" : "2015-12-07T00:35:07.478+0000",
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
exports.videosStreamsTranscodeNotificationPost = function() {

  var examples = {};
  

  
}
exports.videosVideoIdGet = function(videoId) {

  var examples = {};
  
  examples['application/json'] = {
  "tags" : [ "aeiou" ],
  "liked" : true,
  "category_id" : 123,
  "id" : 123,
  "title" : "aeiou",
  "updated_at" : "2015-12-07T00:35:07.487+0000",
  "viewable" : true,
  "description" : "aeiou",
  "created_at" : "2015-12-07T00:35:07.487+0000",
  "streams" : [ {
    "transcode_status" : "aeiou",
    "link" : "aeiou",
    "type" : "aeiou"
  } ],
  "hero_image_link" : "aeiou",
  "view_count" : 123,
  "mpaa_rating" : "aeiou"
};
  

  
  if(Object.keys(examples).length > 0)
    return examples[Object.keys(examples)[0]];
  
}
exports.videosVideoIdPut = function(body, videoId) {

  var examples = {};
  
  examples['application/json'] = {
  "tags" : [ "aeiou" ],
  "liked" : true,
  "category_id" : 123,
  "id" : 123,
  "title" : "aeiou",
  "updated_at" : "2015-12-07T00:35:07.490+0000",
  "viewable" : true,
  "description" : "aeiou",
  "created_at" : "2015-12-07T00:35:07.490+0000",
  "streams" : [ {
    "transcode_status" : "aeiou",
    "link" : "aeiou",
    "type" : "aeiou"
  } ],
  "hero_image_link" : "aeiou",
  "view_count" : 123,
  "mpaa_rating" : "aeiou"
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
exports.videosVideoIdStreamTranscodeRequestGet = function(videoId) {

  var examples = {};
  
  examples['application/json'] = {
  "aws_access_key_id" : "aeiou",
  "acl" : "aeiou",
  "policy" : "aeiou",
  "key" : "aeiou",
  "signature" : "aeiou"
};
  

  
  if(Object.keys(examples).length > 0)
    return examples[Object.keys(examples)[0]];
  
}
exports.videosVideoIdStreamsPost = function(body, videoId) {

  var examples = {};
  

  
}
exports.videosVideoIdStreamsStreamTypeGet = function(videoId, streamType) {

  var examples = {};
  
  examples['application/json'] = {
  "message" : "aeiou",
  "code" : 123
};
  

  
  if(Object.keys(examples).length > 0)
    return examples[Object.keys(examples)[0]];
  
}
