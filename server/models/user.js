const mongoose = require('mongoose');
const Schema = mongoose.Schema;
var bcrypt = require('bcrypt-nodejs')


var userSchema = new Schema ({
    address: { 
        type: mongoose.Schema.Types.ObjectId, 
        ref: 'address' 
    },
    order: [{ 
        type: mongoose.Schema.Types.ObjectId, 
        ref: 'order' 
    }],
    firstName: String,
    lastName: String,
    phone: String,
    username: { 
        type: String,
        lowercase: true,
        required: true,
        unique: true
    }, 
    password: {
        type: String,
        required: true 
    },
    email: { 
        type: String,
        lowercase: true,
        required: true,
        unique: true
    }
});


userSchema.pre('save', function(next) {
  var user = this;
  bcrypt.hash(user.password, null, null, function(err, hash) {
      if (err)
        return next(err);
    user.password = hash;
    next();
  });
});

userSchema.methods.comparePassword = function(password) {
    return bcrypt.compareSync(password, this.password);
};


module.exports = mongoose.model('user', userSchema);