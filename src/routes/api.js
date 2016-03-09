var express = require('express');
var apiRouter = express.Router();
// var mongodb = require('mongodb').MongoClient;
var mongoose = require('mongoose');
var User = mongoose.model('User');

var sendJsonResponse = function (res, status, content) {
  res.status(status);
  res.json(content);
};

var router = function (nav) {
  // used with mongodb client
//  apiRouter.route('/users')
//    .get(function(req, res) {
//      // need to implement mongoose
//      var url = 'mongodb://localhost:27017/ghostpost';
//      mongodb.connect(url, function (err, db) {
//        var collection = db.collection('users');
//        collection.find().toArray(function (err, results) {
//          res.json(results);
//        });
//      });
//    });
  apiRouter.route('/users')
    .get(function(req, res) {
      User.find(function (err, users) {
        // need to trap errors
        sendJsonResponse(res, 200, users);
      })
    });
  return apiRouter;
};

module.exports = router;