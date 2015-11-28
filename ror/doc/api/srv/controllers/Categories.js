'use strict';

var url = require('url');


var Categories = require('./CategoriesService');


module.exports.categoriesGet = function categoriesGet (req, res, next) {
  

  var result = Categories.categoriesGet();

  if(typeof result !== 'undefined') {
    res.setHeader('Content-Type', 'application/json');
    res.end(JSON.stringify(result || {}, null, 2));
  }
  else
    res.end();
};

module.exports.categoriesPost = function categoriesPost (req, res, next) {
  var body = req.swagger.params['body'].value;
  

  var result = Categories.categoriesPost(body);

  if(typeof result !== 'undefined') {
    res.setHeader('Content-Type', 'application/json');
    res.end(JSON.stringify(result || {}, null, 2));
  }
  else
    res.end();
};

module.exports.categoriesCategoryIdGet = function categoriesCategoryIdGet (req, res, next) {
  var categoryId = req.swagger.params['category-id'].value;
  

  var result = Categories.categoriesCategoryIdGet(categoryId);

  if(typeof result !== 'undefined') {
    res.setHeader('Content-Type', 'application/json');
    res.end(JSON.stringify(result || {}, null, 2));
  }
  else
    res.end();
};

module.exports.categoriesCategoryIdPut = function categoriesCategoryIdPut (req, res, next) {
  var body = req.swagger.params['body'].value;
  var categoryId = req.swagger.params['category-id'].value;
  

  var result = Categories.categoriesCategoryIdPut(body, categoryId);

  if(typeof result !== 'undefined') {
    res.setHeader('Content-Type', 'application/json');
    res.end(JSON.stringify(result || {}, null, 2));
  }
  else
    res.end();
};

module.exports.categoriesCategoryIdDelete = function categoriesCategoryIdDelete (req, res, next) {
  var categoryId = req.swagger.params['category-id'].value;
  

  var result = Categories.categoriesCategoryIdDelete(categoryId);

  if(typeof result !== 'undefined') {
    res.setHeader('Content-Type', 'application/json');
    res.end(JSON.stringify(result || {}, null, 2));
  }
  else
    res.end();
};
