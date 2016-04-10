var express = require('express');
var path = require('path');
var backendRouter = express.Router();

var router = function (nav) {
  backendRouter.route('*')
    .get(function(req, res, next) {
      if (!req.user) {
        var err = new Error('You need to be loged in');
        err.status = 401;
        res.render('error', {
          message: err.message,
          error: err,
          nav: nav
        });
      }
      res.render('backend',{
        nav: nav
      });
      //res.sendFile(path.join(__dirname, '../../public/app', 'index.html'));
    });
  return backendRouter;
};

module.exports = router;