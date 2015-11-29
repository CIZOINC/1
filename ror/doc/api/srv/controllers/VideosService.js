'use strict';

exports.videosGet = function(category, tags, createdBefore, createdAfter) {

  var examples = {};
  
  examples['application/json'] = {
  "data" : [ {
    "tags" : [ "aeiou" ],
    "id" : 123,
    "title" : "aeiou",
    "viewable" : true,
    "updated_at" : "2015-11-29T23:41:27.340+0000",
    "description" : "aeiou",
    "category_id" : 123,
    "created_at" : "2015-11-29T23:41:27.340+0000",
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
exports.videosVideoIdGet = function(videoId) {

  var examples = {};
  
  examples['application/json'] = {
  "tags" : [ "aeiou" ],
  "id" : 123,
  "title" : "aeiou",
  "viewable" : true,
  "updated_at" : "2015-11-29T23:41:27.348+0000",
  "description" : "aeiou",
  "category_id" : 123,
  "created_at" : "2015-11-29T23:41:27.348+0000",
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
  "id" : 123,
  "title" : "aeiou",
  "viewable" : true,
  "updated_at" : "2015-11-29T23:41:27.350+0000",
  "description" : "aeiou",
  "category_id" : 123,
  "created_at" : "2015-11-29T23:41:27.350+0000",
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
