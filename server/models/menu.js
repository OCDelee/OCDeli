var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var MenuSchema = new Schema ({
    imagePath: String,
    menuItem: String,
    Description: String,
    Price: Number,
});

module.exports = mongoose.model('Menu', MenuSchema);