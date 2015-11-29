'use strict';

exports.videosPost = function(body) {

  var examples = {};
  
  examples['application/json'] = {
  "id" : 123,
  "tags" : [ "aeiou" ],
  "title" : "aeiou",
  "updated_at" : "2015-11-29T23:41:27.346+0000",
  "description" : "aeiou",
  "category_id" : 123,
  "created_at" : "2015-11-29T23:41:27.346+0000",
  "mpaa_rating" : "aeiou"
};
  

  
  if(Object.keys(examples).length > 0)
    return examples[Object.keys(examples)[0]];
  
}
