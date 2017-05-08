var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var orderSchema = new Schema ({
    user: { 
        type: mongoose.Schema.Types.ObjectId, 
        ref: 'user' 
    },
    number: Number,
    total: Number,
    status: {
       type: String,
       enum: ['Canceled', 'Confirmed', 'Completed']
    },
    paid: Boolean
})

module.exports = mongoose.model('order', orderSchema);