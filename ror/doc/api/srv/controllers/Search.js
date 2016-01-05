'use strict';

var url = require('url');


var Search = require('./SearchService');


module.exports.searchGet = function searchGet (req, res, next) {
  var search = req.swagger.params['search'].value;
  

  var result = Search.searchGet(search);

  if(typeof result !== 'undefined') {
    res.setHeader('Content-Type', 'application/json');
    res.end(JSON.stringify(result || {}, null, 2));
  }
  else
    res.end();
};
