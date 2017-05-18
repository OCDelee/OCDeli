var mongoose = require('mongoose');
var Schema = mongoose.Schema;


var itemSchema = new Schema ({
    imagePath: String,
    name: String,
    description: String,
    price: Number,
    ingredients: [{
        type: mongoose.Schema.Types.ObjectId, 
        ref: 'ingredient'
    }]
})

module.exports = mongoose.model('item', itemSchema);

    // "imagePath": "http://food.fnr.sndimg.com/content/dam/images/food/fullset/2011/4/5/3/FNM-050111_Bobbys-Tacos-001_s4x3.jpg.rend.hgtvcom.966.725.jpeg",
    // "description": "A crunchy red slaw with tender brisket tacos seasoned with garlic, paprika and chili powder.",
    // "name": "Brisket Tacos with Red Cabbage",
    // "price": 1

        "imagePath": "http://food.fnr.sndimg.com/content/dam/images/food/fullset/2012/1/24/3/FNM_030112-WNDinners-041_s4x3.jpg.rend.hgtvcom.966.725.jpeg",
    "name": "Shrimp Tacos with Mango Slaw",
    "description": "Shrimp-and-coleslaw-filled tacos have great flavor and a wonderful crunch.",
    "price": 2,

    //     "imagePath": "http://food.fnr.sndimg.com/content/dam/images/food/fullset/2013/12/9/0/FNK_Chicken-Tostadas_s4x3.jpg.rend.hgtvcom.966.725.jpeg",
    // "name": "Chicken Tostadas by Bobby Flay",
    // "description": "Fry tortillas until very crispy, then top them with a mixture of chicken, beans, avocado, and salsa.",
    // "price": 2,

