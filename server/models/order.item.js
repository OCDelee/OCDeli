var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var orderItemSchema = new Schema ({
    
    items: [{ 
        type: mongoose.Schema.Types.ObjectId, 
        ref: 'item' 
    }],
    itemTotal: Number,
    itemQty: Number,
    specialInstructions: String
    
})

module.exports = mongoose.model('orderItem', orderItemSchema);