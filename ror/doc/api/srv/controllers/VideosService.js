'use strict';

exports.videosGet = function(createdBefore, createdAfter, category) {

  var examples = {};
  
  examples['application/json'] = {
  "data" : [ {
    "viewable" : true,
    "updated_at" : "2015-11-26T01:42:22.950+0000",
    "category_id" : 123,
    "streams" : [ {
      "transcode_status" : "aeiou",
      "link" : "aeiou",
      "type" : "aeiou"
    } ],
    "created_at" : "2015-11-26T01:42:22.950+0000",
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
exports.videosVideoIdGet = function(videoId) {

  var examples = {};
  
  examples['application/json'] = {
  "viewable" : true,
  "updated_at" : "2015-11-26T01:42:22.954+0000",
  "category_id" : 123,
  "streams" : [ {
    "transcode_status" : "aeiou",
    "link" : "aeiou",
    "type" : "aeiou"
  } ],
  "created_at" : "2015-11-26T01:42:22.954+0000",
  "description" : "aeiou",
  "id" : 123,
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
  "updated_at" : "2015-11-26T01:42:22.955+0000",
  "category_id" : 123,
  "streams" : [ {
    "transcode_status" : "aeiou",
    "link" : "aeiou",
    "type" : "aeiou"
  } ],
  "created_at" : "2015-11-26T01:42:22.955+0000",
  "description" : "aeiou",
  "id" : 123,
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
