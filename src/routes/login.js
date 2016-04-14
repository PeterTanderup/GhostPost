var express = require('express');
var loginRouter = express.Router();
var menu = require('../config/helperFunctions')();

var router = function (nav) {
  loginRouter.route('/')
    .get(function(req, res, next) {
      res.render('login', {
        title: 'Login to GhostPost',
        nav: menu.menuLinks(req),
        message: ''
      });
    });
  return loginRouter;
};

module.exports = router;