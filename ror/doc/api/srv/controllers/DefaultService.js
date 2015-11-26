'use strict';

exports.videosPost = function(body) {

  var examples = {};
  
  examples['application/json'] = {
  "category_id" : 123,
  "updated_at" : "2015-11-26T01:42:22.953+0000",
  "created_at" : "2015-11-26T01:42:22.953+0000",
  "description" : "aeiou",
  "id" : 123,
  "title" : "aeiou",
  "mpaa_rating" : "aeiou",
  "tags" : [ "aeiou" ]
};
  

  
  if(Object.keys(examples).length > 0)
    return examples[Object.keys(examples)[0]];
  
}
