var express = require('express');
var loginRouter = express.Router();

var router = function (nav) {
  loginRouter.route('/')
    .get(function(req, res, next) {
      res.render('login', {
        title: 'Login to GhostPost',
        nav: nav
    });
  });
  return loginRouter;
};

module.exports = router;