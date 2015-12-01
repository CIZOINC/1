'use strict';

exports.categoriesGet = function() {

  var examples = {};
  
  examples['application/json'] = {
  "data" : [ {
    "id" : 123,
    "title" : "aeiou"
  } ]
};
  

  
  if(Object.keys(examples).length > 0)
    return examples[Object.keys(examples)[0]];
  
}
exports.categoriesPost = function(body) {

  var examples = {};
  
  examples['application/json'] = {
  "id" : 123,
  "title" : "aeiou"
};
  

  
  if(Object.keys(examples).length > 0)
    return examples[Object.keys(examples)[0]];
  
}
exports.categoriesCategoryIdGet = function(categoryId) {

  var examples = {};
  
  examples['application/json'] = {
  "id" : 123,
  "title" : "aeiou"
};
  

  
  if(Object.keys(examples).length > 0)
    return examples[Object.keys(examples)[0]];
  
}
exports.categoriesCategoryIdPut = function(body, categoryId) {

  var examples = {};
  
  examples['application/json'] = {
  "id" : 123,
  "title" : "aeiou"
};
  

  
  if(Object.keys(examples).length > 0)
    return examples[Object.keys(examples)[0]];
  
}
exports.categoriesCategoryIdDelete = function(categoryId) {

  var examples = {};
  

  
}
