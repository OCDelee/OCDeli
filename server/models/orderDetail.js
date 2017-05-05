var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var orderDetailSchema = new Schema ({
    toStreetAddress: String,
    toCity : String,
    toState: String,
    toZip: String,
    Time: Date
})


module.exports = mongoose.model('orderDetail', orderDetailSchema);