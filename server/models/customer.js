var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var CustomerSchema = new Schema ({
    firstName: String,
    lastName: String,
    Telephone: String
})

module.exports = mongoose.model('Customer', CustomerSchema);