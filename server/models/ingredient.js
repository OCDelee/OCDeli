var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var ingredientSchema = new Schema ({
    Name: String,
    Calories: Number,
    Fiber: Number,
    Protein: Number,
    Vitamins: String,
    Minerals: String,
    Cost: Number
})

module.exports = mongoose.model('ingredient', ingredientSchema);