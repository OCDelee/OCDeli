var mongoose = require('mongoose');
var Schema = mongoose.Schema;


var itemIngredientSchema = new Schema ({
    ingredients: [{
        type: mongoose.Schema.Types.ObjectId, 
        ref: 'ingredient'
    }],
    item: {
        type: mongoose.Schema.Types.ObjectId, 
        ref: 'item'
    },
    name: String
})

module.exports = mongoose.model('itemIngredient', itemIngredientSchema);

