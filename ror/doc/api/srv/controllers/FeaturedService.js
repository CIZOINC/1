'use strict';

exports.featuredGet = function() {

  var examples = {};
  
  examples['application/json'] = {
  "data" : [ {
    "streams" : [ {
      "transcode_status" : "aeiou",
      "link" : "aeiou",
      "stream_type" : "aeiou"
    } ],
    "created_at" : "2016-01-13T23:13:19.655+0000",
    "description" : "aeiou",
    "title" : "aeiou",
    "liked" : true,
    "seen" : true,
    "tags" : [ "aeiou" ],
    "skipped" : true,
    "mature_content" : true,
    "viewable" : true,
    "updated_at" : "2016-01-13T23:13:19.655+0000",
    "category_id" : 123,
    "id" : 123,
    "hero_image_link" : "aeiou",
    "view_count" : 123,
    "skip_count" : 123
  } ]
};
  

  
  if(Object.keys(examples).length > 0)
    return examples[Object.keys(examples)[0]];
  
}
