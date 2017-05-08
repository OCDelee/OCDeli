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
        type: mongoose.Schema.Types.ObjectId, 
        ref: 'userRole' 
    },
    firstName: String,
    lastName: String,
    phone: String,
    email: String,
    username: { 
        type: String, 
        required: true, 
        unique: true 
    },
    password: { 
        type: String, 
        required: true 
    },
});

userSchema.plugin(passportLocalMongoose);

module.exports = mongoose.model('user', userSchema);