var express = require('express');
var indexRouter = express.Router();
var menu = require('../config/helperFunctions')();

var router = function () {
  indexRouter.route('/')
    .get(function(req, res, next) {
      res.render('index', {
        title: 'GhostPost',
        nav: menu.menuLinks(req)
      });
    });
  return indexRouter;
};

module.exports = router;
