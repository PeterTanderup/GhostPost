var mongoose = require('mongoose');

var userSchema = new mongoose.Schema({
  userName: {type: String, required: true},
  email: {type: String, required: true},
  password: {type: String, required: true},
  firstName: String,
  lastName: String,
  role: {type: String, required: true}
});

mongoose.model('User', userSchema);