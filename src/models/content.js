var mongoose = require('mongoose');

var contentSchema = new mongoose.Schema({
  title: {type: String, required: true},
  text: {type: String, required: true},
  category: {
    type : mongoose.Schema.Types.ObjectId,
    ref: 'Category',
    required: true
  },
  tags: [{
    type : mongoose.Schema.Types.ObjectId,
    ref: 'tag',
    required: true
  }]
});

mongoose.model('Content', contentSchema);