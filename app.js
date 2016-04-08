var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var passport = require('passport');
var session = require('express-session');
require('./src/models/db');
var port = process.env.PORT || 5000;
var nav = [
  {
    Link: '/login',
    Text: 'Login'
  },
  {
    Link: '/',
    Text: 'Home'
  },{
    Link: '/backend',
    Text: 'Admin'
  }
];

var routes = require('./src/routes/index')(nav);
var login = require('./src/routes/login')(nav);
var auth = require('./src/routes/auth')(nav);
var api = require('./src/routes/api')(nav);
var backend = require('./src/routes/backend')(nav);

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'src/views'));
app.set('view engine', 'jade');

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(express.static(path.join(__dirname, 'public')));
//app.use(express.static(path.join(__dirname, 'public/app')));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));
app.use(cookieParser());
app.use(session({secret: 'ghostpost'}));
require('./src/config/passport')(app);

app.use('/', routes);
app.use('/login', login);
app.use('/auth', auth);
app.use('/api', api);
app.get('/backend', backend);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Page Not Found');
  err.status = 404;
  next(err);
});

// production error handler
// no stacktraces leaked to user
app.use(function(err, req, res, next) {
  res.status(err.status || 500);
  res.render('error', {
    message: err.message,
    error: err,
    nav: nav
  });
});

app.listen(port, function (err) {
  console.log('running server on port: ' + port);
});
