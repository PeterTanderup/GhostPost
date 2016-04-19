var mongoose = require('mongoose');
var gracefullShutdown;
var dbURI = 'mongodb://localhost/ghostpost';
if (process.env.NODE_ENV === 'production') {
  dbURI = process.env.MONGOLAB_URI;
}
mongoose.connect(dbURI);

mongoose.connection.on('connected', function () {
  console.log('Mongoose connected to ' + dbURI);
});
mongoose.connection.on('error', function (err) {
  console.log('Mongoose connection error ' + err);
});
mongoose.connection.on('disconnected', function () {
  console.log('Mongoose diconnected');
});

gracefullShutdown = function (msg, callback) {
  mongoose.connection.close(function () {
    console.log('Mongoose disconnected through ' + msg);
    callback();
  });
};

// for nodemon restarts
process.once('SIGUSR2', function () {
  gracefullShutdown('nodemon restart', function () {
    process.kill(process.pid, 'SIGUSR2');
  });
});
// for app termination
process.on('SIGINT', function () {
  gracefullShutdown('app termination', function () {
    process.exit(0);
  });
});
// for heroku app termination
process.on('SIGTERM', function () {
  gracefullShutdown('Heroku app shutdown', function () {
    process.exit(0);
  });
});
require('./users');
require('./category');
require('./tags');
