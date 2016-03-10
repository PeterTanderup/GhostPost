var express = require('express');
var apiRouter = express.Router();
var mongoose = require('mongoose');
var User = mongoose.model('User');

var sendJsonResponse = function (res, status, content) {
  res.status(status);
  res.json(content);
};
// need to trap errors
// done for /users

// sequrity ?

var router = function (nav) {
  apiRouter.route('/users')
    .get(function (req, res) {
      User.find(function (err, users) {
        if (err) {
          sendJsonResponse(res, 400, err);
        }
        else {
          sendJsonResponse(res, 200, users);
        }
      });
    })
    .post(function (req, res) {
      User.create({
        userName: req.body.userName,
        email: req.body.email,
        password: req.body.password,
        firstName: req.body.firstName,
        lastName: req.body.lastName,
        role: req.body.role
      }, function (err, user) {
        if (err) {
          sendJsonResponse(res, 400, err);
        }
        else {
          sendJsonResponse(res, 201, user);
        }
      });
    });
  apiRouter.route('/users/:userid')
    .get(function (req, res) {
      if (req.params && req.params.userid) {
        User
          .findById(req.params.userid)
          .exec(function (err, user) {
            if (!user) {
              sendJsonResponse(res, 404, {
                'message': 'userid not found'
              });
              return;
            }
            else if (err) {
              sendJsonResponse(res, 400, err);
              return;
            }
            sendJsonResponse(res, 200, user);
          });
      }
      else {
        sendJsonResponse(res, 404, {
          'message': 'no userid in request'
        });
      }
    })
    .put(function (req, res) {
      if (req.params && req.params.userid) {
        User
          .findById(req.params.userid)
          .exec(function (err, user) {
            if (!user) {
              sendJsonResponse(res, 404, {
                'message': 'userid not found'
              });
              return;
            }
            else if (err) {
              sendJsonResponse(res, 400, err);
              return;
            }
            user.userName = req.body.userName;
            user.email = req.body.email;
            user.password = req.body.password;
            user.firstName = req.body.firstName;
            user.lastName = req.body.lastName;
            user.role = req.body.role;
            user.save(function (err, user) {
              if (err) {
                sendJsonResponse(res, 404, err);
              }
              else {
                sendJsonResponse(res, 200, user);
              }
            });
          });
      }
      else {
        sendJsonResponse(res, 404, {
          'message': 'no userid in request'
        });
      }
    })
    .delete(function (req, res) {
      if (req.params && req.params.userid) {
        User
          .findByIdAndRemove(req.params.userid)
          .exec(function (err, user) {
            if (err) {
              sendJsonResponse(res, 404, err);
              return;
            }
            sendJsonResponse(res, 204, null);
          });
      }
      else {
        sendJsonResponse(res, 404, {
          'message': 'no userid in request'
        });
      }
    });
  return apiRouter;
};

module.exports = router;