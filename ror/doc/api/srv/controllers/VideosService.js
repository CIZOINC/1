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
    "created_at" : "2015-12-19T02:10:53.523+0000",
    "description" : "aeiou",
    "title" : "aeiou",
    "liked" : true,
    "tags" : [ "aeiou" ],
    "viewable" : true,
    "updated_at" : "2015-12-19T02:10:53.523+0000",
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
exports.videosPost = function(body) {

  var examples = {};
  
  examples['application/json'] = {
  "category_id" : 123,
  "updated_at" : "2015-12-19T02:10:53.527+0000",
  "created_at" : "2015-12-19T02:10:53.527+0000",
  "description" : "aeiou",
  "id" : 123,
  "title" : "aeiou",
  "mpaa_rating" : "aeiou",
  "tags" : [ "aeiou" ]
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
  "created_at" : "2015-12-19T02:10:53.528+0000",
  "description" : "aeiou",
  "title" : "aeiou",
  "liked" : true,
  "tags" : [ "aeiou" ],
  "viewable" : true,
  "updated_at" : "2015-12-19T02:10:53.528+0000",
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
  "created_at" : "2015-12-19T02:10:53.531+0000",
  "description" : "aeiou",
  "title" : "aeiou",
  "liked" : true,
  "tags" : [ "aeiou" ],
  "viewable" : true,
  "updated_at" : "2015-12-19T02:10:53.531+0000",
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
