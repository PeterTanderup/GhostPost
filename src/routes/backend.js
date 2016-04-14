var express = require('express');
var path = require('path');
var backendRouter = express.Router();
var menu = require('../config/helperFunctions')();
var navSide = [
  {
    Link: '#/',
    Text: 'Home'
  },{
    Link: '#/users',
    Text: 'Users'
  },{
    Link: '#/categories',
    Text: 'Categories'
  },{
    Link: '#/tags',
    Text: 'Tags'
  }
];

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
      }
      res.render('backend',{
        nav: menu.menuLinks(req),
        navSide: navSide
      });
      //res.sendFile(path.join(__dirname, '../../public/app', 'index.html'));
    });
  return backendRouter;
};

module.exports = router;