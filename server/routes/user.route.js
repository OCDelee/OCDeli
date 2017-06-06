var express = require('express');
var router = express.Router();
var passport = require('passport');
var jwt = require('jsonwebtoken');
var secret = 'supersecret'
var user = require('../models/user');
var address = require('../models/address');
var order = require('../models/order');

router
    .post('/authenticate', authenticateUser)
    .get('/', getAllUsers)
    .get('/:_id', getUser)
    .put('/:_id', updateUser)
    .post('/', createUser)
    .use(function(req, res, next) {
      var token = req.body.token || req.body.query || req.headers['x-access-token'];

      if (token) {
        jwt.verify(token, secret, function(err, decoded) {
          if (err) {
            res.json({ success: false, message: 'Token invalid'});
          } else {
            req.decoded = decoded;
            next();
          }
        });
      } else {
        res.json({ success: false, message: 'No token provided' });
      }
    })
    .post('/me', function(req, res) {
      res.send(req.decoded)
    })

/////////

function authenticateUser(req, res) {
  user.findOne({ username: req.body.username }).select('email username password').exec(function(err, user) {
    if (err) throw err;

    if (!user) {
      res.json({ success: false, message: 'Could not authenticate user' });
    } else if (user) {
        if (req.body.password) {
            var validPassword = user.comparePassword(req.body.password);
      } else {
            res.json({ success: false, message: 'No password provided'})
      }
        if(!validPassword) {
          res.json({success: false, message: 'Could not authenticate password '})
      } else {
          var token = jwt.sign({ username: user.username, email: user.email }, secret, { expiresIn: '24h'} );
          res.json({ success: true, message: 'User authenticated!', token: token });
        }
    }

  });
};

////////

function getAllUsers(req, res) {
      user
        .find(function(err, users){
            if (err)
               res.status(500).send(err);

            res.json(users);
        })
        .populate('order')
        .populate('address');
            
}

function getUser(req, res) {
        user
          .findById(req.params._id, function(err, user) {
              if (err)
                  res.status(500).send(err);

              res.json(user);
      })
        .populate('order')
        .populate('address');
}

function updateUser(req, res) {
        user
          .findById(req.params._id, function(err, user) {
              if (err)
                  return res.send(err)

              user.address = req.body.address;
              user.order = req.body.order;
              user.userRole = req.body.userRole;
              user.firstName = req.body.firstName;
              user.lastName = req.body.lastName;
              user.phone = req.body.phone;
              user.email = req.body.email;

              user.save(function(err){
                  if (err)
                      res.send(err);

                  res.json({ message: 'User Updated!' });
              });
      });
  }

  function createUser(req, res) {
        var u = new user(req.body);
        if (req.body.username == null || req.body.username == '' || req.body.password == null || req.body.password == '' || req.body.email == null || req.body.email == '') {
          res.json({ success: false, message: 'Make sure username, email and password were provided'});
        } else {
            u.save(function(err) {
            if (err){
              res.json({success: false, message: 'Username or Email already exists!'});
            } else {
              res.json({ success: true, message: 'user created!'});
            }
    });
        }
}


module.exports = router;



