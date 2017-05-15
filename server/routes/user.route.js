var express = require('express');
var router = express.Router();
var passport = require('passport');

var user = require('../models/user');
var address = require('../models/address');
var order = require('../models/order');

router
    .post('/register', userRegister)
    .post('/login', userLogin)
    .get('/logout', userLogout)
    .get('/status', userStatus)
    .get('/', getAllUsers)
    .get('/:_id', getUser)
    .put('/:_id', updateUser)

/////////

function userRegister(req, res) {
  user.register(new user({ username: req.body.username }),
    req.body.password, function(err, account) {
    if (err) {
      return res.status(500).json({
        err: err
      });
    }
    passport.authenticate('local')(req, res, function () {
      return res.status(200).json({
        status: 'Registration successful!'
      });
    });
  });
};

function userLogin(req, res, next) {
  passport.authenticate('local', function(err, user, info) {
    if (err) {
      return next(err);
    }
    if (!user) {
      return res.status(401).json({
        err: info
      });
    }
    req.logIn(user, function(err) {
      if (err) {
        return res.status(500).json({
          err: 'Could not log in user'
        });
      }
      res.status(200).json({
        status: 'Login successful!'
      });
    });
  })(req, res, next);
};

function userLogout(req, res) {
  req.logout();
  res.status(200).json({
    status: 'Bye!'
  });
};

function userStatus(req, res) {
  if (!req.isAuthenticated()) {
    return res.status(200).json({
      status: false
    });
  }
  res.status(200).json({
    status: true
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

module.exports = router;



