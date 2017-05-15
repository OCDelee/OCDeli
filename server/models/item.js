var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var itemSchema = new Schema ({
    imagePath: String,
    name: String,
    description: String,
    price: Number,
});

module.exports = mongoose.model('item', itemSchema);

// {

// 	"imagePath": "",
// 	"name": "",
// 	"description": "",
// 	"price": ""

// }
