'use strict';

var url = require('url');


var Featured = require('./FeaturedService');


module.exports.featuredGet = function featuredGet (req, res, next) {
  

  var result = Featured.featuredGet();

  if(typeof result !== 'undefined') {
    res.setHeader('Content-Type', 'application/json');
    res.end(JSON.stringify(result || {}, null, 2));
  }
  else
    res.end();
};
