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

module.exports.featuredVideoIdPut = function featuredVideoIdPut (req, res, next) {
  var videoId = req.swagger.params['video-id'].value;
  

  var result = Featured.featuredVideoIdPut(videoId);

  if(typeof result !== 'undefined') {
    res.setHeader('Content-Type', 'application/json');
    res.end(JSON.stringify(result || {}, null, 2));
  }
  else
    res.end();
};

module.exports.featuredVideoIdDelete = function featuredVideoIdDelete (req, res, next) {
  var videoId = req.swagger.params['video-id'].value;
  

  var result = Featured.featuredVideoIdDelete(videoId);

  if(typeof result !== 'undefined') {
    res.setHeader('Content-Type', 'application/json');
    res.end(JSON.stringify(result || {}, null, 2));
  }
  else
    res.end();
};
