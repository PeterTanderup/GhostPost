var express = require('express');
var apiRouter = express.Router();
var mongodb = require('mongodb').MongoClient;

var router = function (nav) {
  apiRouter.route('/users')
    .get(function(req, res) {
      // need to implement mongoose
      var url = 'mongodb://localhost:27017/ghostpost';
      mongodb.connect(url, function (err, db) {
        var collection = db.collection('users');
        collection.find().toArray(function (err, results) {
          res.json(results);
        });
      });
    });
  return apiRouter;
};

module.exports = router;