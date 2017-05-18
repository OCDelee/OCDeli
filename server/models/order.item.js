var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var orderItemSchema = new Schema ({
    
    item: { 
        type: mongoose.Schema.Types.ObjectId, 
        ref: 'item' 
    },

    order: { 
        type: mongoose.Schema.Types.ObjectId, 
        ref: 'order' 
    }
    
})

module.exports = mongoose.model('orderItem', orderItemSchema);