'use strict';

exports.trendingGet = function() {

  var examples = {};
  
  examples['application/json'] = {
  "data" : [ {
    "tags" : [ "aeiou" ],
    "liked" : true,
    "category_id" : 123,
    "id" : 123,
    "title" : "aeiou",
    "updated_at" : "2015-12-16T06:33:11.920+0000",
    "viewable" : true,
    "description" : "aeiou",
    "created_at" : "2015-12-16T06:33:11.920+0000",
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
