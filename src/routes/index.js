var express = require('express');
var indexRouter = express.Router();

var router = function (nav) {
  indexRouter.route('/')
    .get(function(req, res, next) {
      res.render('index2', {
        title: 'GhostPost',
        nav: nav
    });
  });
  return indexRouter;
};

module.exports = router;
