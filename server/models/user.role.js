var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var userRoleSchema = new Schema ({
    role: { 
        type: mongoose.Schema.Types.ObjectId, 
        ref: 'role' 
    },
    user: { 
        type: mongoose.Schema.Types.ObjectId, 
        ref: 'user' 
    }
})

module.exports = mongoose.model('userRole', userRoleSchema);