// dependencies
const express = require('express');
const path = require('path');
const logger = require('morgan');
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');
const expressSession = require('express-session');
const mongoose = require('mongoose');
const customerRoute = require('./routes/customer.route');
const ingredientRoute = require('./routes/ingredient.route');
const menuRoute = require('./routes/menu.route');
const orderRoute = require('./routes/order.route');
const orderDetailRoute = require('./routes/orderDetail.route');
const paymentDetailRoute = require('./routes/paymentDetail.route');
const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const mongoDB = 'mongodb://127.0.0.1:27017/OCDeli';
const cors = require('cors');

// mongoose
mongoose.connect(mongoDB);

var routes = require('./routes/index');
var User = require('./models/user');

var app = express();

// middleware
app.use(express.static(path.join(__dirname, '../user')));
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




// routes

app.use('/api/customers', customerRoute);
app.use('/api/ingredients', ingredientRoute);
app.use('/api/menu', menuRoute);
app.use('/api/orders', orderRoute);
app.use('/api/orderdetails', orderDetailRoute);
app.use('/api/paymentdetails', paymentDetailRoute);

app.use('/user/', routes);

app.get('/', function(req, res) {
  res.sendFile(path.join(__dirname, '../user', 'index.html'));
});

// passport config
passport.use(new LocalStrategy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());


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