// dependencies
const express = require('express');
const path = require('path');
const logger = require('morgan');
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const cors = require('cors');
const keyPublishable = process.env.pk_test_L6fEVgzAFeoFv1Yy3kGtFwv3;
var stripe = require("stripe")(
  "sk_test_Y08t8uauahS89pWAFR1S9qEI"
);

// route dependencies
const addressRoute = require('./routes/address.route');
const ingredientRoute = require('./routes/ingredient.route');
const itemRoute = require('./routes/item.route');
const orderItemRoute = require('./routes/order.item.route');
const orderRoute = require('./routes/order.route');
const userRoute = require('./routes/user.route');
const user = require('./models/user')


// mongoose
const mongoDB = 'mongodb://127.0.0.1:27017/OCDeli';
mongoose.connect(mongoDB);

var app = express();


// middleware

app.use(cors());
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static("../ui/"));
app.use(cookieParser());


// routes
app.use('/api/address', addressRoute);
app.use('/api/ingredient', ingredientRoute);
app.use('/api/item', itemRoute);
app.use('/api/orderitem', orderItemRoute);
app.use('/api/order', orderRoute);
app.use('/api/user/', userRoute);


app.get('*', function(req, res) {
  res.sendFile(path.join(__dirname, '/ui/', 'index.html'));
});


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