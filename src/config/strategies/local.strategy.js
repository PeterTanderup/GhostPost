var passport = require('passport'),
    LocalStrategy = require('passport-local').Strategy,
    mongoose = require('mongoose'),
    User = mongoose.model('User'),
    sendJsonResponse = function (res, status, content) {
      res.status(status);
      res.json(content);
    };
module.exports = function () {
  passport.use(new LocalStrategy({
    usernameField: 'userName',
    passwordField: 'password'
  },
  function (username, password, done) {
    User
      .findOne({userName: username}, function (err, user) {
        if (!user) {
          done(null, false, {message: 'user not found'});
          return;
        }
        else if (err) {
          done(null, false, err);
          return;
        }
        if (user.password === password) {
          var usert = user;
          done(null, usert);
        }
        else {
          done(null, false, {message: 'Bad password'});
        }
      });
  }));
};