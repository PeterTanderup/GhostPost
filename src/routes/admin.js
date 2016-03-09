var express = require('express');
var adminRouter = express.Router();

var router = function (nav) {
  adminRouter.route('/')
    .get(function(req, res, next) {
      res.render('app/index');
    });
  return adminRouter;
};

module.exports = router;