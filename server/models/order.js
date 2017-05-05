var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var OrderSchema = new Schema ({
    Rating: Number,
    Cost: Number,
    Canceled: Boolean,
    Confirmed: Boolean,
    Completed: Boolean
})

module.exports = mongoose.model('Order', OrderSchema);