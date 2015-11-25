'use strict';

exports.videosPost = function(body) {

  var examples = {};
  
  examples['application/json'] = {
  "updated_at" : "2015-11-25T23:00:07.207+0000",
  "created_at" : "2015-11-25T23:00:07.207+0000",
  "description" : "aeiou",
  "id" : 123456789,
  "title" : "aeiou",
  "mpaa_rating" : "aeiou",
  "tags" : [ "aeiou" ]
};
  

  
  if(Object.keys(examples).length > 0)
    return examples[Object.keys(examples)[0]];
  
}
