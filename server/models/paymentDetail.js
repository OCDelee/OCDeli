var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var paymentDetailSchema = new Schema ({
    CCNumber: String,
    ExpDate: String,
    CCV: String,
    StreetAddress: String,
    City: String,
    State: String,
    Zip: String
})

module.exports = mongoose.model('paymentDetail', paymentDetailSchema);