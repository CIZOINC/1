'use strict';

var url = require('url');


var Trending = require('./TrendingService');


module.exports.trendingGet = function trendingGet (req, res, next) {
  

  var result = Trending.trendingGet();

  if(typeof result !== 'undefined') {
    res.setHeader('Content-Type', 'application/json');
    res.end(JSON.stringify(result || {}, null, 2));
  }
  else
    res.end();
};
