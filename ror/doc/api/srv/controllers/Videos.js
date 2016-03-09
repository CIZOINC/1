'use strict';

var url = require('url');


var Videos = require('./VideosService');


module.exports.videosGet = function videosGet (req, res, next) {
  var category = req.swagger.params['category'].value;
  var tags = req.swagger.params['tags'].value;
  var createdBefore = req.swagger.params['created_before'].value;
  var createdAfter = req.swagger.params['created_after'].value;
  var visible = req.swagger.params['visible'].value;
  var deleted = req.swagger.params['deleted'].value;
  var showMatureContent = req.swagger.params['show_mature_content'].value;
  var count = req.swagger.params['count'].value;
  var maxId = req.swagger.params['max_id'].value;
  var sinceId = req.swagger.params['since_id'].value;
  

  var result = Videos.videosGet(category, tags, createdBefore, createdAfter, visible, deleted, showMatureContent, count, maxId, sinceId);

  if(typeof result !== 'undefined') {
    res.setHeader('Content-Type', 'application/json');
    res.end(JSON.stringify(result || {}, null, 2));
  }
  else
    res.end();
};

module.exports.videosPost = function videosPost (req, res, next) {
  var body = req.swagger.params['body'].value;
  

  var result = Videos.videosPost(body);

  if(typeof result !== 'undefined') {
    res.setHeader('Content-Type', 'application/json');
    res.end(JSON.stringify(result || {}, null, 2));
  }
  else
    res.end();
};

module.exports.videosVideoIdGet = function videosVideoIdGet (req, res, next) {
  var videoId = req.swagger.params['video-id'].value;
  

  var result = Videos.videosVideoIdGet(videoId);

  if(typeof result !== 'undefined') {
    res.setHeader('Content-Type', 'application/json');
    res.end(JSON.stringify(result || {}, null, 2));
  }
  else
    res.end();
};

module.exports.videosVideoIdPut = function videosVideoIdPut (req, res, next) {
  var body = req.swagger.params['body'].value;
  var videoId = req.swagger.params['video-id'].value;
  

  var result = Videos.videosVideoIdPut(body, videoId);

  if(typeof result !== 'undefined') {
    res.setHeader('Content-Type', 'application/json');
    res.end(JSON.stringify(result || {}, null, 2));
  }
  else
    res.end();
};

module.exports.videosVideoIdDelete = function videosVideoIdDelete (req, res, next) {
  var videoId = req.swagger.params['video-id'].value;
  

  var result = Videos.videosVideoIdDelete(videoId);

  if(typeof result !== 'undefined') {
    res.setHeader('Content-Type', 'application/json');
    res.end(JSON.stringify(result || {}, null, 2));
  }
  else
    res.end();
};

module.exports.videosVideoIdHeroImagePost = function videosVideoIdHeroImagePost (req, res, next) {
  var videoId = req.swagger.params['video-id'].value;
  

  var result = Videos.videosVideoIdHeroImagePost(videoId);

  if(typeof result !== 'undefined') {
    res.setHeader('Content-Type', 'application/json');
    res.end(JSON.stringify(result || {}, null, 2));
  }
  else
    res.end();
};
