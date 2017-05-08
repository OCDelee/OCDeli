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

// route dependencies
const addressRoute = require('./routes/address.route');
const addressTypeRoute = require('./routes/address.type.route');
const ingredientRoute = require('./routes/ingredient.route');
const itemIngredientRoute = require('./routes/item.ingredient.route');
const itemRouteRoute = require('./routes/item.route');
const orderItemRoute = require('./routes/order.item.route');
const orderRoute = require('./routes/order.route');
const roleRoute = require('./routes/role.route');
const userRoute = require('./routes/user.route');
const userRole = require('./routes/user.role');

// mongoose
const mongoDB = 'mongodb://127.0.0.1:27017/OCDeli';
mongoose.connect(mongoDB);

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
app.use('/api/address', addressRoute);
app.use('/api/addresstype', addressTypeRoute);
app.use('/api/ingredient', ingredientRoute);
app.use('/api/itemIngredient', itemIngredientRoute);
app.use('/api/item', itemRoute);
app.use('/api/orderItem', orderItemRoute);
app.use('/api/order', orderRoute);
app.use('/api/role', roleRoute);
app.use('/api/userRole', userRoleRoute);
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