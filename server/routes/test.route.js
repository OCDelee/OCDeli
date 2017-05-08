// const express = require('express');
// const router = express.Router();
// const Order = require('../models/order.js');

// router
//     .get('/', getAllOrders)
//     .get('/:order_id', getOrder)
//     .put('/:order_id', updateOrder)
//     .post('/', createOrder)
//     .delete('/:order_id', deleteOrder);
   


// /////////


// function getAllOrders(req, res) {
//         Order.find(function(err,orders){
//             if (err)
//                 res.send(err);

//             res.json(orders);
//         });
//     }

// function getOrder(req, res) {
//         Order.findById(req.params.order_id, function(err,order) {
//             if (err)
//                 res.send(err);
//             res.json(order);
//         });
//     }

// function updateOrder(req, res) {
//         Order.findById(req.params.order_id, function(err, order) {
//             if (err)
//                 res.send(err)

//             order.Rating = req.body.Rating;
//             order.Cost = req.body.Cost;
//             order.Canceled = req.body.Canceled;
//             order.Confirmed = req.body.Confirmed;
//             order.Completed = req.body.Completed;


//             order.save(function(err){
//                 if (err)
//                     res.send(err);

//                 res.json({ message: 'Order Updated!' });
//             });
//         });
//     }

// function createOrder(req, res) {

//         var order = new Order();
        
//             order.Rating = req.body.Rating;
//             order.Cost = req.body.Cost;
//             order.Canceled = req.body.Canceled;
//             order.Confirmed = req.body.Confirmed;
//             order.Completed = req.body.Completed;

//        order.save(function(err) {
//             if (err)
//                 res.send(err);

//             res.json({ message: 'Order created!' });
//         });
//     }

// function deleteOrder(req, res) {
//         Order.remove({
//             _id: req.params.order_id
//         }, function(err, order) {
//             if (err)
//                 res.send(err);

//             res.json({ message: 'Order Deleted!' })
//         });
//     }

// module.exports = router;