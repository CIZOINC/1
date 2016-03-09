'use strict';

exports.featuredGet = function() {

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
    "created_at" : "2016-03-09T19:56:23.555+0000",
    "description" : "aeiou",
    "title" : "aeiou",
    "deleted_at" : "2016-03-09T19:56:23.555+0000",
    "liked" : true,
    "seen" : true,
    "skipped" : true,
    "mature_content" : true,
    "updated_at" : "2016-03-09T19:56:23.555+0000",
    "category_id" : 123,
    "hero_images" : {
      "hero_image_link_thumb_banner" : "aeiou",
      "hero_image_link_medium_banner" : "aeiou",
      "hero_image_link" : "aeiou",
      "hero_image_link_large_banner" : "aeiou"
    },
    "tag_list" : "aeiou",
    "id" : 123,
    "hero_image_upload_status" : "aeiou",
    "view_count" : 123,
    "skip_count" : 123
  } ]
};
  

  
  if(Object.keys(examples).length > 0)
    return examples[Object.keys(examples)[0]];
  
}
exports.featuredVideoIdPut = function(videoId, body) {

  var examples = {};
  

  
}
exports.featuredVideoIdDelete = function(videoId) {

  var examples = {};
  

  
}
