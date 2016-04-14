var express = require('express');
var path = require('path');
var backendRouter = express.Router();
var menu = require('../config/helperFunctions')();

var router = function (nav) {
  backendRouter.route('*')
    .get(function(req, res, next) {
      if (!req.user) {
        var err = new Error('You need to be logged in');
        err.status = 401;
        res.render('error', {
          message: err.message,
          error: err,
          nav: menu.menuLinks(req)
        });
        return;
      } else if (req.user && (req.user.role === 'admin' || req.user.role === 'author')) {
        res.render('backend',{
          nav: menu.menuLinks(req),
          navSide: menu.backendLinks()
        });
        return;
      } else {
        res.redirect('/');
      }
    });
  return backendRouter;
};

module.exports = router;