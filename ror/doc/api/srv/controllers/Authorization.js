'use strict';

var url = require('url');


var Authorization = require('./AuthorizationService');


module.exports.oauthFacebookGet = function oauthFacebookGet (req, res, next) {
  var accessToken = req.swagger.params['access_token'].value;
  

  var result = Authorization.oauthFacebookGet(accessToken);

  if(typeof result !== 'undefined') {
    res.setHeader('Content-Type', 'application/json');
    res.end(JSON.stringify(result || {}, null, 2));
  }
  else
    res.end();
};

module.exports.oauthTokenPost = function oauthTokenPost (req, res, next) {
  var body = req.swagger.params['body'].value;
  

  var result = Authorization.oauthTokenPost(body);

  if(typeof result !== 'undefined') {
    res.setHeader('Content-Type', 'application/json');
    res.end(JSON.stringify(result || {}, null, 2));
  }
  else
    res.end();
};

module.exports.usersAuthFacebookGet = function usersAuthFacebookGet (req, res, next) {
  

  var result = Authorization.usersAuthFacebookGet();

  if(typeof result !== 'undefined') {
    res.setHeader('Content-Type', 'application/json');
    res.end(JSON.stringify(result || {}, null, 2));
  }
  else
    res.end();
};
