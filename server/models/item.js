var mongoose = require('mongoose');
var Schema = mongoose.Schema;


var itemSchema = new Schema ({
    imagePath: String,
    name: String,
    description: String,
    price: Number,
    selected: Boolean,
    ingredients: [{
        type: mongoose.Schema.Types.ObjectId, 
        ref: 'ingredient'
    }]
})

module.exports = mongoose.model('item', itemSchema);

