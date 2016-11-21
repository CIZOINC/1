'use strict';

exports.videosGet = function(category, tags, createdBefore, createdAfter, visible, deleted, showMatureContent, count, maxId, sinceId) {

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
    "created_at" : "2016-11-21T20:55:13.331+0000",
    "description" : "aeiou",
    "title" : "aeiou",
    "deleted_at" : "2016-11-21T20:55:13.331+0000",
    "liked" : true,
    "seen" : true,
    "description_title" : "aeiou",
    "skipped" : true,
    "mature_content" : true,
    "updated_at" : "2016-11-21T20:55:13.331+0000",
    "category_id" : 123,
    "hero_images" : {
      "hero_image_link_thumb_banner" : "aeiou",
      "hero_image_link_medium_banner" : "aeiou",
      "hero_image_link" : "aeiou",
      "hero_image_link_large_banner" : "aeiou"
    },
    "tag_list" : "aeiou",
    "subtitle" : "aeiou",
    "id" : 123,
    "hero_image_upload_status" : "aeiou",
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
  "updated_at" : "2016-11-21T20:55:13.334+0000",
  "tag_list" : "aeiou",
  "subtitle" : "aeiou",
  "created_at" : "2016-11-21T20:55:13.334+0000",
  "description" : "aeiou",
  "id" : 123,
  "title" : "aeiou",
  "description_title" : "aeiou"
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
  "link" : "aeiou",
  "created_at" : "2016-11-21T20:55:13.335+0000",
  "description" : "aeiou",
  "title" : "aeiou",
  "deleted_at" : "2016-11-21T20:55:13.335+0000",
  "liked" : true,
  "seen" : true,
  "description_title" : "aeiou",
  "skipped" : true,
  "mature_content" : true,
  "updated_at" : "2016-11-21T20:55:13.335+0000",
  "category_id" : 123,
  "hero_images" : {
    "hero_image_link_thumb_banner" : "aeiou",
    "hero_image_link_medium_banner" : "aeiou",
    "hero_image_link" : "aeiou",
    "hero_image_link_large_banner" : "aeiou"
  },
  "tag_list" : "aeiou",
  "subtitle" : "aeiou",
  "id" : 123,
  "hero_image_upload_status" : "aeiou",
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
  "link" : "aeiou",
  "created_at" : "2016-11-21T20:55:13.336+0000",
  "description" : "aeiou",
  "title" : "aeiou",
  "deleted_at" : "2016-11-21T20:55:13.336+0000",
  "liked" : true,
  "seen" : true,
  "description_title" : "aeiou",
  "skipped" : true,
  "mature_content" : true,
  "updated_at" : "2016-11-21T20:55:13.336+0000",
  "category_id" : 123,
  "hero_images" : {
    "hero_image_link_thumb_banner" : "aeiou",
    "hero_image_link_medium_banner" : "aeiou",
    "hero_image_link" : "aeiou",
    "hero_image_link_large_banner" : "aeiou"
  },
  "tag_list" : "aeiou",
  "subtitle" : "aeiou",
  "id" : 123,
  "hero_image_upload_status" : "aeiou",
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
