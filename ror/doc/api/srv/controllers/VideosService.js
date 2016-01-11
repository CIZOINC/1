'use strict';

exports.videosGet = function(category, tags, createdBefore, createdAfter) {

  var examples = {};
  
  examples['application/json'] = {
  "data" : [ {
    "streams" : [ {
      "transcode_status" : "aeiou",
      "link" : "aeiou",
      "stream_type" : "aeiou"
    } ],
    "created_at" : "2016-01-11T18:15:37.755+0000",
    "description" : "aeiou",
    "title" : "aeiou",
    "liked" : true,
    "seen" : true,
    "tags" : [ "aeiou" ],
    "skipped" : true,
    "mature_content" : true,
    "viewable" : true,
    "updated_at" : "2016-01-11T18:15:37.755+0000",
    "category_id" : 123,
    "id" : 123,
    "hero_image_link" : "aeiou",
    "view_count" : 123
  } ]
};
  

  
  if(Object.keys(examples).length > 0)
    return examples[Object.keys(examples)[0]];
  
}
exports.videosPost = function(body) {

  var examples = {};
  
  examples['application/json'] = {
  "mature_content" : true,
  "category_id" : 123,
  "updated_at" : "2016-01-11T18:15:37.757+0000",
  "created_at" : "2016-01-11T18:15:37.757+0000",
  "description" : "aeiou",
  "id" : 123,
  "title" : "aeiou",
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
    "stream_type" : "aeiou"
  } ],
  "created_at" : "2016-01-11T18:15:37.758+0000",
  "description" : "aeiou",
  "title" : "aeiou",
  "liked" : true,
  "seen" : true,
  "tags" : [ "aeiou" ],
  "skipped" : true,
  "mature_content" : true,
  "viewable" : true,
  "updated_at" : "2016-01-11T18:15:37.758+0000",
  "category_id" : 123,
  "id" : 123,
  "hero_image_link" : "aeiou",
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
    "stream_type" : "aeiou"
  } ],
  "created_at" : "2016-01-11T18:15:37.760+0000",
  "description" : "aeiou",
  "title" : "aeiou",
  "liked" : true,
  "seen" : true,
  "tags" : [ "aeiou" ],
  "skipped" : true,
  "mature_content" : true,
  "viewable" : true,
  "updated_at" : "2016-01-11T18:15:37.760+0000",
  "category_id" : 123,
  "id" : 123,
  "hero_image_link" : "aeiou",
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
