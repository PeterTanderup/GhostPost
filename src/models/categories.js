/**
 * Created by Jesper on 13-Apr-16.
 */
var mongoose = require('mongoose');

var cateSchema = new mongoose.Schema({
    categoryName: {type: String, require: true}
});

mongoose.model('Categories', cateSchema);