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
    "updated_at" : "2015-12-16T06:33:11.936+0000",
    "viewable" : true,
    "description" : "aeiou",
    "created_at" : "2015-12-16T06:33:11.936+0000",
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
exports.videosPost = function(body) {

  var examples = {};
  
  examples['application/json'] = {
  "id" : 123,
  "tags" : [ "aeiou" ],
  "title" : "aeiou",
  "updated_at" : "2015-12-16T06:33:11.943+0000",
  "description" : "aeiou",
  "category_id" : 123,
  "created_at" : "2015-12-16T06:33:11.943+0000",
  "mpaa_rating" : "aeiou"
};
  

  
  if(Object.keys(examples).length > 0)
    return examples[Object.keys(examples)[0]];
  
}
exports.videosVideoIdGet = function(videoId) {

  var examples = {};
  
  examples['application/json'] = {
  "tags" : [ "aeiou" ],
  "liked" : true,
  "category_id" : 123,
  "id" : 123,
  "title" : "aeiou",
  "updated_at" : "2015-12-16T06:33:11.945+0000",
  "viewable" : true,
  "description" : "aeiou",
  "created_at" : "2015-12-16T06:33:11.945+0000",
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
  "updated_at" : "2015-12-16T06:33:11.949+0000",
  "viewable" : true,
  "description" : "aeiou",
  "created_at" : "2015-12-16T06:33:11.949+0000",
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
