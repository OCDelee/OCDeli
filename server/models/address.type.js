var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var addressTypeSchema = new Schema ({
    name: {
        type: String,
        default: 'Delivery',
        enum: ['Delivery', 'Billing']}
});

module.exports = mongoose.model('addressType', addressTypeSchema);