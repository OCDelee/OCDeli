var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var orderItemSchema = new Schema ({
    
    // item: { 
    //     type: mongoose.Schema.Types.ObjectId, 
    //     ref: 'item' 
    // },
    itemIngredient: { 
        type: mongoose.Schema.Types.ObjectId, 
        ref: 'itemIngredient' 
    },

    order: { 
        type: mongoose.Schema.Types.ObjectId, 
        ref: 'order' 
    }
    
})

module.exports = mongoose.model('orderItem', orderItemSchema);