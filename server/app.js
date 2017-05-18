// dependencies
const express = require('express');
const path = require('path');
const logger = require('morgan');
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');
const expressSession = require('express-session');
const mongoose = require('mongoose');
const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const cors = require('cors');
const keyPublishable = process.env.pk_test_L6fEVgzAFeoFv1Yy3kGtFwv3;
var stripe = require("stripe")(
  "sk_test_Y08t8uauahS89pWAFR1S9qEI"
);

// route dependencies
const addressRoute = require('./routes/address.route');
// const addressTypeRoute = require('./routes/address.type.route');
const ingredientRoute = require('./routes/ingredient.route');
const itemRoute = require('./routes/item.route');
const orderItemRoute = require('./routes/order.item.route');
const orderRoute = require('./routes/order.route');
// const roleRoute = require('./routes/role.route');
const userRoute = require('./routes/user.route');
// const userRoleRoute = require('./routes/user.role.route');
const user = require('./models/user')


// mongoose
const mongoDB = 'mongodb://127.0.0.1:27017/OCDeli';
mongoose.connect(mongoDB);

var app = express();


// middleware
app.use(express.static("public"));
app.use(cors());
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(require('express-session')({
    secret: 'super secret',
    resave: false,
    saveUninitialized: false
}));
app.use(passport.initialize());
app.use(passport.session());
app.use(express.static(path.join(__dirname, 'public')));

// stripe
app.post("/charge", (req, res) => {
  let amount = 500;

  
  stripe.customers.create({
    email: req.body.email,
    card: req.body.id
  })
  .then(customer =>
    stripe.charges.create({
      amount,
      description: "Sample Charge",
      currency: "usd",
      customer: customer.id
    }))
  .then(charge => res.send(charge))
  .catch(err => {
    console.log("Error:", err);
    res.status(500).send({error: "Purchase Failed"});
  });
});


// routes
app.use('/api/address', addressRoute);
// app.use('/api/addresstype', addressTypeRoute);
app.use('/api/ingredient', ingredientRoute);
app.use('/api/item', itemRoute);
app.use('/api/orderitem', orderItemRoute);
app.use('/api/order', orderRoute);
// app.use('/api/role', roleRoute);
// app.use('/api/userrole', userRoleRoute);
app.use('/user/', userRoute);


app.get('/', function(req, res) {
  res.sendFile(path.join(__dirname, '../user', 'index.html'));
});

// passport config
passport.use(new LocalStrategy(user.authenticate()));
passport.serializeUser(user.serializeUser());
passport.deserializeUser(user.deserializeUser());


// error handlers
app.use(function(req, res, next) {
    var err = new Error('Not Found');
    err.status = 404;
    next(err);
});

app.use(function(err, req, res) {
  res.status(err.status || 500);
  res.end(JSON.stringify({
    message: err.message,
    error: {}
  }));
});


module.exports = app;