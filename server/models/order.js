var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var orderSchema = new Schema ({
    // user: { 
    //     type: mongoose.Schema.Types.ObjectId, 
    //     ref: 'user' 
    // },
    // userId: Number,
    username: String,
    number: Number,
    total: Number,
    date: Date,
    status: {
       type: String,
       enum: ['Canceled', 'Confirmed', 'Completed', 'Returned']
    },
    paid: Boolean,
    orderItems: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'orderItem'
    }]
    
})

module.exports = mongoose.model('order', orderSchema);

// {
// 	"user": "",
// 	"number": "",
// 	"total": ,
// 	"status": "",
// 	"paid": true/false
// }