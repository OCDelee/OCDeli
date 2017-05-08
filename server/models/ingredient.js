var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var ingredientSchema = new Schema ({
    name: String,
    calories: Number,
    fiber: Number,
    protein: Number,
    vitamin: Array,
    mineral: Array,
    total: Number,
    servingSize: Number,
    servingSizeUOM: String // unit of measurement

});


module.exports = mongoose.model('ingredient', ingredientSchema);

// {
// "name": "String",
// "calories": "Number",
// "fiber": "Number",
// "protein": "Number",
// "vitamin": "Array",
// "mineral": "Array",
// "total": "Number",
// "servingSize": "Number",
// "servingSizeUOM": "String"
// }