'use strict';

var url = require('url');


var Videos = require('./VideosService');


module.exports.videosGet = function videosGet (req, res, next) {
  

  var result = Videos.videosGet();

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

module.exports.videosVideoIdLikePut = function videosVideoIdLikePut (req, res, next) {
  var videoId = req.swagger.params['video-id'].value;
  

  var result = Videos.videosVideoIdLikePut(videoId);

  if(typeof result !== 'undefined') {
    res.setHeader('Content-Type', 'application/json');
    res.end(JSON.stringify(result || {}, null, 2));
  }
  else
    res.end();
};

module.exports.videosVideoIdLikeDelete = function videosVideoIdLikeDelete (req, res, next) {
  var videoId = req.swagger.params['video-id'].value;
  

  var result = Videos.videosVideoIdLikeDelete(videoId);

  if(typeof result !== 'undefined') {
    res.setHeader('Content-Type', 'application/json');
    res.end(JSON.stringify(result || {}, null, 2));
  }
  else
    res.end();
};

module.exports.videosVideoIdStreamPost = function videosVideoIdStreamPost (req, res, next) {
  var body = req.swagger.params['body'].value;
  var videoId = req.swagger.params['video-id'].value;
  

  var result = Videos.videosVideoIdStreamPost(body, videoId);

  if(typeof result !== 'undefined') {
    res.setHeader('Content-Type', 'application/json');
    res.end(JSON.stringify(result || {}, null, 2));
  }
  else
    res.end();
};

module.exports.videosVideoIdStreamTranscodeRequestGet = function videosVideoIdStreamTranscodeRequestGet (req, res, next) {
  var videoId = req.swagger.params['video-id'].value;
  

  var result = Videos.videosVideoIdStreamTranscodeRequestGet(videoId);

  if(typeof result !== 'undefined') {
    res.setHeader('Content-Type', 'application/json');
    res.end(JSON.stringify(result || {}, null, 2));
  }
  else
    res.end();
};
