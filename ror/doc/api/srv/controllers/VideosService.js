'use strict';

exports.videosGet = function(category, tags, createdBefore, createdAfter, visible, deleted) {

  var examples = {};
  
  examples['application/json'] = {
  "data" : [ {
    "visible" : true,
    "streams" : [ {
      "transcode_status" : "aeiou",
      "link" : "aeiou",
      "stream_type" : "aeiou"
    } ],
    "created_at" : "2016-01-26T17:15:03.004+0000",
    "description" : "aeiou",
    "title" : "aeiou",
    "liked" : true,
    "seen" : true,
    "skipped" : true,
    "mature_content" : true,
    "updated_at" : "2016-01-26T17:15:03.004+0000",
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
exports.videosPost = function(body) {

  var examples = {};
  
  examples['application/json'] = {
  "mature_content" : true,
  "category_id" : 123,
  "updated_at" : "2016-01-26T17:15:03.007+0000",
  "tag_list" : "aeiou",
  "created_at" : "2016-01-26T17:15:03.007+0000",
  "description" : "aeiou",
  "id" : 123,
  "title" : "aeiou"
};
  

  
  if(Object.keys(examples).length > 0)
    return examples[Object.keys(examples)[0]];
  
}
exports.videosVideoIdGet = function(videoId) {

  var examples = {};
  
  examples['application/json'] = {
  "visible" : true,
  "streams" : [ {
    "transcode_status" : "aeiou",
    "link" : "aeiou",
    "stream_type" : "aeiou"
  } ],
  "created_at" : "2016-01-26T17:15:03.008+0000",
  "description" : "aeiou",
  "title" : "aeiou",
  "liked" : true,
  "seen" : true,
  "skipped" : true,
  "mature_content" : true,
  "updated_at" : "2016-01-26T17:15:03.008+0000",
  "category_id" : 123,
  "tag_list" : "aeiou",
  "id" : 123,
  "hero_image_link" : "aeiou",
  "view_count" : 123,
  "skip_count" : 123
};
  

  
  if(Object.keys(examples).length > 0)
    return examples[Object.keys(examples)[0]];
  
}
exports.videosVideoIdPut = function(body, videoId) {

  var examples = {};
  
  examples['application/json'] = {
  "visible" : true,
  "streams" : [ {
    "transcode_status" : "aeiou",
    "link" : "aeiou",
    "stream_type" : "aeiou"
  } ],
  "created_at" : "2016-01-26T17:15:03.009+0000",
  "description" : "aeiou",
  "title" : "aeiou",
  "liked" : true,
  "seen" : true,
  "skipped" : true,
  "mature_content" : true,
  "updated_at" : "2016-01-26T17:15:03.009+0000",
  "category_id" : 123,
  "tag_list" : "aeiou",
  "id" : 123,
  "hero_image_link" : "aeiou",
  "view_count" : 123,
  "skip_count" : 123
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
