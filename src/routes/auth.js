var express = require('express');
var authRouter = express.Router();
var passport = require('passport');
var mongoose = require('mongoose');
var User = mongoose.model('User');
var sendJsonResponse = function (res, status, content) {
  res.status(status);
  res.json(content);
};

var router = function (nav) {
  authRouter.route('/signUp')
    .post(function (req, res) {
      var newUser = {
        userName: req.body.userName,
        email: req.body.email,
        password: req.body.password,
        firstName: req.body.firstName,
        lastName: req.body.lastName,
        role: 'user'
      };

      // would like a way to validate the user object input against the shema
      // and return a validatian message if only the email is input and not just
      // a user eexist with that email message
      User.findOne({email: newUser.email}, function (err, user) {
        if (err) {
          //sendJsonResponse(res, 400, err);
          //return;
          res.render('login', {
            title: 'Login to GhostPost',
            nav: nav,
            message: err.name
          });
        } else if (user) {
          //sendJsonResponse(res, 404, {
          //  'message': 'a user with that email exists'
          //});
          //return;
          res.render('login', {
            title: 'Login to GhostPost',
            nav: nav,
            message: 'a user with that email exists'
          });
        } else {
          User.create(newUser, function (err, user) {
            if (err) {
              //sendJsonResponse(res, 400, err);
              res.render('login', {
                title: 'Login to GhostPost',
                nav: nav,
                message: err.name
              });
            }
            else {
              //sendJsonResponse(res, 201, user);
              req.login(user, function () {
                res.redirect('/auth/profile');
              });
            }
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