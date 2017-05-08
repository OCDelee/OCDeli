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

// 	"itemingredient": "590fcad34580e327a01ccdc0",
// 	"imagePath": "abc.com",
// 	"name": "pasta",
// 	"description": "thinly cut dough, doe",
// 	"price": "5"

// }
