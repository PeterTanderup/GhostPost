var express = require('express');
var apiRouter = express.Router();
var mongoose = require('mongoose');
var User = mongoose.model('User');
var Categories = mongoose.model('Categories');
//var Tag = mongoose.model('Tags');
var Tag = mongoose.model('Tag');

var sendJsonResponse = function (res, status, content) {
  res.status(status);
  res.json(content);
};
// need to trap errors
// done for /users

// sequrity ?

var router = function (nav) {
  apiRouter.route('/users')
    // get all users
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
    // create user
    .post(function (req, res) {
      var newUser = {
        userName: req.body.userName,
        email: req.body.email,
        password: req.body.password,
        firstName: req.body.firstName,
        lastName: req.body.lastName,
        role: req.body.role
      };

      // would like a way to validate the user object input against the shema
      // and return a validatian message if only the email is input and not just
      // a user eexist with that email message
      User.findOne({email: newUser.email}, function (err, user) {
        if (err) {
          sendJsonResponse(res, 400, err);
          return;
        } else if (user) {
          sendJsonResponse(res, 404, {
            'message': 'a user with that email exists'
          });
          return;
        } else {
          User.create(newUser, function (err, user) {
            if (err) {
              sendJsonResponse(res, 400, err);
            }
            else {
              sendJsonResponse(res, 201, user);
            }
          });
        }
      });
    });
  apiRouter.route('/users/:userid')
    // get one user
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
    // update one user
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
            //user.email = req.body.email; // can't update email
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
    // delete one user
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

  apiRouter.route('/tags')
    // get all tags
    .get(function (req, res) {
      Tag.find(function (err, tags) {
        if (err) {
          sendJsonResponse(res, 400, err);
        }
        else {
          sendJsonResponse(res, 200, tags);
        }
      });
    })
    // create tag
    .post(function(req, res) {
      Tag.create({
        tagName: req.body.tagName
      }, function (err, tag) {
        if (err) {
          sendJsonResponse(res, 400, err);
        }
        else {
          sendJsonResponse(res, 201, tag);
        }
      });
    });
  apiRouter.route('/tag:tagid')
    // get one tag
    .get(function (req, res) {
      if (req.params && req.params.tagid) {
        Tag
          .findById(req.params.tagsid)
          .exec(function (err, tag) {
            if (!tag) {
              sendJsonResponse(res, 404, {
                'message': 'tagid not found'
              });
              return;
            }
            else if (err) {
              sendJsonResponse(res, 400, err);
              return;
            }
            sendJsonResponse(res, 200, tag);
          });
      }
      else {
        sendJsonResponse(res, 404, {
          'message': 'no tagid in request'
        });
      }
    })
    // delete one tag
    .delete(function (req, res) {
      if (req.params && req.params.tagid) {
        Tag
          .findByIdAndRemove(req.params.tagid)
          .exec(function (err, tag) {
            if (err) {
              sendJsonResponse(res, 404, err);
              return;
            }
            sendJsonResponse(res, 204, null);
          });
      }
      else {
        sendJsonResponse(res, 404, {
          'message': 'no tagid in request'
        });
      }
    });


    // Categories
  apiRouter.route('/categories')
    // get all categories
    .get(function (req, res) {
            Categories.find(function (err, categories) {
                if (err) {
                    sendJsonResponse(res, 400, err);
                }
                else {
                    sendJsonResponse(res, 200, categories);
                }
            });
        })
    // create category
    .post(function (req, res) {
            Categories.create({
                categoryName: req.body.categoryName,

            }, function (err, category) {
                if (err) {
                    sendJsonResponse(res, 400, err);
                }
                else {
                    sendJsonResponse(res, 201, category);
                }
            });
        });
  apiRouter.route('/categories/:catid')
    // get one category
    .get(function (req, res) {
            if (req.params && req.params.catid) {
                Categories
                    .findById(req.params.catid)
                    .exec(function (err, category) {
                        if (!category) {
                            sendJsonResponse(res, 404, {
                                'message': 'Category ID not found'
                            });
                            return;
                        }
                        else if (err) {
                            sendJsonResponse(res, 400, err);
                            return;
                        }
                        sendJsonResponse(res, 200, category);
                    });
            }
            else {
                sendJsonResponse(res, 404, {
                    'message': 'no category ID in request'
                });
            }
        })
    // update one user
    .put(function (req, res) {
            if (req.params && req.params.catid) {
                Categories
                    .findById(req.params.catid)
                    .exec(function (err, category) {
                        if (!category) {
                            sendJsonResponse(res, 404, {
                                'message': 'Category ID not found'
                            });
                            return;
                        }
                        else if (err) {
                            sendJsonResponse(res, 400, err);
                            return;
                        }
                        category.categoryName = req.body.categoryName;
                        category.save(function(err, category){
                            if (err) {
                                sendJsonResponse(res, 404, err);
                            }
                            else {
                                sendJsonResponse(res, 200, category);
                            }
                        });
                    });
            }
            else {
                sendJsonResponse(res, 404, {
                    'message': 'No Category ID in request'
                });
            }
        })
    // delete one user
    .delete(function (req, res) {
            if (req.params && req.params.catid) {
                Categories
                    .findByIdAndRemove(req.params.catid)
                    .exec(function (err, category) {
                        if (err) {
                            sendJsonResponse(res, 404, err);
                            return;
                        }
                        sendJsonResponse(res, 204, null);
                    });
            }
            else {
                sendJsonResponse(res, 404, {
                    'message': 'No Category ID in request'
                });
            }
        });

  return apiRouter;
};

module.exports = router;