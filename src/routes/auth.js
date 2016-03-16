var express = require('express');
var authRouter = express.Router();
var passport = require('passport');
var mongoose = require('mongoose');
var User = mongoose.model('User');
var sendJsonResponse = function (res, status, content) {
  res.status(status);
  res.json(content);
};

var router = function () {
  authRouter.route('/signUp')
    .post(function (req, res) {
      console.log(req.body);
      User.create({
        userName: req.body.userName,
        email: req.body.email,
        password: req.body.password,
        firstName: req.body.firstName,
        lastName: req.body.lastName,
        role: 'user'
      }, function (err, user) {
        if (err) {
          sendJsonResponse(res, 400, err);
        }
        else {
          //sendJsonResponse(res, 201, user);
          req.login(user, function () {
            res.redirect('/auth/profile');
          });
        }
      });
    });
  authRouter.route('/signIn')
    .post(passport.authenticate('local',{
      failureRedirect: '/login'
    }), function (req, res) {
      res.redirect('/auth/profile');
    });
  authRouter.route('/profile')
    .all(function (req, res, next) {
      if (!req.user) {
        res.redirect('/');
      }
      next();
    })
    .get(function (req, res) {
      res.json(req.user);
    });
  return authRouter;
};

module.exports = router;