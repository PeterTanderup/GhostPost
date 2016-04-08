var express = require('express');
var path = require('path');
var backendRouter = express.Router();

var router = function (nav) {
  backendRouter.route('*')
    .get(function(req, res, next) {
      res.sendFile(path.join(__dirname, '../../public/app', 'index.html'));
    });
  return backendRouter;
};

module.exports = router;