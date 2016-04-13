var mongoose = require('mongoose');

var tagSchema = new mongoose.Schema({
    tagName: {type: String, required: true}
});

mongoose.model('Tags', tagSchema);