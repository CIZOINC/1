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

module.exports.usersMeVideosLikesGet = function usersMeVideosLikesGet (req, res, next) {
  

  var result = Users.usersMeVideosLikesGet();

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
