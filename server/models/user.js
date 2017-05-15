const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const passportLocalMongoose = require('passport-local-mongoose');


var userSchema = new Schema ({
    address: { 
        type: mongoose.Schema.Types.ObjectId, 
        ref: 'address' 
    },
    order: { 
        type: mongoose.Schema.Types.ObjectId, 
        ref: 'order' 
    },
    userRole: { 
        type: String, 
        enum: ['Admin', 'Customer', 'Employee']
    },
    firstName: String,
    lastName: String,
    phone: String,
    email: String,
    username: String, 
    password: String, 
    
});

userSchema.plugin(passportLocalMongoose);

module.exports = mongoose.model('user', userSchema);