'use strict';

var url = require('url');


var Users = require('./UsersService');


module.exports.usersGet = function usersGet (req, res, next) {
  

  var result = Users.usersGet();

  if(typeof result !== 'undefined') {
    res.setHeader('Content-Type', 'application/json');
    res.end(JSON.stringify(result || {}, null, 2));
  }
  else
    res.end();
};

module.exports.usersPost = function usersPost (req, res, next) {
  var body = req.swagger.params['body'].value;
  

  var result = Users.usersPost(body);

  if(typeof result !== 'undefined') {
    res.setHeader('Content-Type', 'application/json');
    res.end(JSON.stringify(result || {}, null, 2));
  }
  else
    res.end();
};

module.exports.usersGuestVideosSeenVideoIdPut = function usersGuestVideosSeenVideoIdPut (req, res, next) {
  var videoId = req.swagger.params['video-id'].value;
  

  var result = Users.usersGuestVideosSeenVideoIdPut(videoId);

  if(typeof result !== 'undefined') {
    res.setHeader('Content-Type', 'application/json');
    res.end(JSON.stringify(result || {}, null, 2));
  }
  else
    res.end();
};

module.exports.usersGuestVideosSkippedVideoIdPut = function usersGuestVideosSkippedVideoIdPut (req, res, next) {
  var videoId = req.swagger.params['video-id'].value;
  

  var result = Users.usersGuestVideosSkippedVideoIdPut(videoId);

  if(typeof result !== 'undefined') {
    res.setHeader('Content-Type', 'application/json');
    res.end(JSON.stringify(result || {}, null, 2));
  }
  else
    res.end();
};

module.exports.usersMeGet = function usersMeGet (req, res, next) {
  

  var result = Users.usersMeGet();

  if(typeof result !== 'undefined') {
    res.setHeader('Content-Type', 'application/json');
    res.end(JSON.stringify(result || {}, null, 2));
  }
  else
    res.end();
};

module.exports.usersMePut = function usersMePut (req, res, next) {
  var body = req.swagger.params['body'].value;
  

  var result = Users.usersMePut(body);

  if(typeof result !== 'undefined') {
    res.setHeader('Content-Type', 'application/json');
    res.end(JSON.stringify(result || {}, null, 2));
  }
  else
    res.end();
};

module.exports.usersMeDelete = function usersMeDelete (req, res, next) {
  

  var result = Users.usersMeDelete();

  if(typeof result !== 'undefined') {
    res.setHeader('Content-Type', 'application/json');
    res.end(JSON.stringify(result || {}, null, 2));
  }
  else
    res.end();
};

module.exports.usersMeVideosLikedGet = function usersMeVideosLikedGet (req, res, next) {
  var createdBefore = req.swagger.params['created_before'].value;
  var createdAfter = req.swagger.params['created_after'].value;
  var count = req.swagger.params['count'].value;
  

  var result = Users.usersMeVideosLikedGet(createdBefore, createdAfter, count);

  if(typeof result !== 'undefined') {
    res.setHeader('Content-Type', 'application/json');
    res.end(JSON.stringify(result || {}, null, 2));
  }
  else
    res.end();
};

module.exports.usersMeVideosLikedPut = function usersMeVideosLikedPut (req, res, next) {
  var body = req.swagger.params['body'].value;
  

  var result = Users.usersMeVideosLikedPut(body);

  if(typeof result !== 'undefined') {
    res.setHeader('Content-Type', 'application/json');
    res.end(JSON.stringify(result || {}, null, 2));
  }
  else
    res.end();
};

module.exports.usersMeVideosLikedVideoIdPut = function usersMeVideosLikedVideoIdPut (req, res, next) {
  var videoId = req.swagger.params['video-id'].value;
  

  var result = Users.usersMeVideosLikedVideoIdPut(videoId);

  if(typeof result !== 'undefined') {
    res.setHeader('Content-Type', 'application/json');
    res.end(JSON.stringify(result || {}, null, 2));
  }
  else
    res.end();
};

module.exports.usersMeVideosLikedVideoIdDelete = function usersMeVideosLikedVideoIdDelete (req, res, next) {
  var videoId = req.swagger.params['video-id'].value;
  

  var result = Users.usersMeVideosLikedVideoIdDelete(videoId);

  if(typeof result !== 'undefined') {
    res.setHeader('Content-Type', 'application/json');
    res.end(JSON.stringify(result || {}, null, 2));
  }
  else
    res.end();
};

module.exports.usersMeVideosSeenGet = function usersMeVideosSeenGet (req, res, next) {
  var createdBefore = req.swagger.params['created_before'].value;
  var createdAfter = req.swagger.params['created_after'].value;
  var count = req.swagger.params['count'].value;
  

  var result = Users.usersMeVideosSeenGet(createdBefore, createdAfter, count);

  if(typeof result !== 'undefined') {
    res.setHeader('Content-Type', 'application/json');
    res.end(JSON.stringify(result || {}, null, 2));
  }
  else
    res.end();
};

module.exports.usersMeVideosSeenPut = function usersMeVideosSeenPut (req, res, next) {
  var body = req.swagger.params['body'].value;
  

  var result = Users.usersMeVideosSeenPut(body);

  if(typeof result !== 'undefined') {
    res.setHeader('Content-Type', 'application/json');
    res.end(JSON.stringify(result || {}, null, 2));
  }
  else
    res.end();
};

module.exports.usersMeVideosSeenVideoIdPut = function usersMeVideosSeenVideoIdPut (req, res, next) {
  var videoId = req.swagger.params['video-id'].value;
  

  var result = Users.usersMeVideosSeenVideoIdPut(videoId);

  if(typeof result !== 'undefined') {
    res.setHeader('Content-Type', 'application/json');
    res.end(JSON.stringify(result || {}, null, 2));
  }
  else
    res.end();
};

module.exports.usersMeVideosSkippedGet = function usersMeVideosSkippedGet (req, res, next) {
  var createdBefore = req.swagger.params['created_before'].value;
  var createdAfter = req.swagger.params['created_after'].value;
  var count = req.swagger.params['count'].value;
  

  var result = Users.usersMeVideosSkippedGet(createdBefore, createdAfter, count);

  if(typeof result !== 'undefined') {
    res.setHeader('Content-Type', 'application/json');
    res.end(JSON.stringify(result || {}, null, 2));
  }
  else
    res.end();
};

module.exports.usersMeVideosSkippedPut = function usersMeVideosSkippedPut (req, res, next) {
  var body = req.swagger.params['body'].value;
  

  var result = Users.usersMeVideosSkippedPut(body);

  if(typeof result !== 'undefined') {
    res.setHeader('Content-Type', 'application/json');
    res.end(JSON.stringify(result || {}, null, 2));
  }
  else
    res.end();
};

module.exports.usersMeVideosSkippedVideoIdPut = function usersMeVideosSkippedVideoIdPut (req, res, next) {
  var videoId = req.swagger.params['video-id'].value;
  

  var result = Users.usersMeVideosSkippedVideoIdPut(videoId);

  if(typeof result !== 'undefined') {
    res.setHeader('Content-Type', 'application/json');
    res.end(JSON.stringify(result || {}, null, 2));
  }
  else
    res.end();
};

module.exports.usersMeVideosUnseenGet = function usersMeVideosUnseenGet (req, res, next) {
  var createdBefore = req.swagger.params['created_before'].value;
  var createdAfter = req.swagger.params['created_after'].value;
  var count = req.swagger.params['count'].value;
  

  var result = Users.usersMeVideosUnseenGet(createdBefore, createdAfter, count);

  if(typeof result !== 'undefined') {
    res.setHeader('Content-Type', 'application/json');
    res.end(JSON.stringify(result || {}, null, 2));
  }
  else
    res.end();
};

module.exports.usersPasswordPut = function usersPasswordPut (req, res, next) {
  var body = req.swagger.params['body'].value;
  

  var result = Users.usersPasswordPut(body);

  if(typeof result !== 'undefined') {
    res.setHeader('Content-Type', 'application/json');
    res.end(JSON.stringify(result || {}, null, 2));
  }
  else
    res.end();
};

module.exports.usersPasswordEditGet = function usersPasswordEditGet (req, res, next) {
  var resetPasswordToken = req.swagger.params['reset_password_token'].value;
  

  var result = Users.usersPasswordEditGet(resetPasswordToken);

  if(typeof result !== 'undefined') {
    res.setHeader('Content-Type', 'application/json');
    res.end(JSON.stringify(result || {}, null, 2));
  }
  else
    res.end();
};

module.exports.usersPasswordResetPost = function usersPasswordResetPost (req, res, next) {
  var body = req.swagger.params['body'].value;
  

  var result = Users.usersPasswordResetPost(body);

  if(typeof result !== 'undefined') {
    res.setHeader('Content-Type', 'application/json');
    res.end(JSON.stringify(result || {}, null, 2));
  }
  else
    res.end();
};

module.exports.usersUserIdGet = function usersUserIdGet (req, res, next) {
  var userId = req.swagger.params['user-id'].value;
  

  var result = Users.usersUserIdGet(userId);

  if(typeof result !== 'undefined') {
    res.setHeader('Content-Type', 'application/json');
    res.end(JSON.stringify(result || {}, null, 2));
  }
  else
    res.end();
};

module.exports.usersUserIdPut = function usersUserIdPut (req, res, next) {
  var body = req.swagger.params['body'].value;
  var userId = req.swagger.params['user-id'].value;
  

  var result = Users.usersUserIdPut(body, userId);

  if(typeof result !== 'undefined') {
    res.setHeader('Content-Type', 'application/json');
    res.end(JSON.stringify(result || {}, null, 2));
  }
  else
    res.end();
};
