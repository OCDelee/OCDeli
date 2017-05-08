var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var addressSchema = new Schema ({
    addressType: { 
        type: mongoose.Schema.Types.ObjectId,
        ref: 'addressType' 
    },
    user: { 
        type: mongoose.Schema.Types.ObjectId, 
        ref: 'user' 
    },
    address1: String,
    address2: String,
    city: String,
    state: String,
    zip: String,
})

module.exports = mongoose.model('address', addressSchema);