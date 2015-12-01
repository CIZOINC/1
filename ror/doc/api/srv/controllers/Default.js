'use strict';

var url = require('url');


var Default = require('./DefaultService');


module.exports.videosPost = function videosPost (req, res, next) {
  var body = req.swagger.params['body'].value;
  

  var result = Default.videosPost(body);

  if(typeof result !== 'undefined') {
    res.setHeader('Content-Type', 'application/json');
    res.end(JSON.stringify(result || {}, null, 2));
  }
  else
    res.end();
};
