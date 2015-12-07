'use strict';

exports.videosGet = function(category, tags, createdBefore, createdAfter) {

  var examples = {};
  
  examples['application/json'] = {
  "data" : [ {
    "streams" : [ {
      "transcode_status" : "aeiou",
      "link" : "aeiou",
      "type" : "aeiou"
    } ],
    "created_at" : "2015-12-07T20:18:55.391+0000",
    "description" : "aeiou",
    "title" : "aeiou",
    "liked" : true,
    "tags" : [ "aeiou" ],
    "viewable" : true,
    "updated_at" : "2015-12-07T20:18:55.391+0000",
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
exports.videosVideoIdGet = function(videoId) {

  var examples = {};
  
  examples['application/json'] = {
  "streams" : [ {
    "transcode_status" : "aeiou",
    "link" : "aeiou",
    "type" : "aeiou"
  } ],
  "created_at" : "2015-12-07T20:18:55.396+0000",
  "description" : "aeiou",
  "title" : "aeiou",
  "liked" : true,
  "tags" : [ "aeiou" ],
  "viewable" : true,
  "updated_at" : "2015-12-07T20:18:55.396+0000",
  "category_id" : 123,
  "id" : 123,
  "hero_image_link" : "aeiou",
  "mpaa_rating" : "aeiou",
  "view_count" : 123
};
  

  
  if(Object.keys(examples).length > 0)
    return examples[Object.keys(examples)[0]];
  
}
exports.videosVideoIdPut = function(body, videoId) {

  var examples = {};
  
  examples['application/json'] = {
  "streams" : [ {
    "transcode_status" : "aeiou",
    "link" : "aeiou",
    "type" : "aeiou"
  } ],
  "created_at" : "2015-12-07T20:18:55.399+0000",
  "description" : "aeiou",
  "title" : "aeiou",
  "liked" : true,
  "tags" : [ "aeiou" ],
  "viewable" : true,
  "updated_at" : "2015-12-07T20:18:55.399+0000",
  "category_id" : 123,
  "id" : 123,
  "hero_image_link" : "aeiou",
  "mpaa_rating" : "aeiou",
  "view_count" : 123
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
