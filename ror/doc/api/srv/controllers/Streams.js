'use strict';

var url = require('url');


var Streams = require('./StreamsService');


module.exports.videosStreamsTranscodeNotificationPost = function videosStreamsTranscodeNotificationPost (req, res, next) {
  

  var result = Streams.videosStreamsTranscodeNotificationPost();

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
  

  var result = Streams.videosVideoIdStreamsPost(body, videoId);

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
  

  var result = Streams.videosVideoIdStreamsStreamTypeGet(videoId, streamType);

  if(typeof result !== 'undefined') {
    res.setHeader('Content-Type', 'application/json');
    res.end(JSON.stringify(result || {}, null, 2));
  }
  else
    res.end();
};

module.exports.videosVideoIdUploadTicketGet = function videosVideoIdUploadTicketGet (req, res, next) {
  var videoId = req.swagger.params['video-id'].value;
  var filename = req.swagger.params['filename'].value;
  

  var result = Streams.videosVideoIdUploadTicketGet(videoId, filename);

  if(typeof result !== 'undefined') {
    res.setHeader('Content-Type', 'application/json');
    res.end(JSON.stringify(result || {}, null, 2));
  }
  else
    res.end();
};
