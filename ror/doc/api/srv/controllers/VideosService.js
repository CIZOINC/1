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
    "created_at" : "2016-01-06T00:23:17.739+0000",
    "description" : "aeiou",
    "title" : "aeiou",
    "liked" : true,
    "seen" : true,
    "tags" : [ "aeiou" ],
    "skipped" : true,
    "viewable" : true,
    "updated_at" : "2016-01-06T00:23:17.739+0000",
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
  "updated_at" : "2016-01-06T00:23:17.742+0000",
  "created_at" : "2016-01-06T00:23:17.742+0000",
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
    "stream_type" : "aeiou"
  } ],
  "created_at" : "2016-01-06T00:23:17.743+0000",
  "description" : "aeiou",
  "title" : "aeiou",
  "liked" : true,
  "seen" : true,
  "tags" : [ "aeiou" ],
  "skipped" : true,
  "viewable" : true,
  "updated_at" : "2016-01-06T00:23:17.743+0000",
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
    "stream_type" : "aeiou"
  } ],
  "created_at" : "2016-01-06T00:23:17.744+0000",
  "description" : "aeiou",
  "title" : "aeiou",
  "liked" : true,
  "seen" : true,
  "tags" : [ "aeiou" ],
  "skipped" : true,
  "viewable" : true,
  "updated_at" : "2016-01-06T00:23:17.744+0000",
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
