'use strict';

var url = require('url');


var Videos = require('./VideosService');


module.exports.videosGet = function videosGet (req, res, next) {
  var category = req.swagger.params['category'].value;
  var tags = req.swagger.params['tags'].value;
  var createdBefore = req.swagger.params['created_before'].value;
  var createdAfter = req.swagger.params['created_after'].value;
  

  var result = Videos.videosGet(category, tags, createdBefore, createdAfter);

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

module.exports.videosVideoIdStreamsPost = function videosVideoIdStreamsPost (req, res, next) {
  var body = req.swagger.params['body'].value;
  var videoId = req.swagger.params['video-id'].value;
  

  var result = Videos.videosVideoIdStreamsPost(body, videoId);

  if(typeof result !== 'undefined') {
    res.setHeader('Content-Type', 'application/json');
    res.end(JSON.stringify(result || {}, null, 2));
  }
  else
    res.end();
};

module.exports.videosVideoIdStreamsStreamTypeGet = function videosVideoIdStreamsStreamTypeGet (req, res, next) {
  var videoId = req.swagger.params['video-id'].value;
  var streamType = req.swagger.params['stream-type'].value;
  

  var result = Videos.videosVideoIdStreamsStreamTypeGet(videoId, streamType);

  if(typeof result !== 'undefined') {
    res.setHeader('Content-Type', 'application/json');
    res.end(JSON.stringify(result || {}, null, 2));
  }
  else
    res.end();
};
