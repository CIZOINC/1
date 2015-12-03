'use strict';

var url = require('url');


var User = require('./UserService');


module.exports.usersMeDelete = function usersMeDelete (req, res, next) {
  

  var result = User.usersMeDelete();

  if(typeof result !== 'undefined') {
    res.setHeader('Content-Type', 'application/json');
    res.end(JSON.stringify(result || {}, null, 2));
  }
  else
    res.end();
};
