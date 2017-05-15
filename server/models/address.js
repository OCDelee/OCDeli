var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var addressSchema = new Schema ({
    addressType: {
        type: String,
        default: 'Delivery',
        enum: ['Delivery', 'Billing']},
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

	// "addressType": "",
	// "user": "",
	// "address1": "",
	// "address2": "",
	// "city": "",
	// "state": "",
	// "zip": ""