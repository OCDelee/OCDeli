const express = require('express');
const router = express.Router();
const order = require('../models/order');
const user = require('../models/user')
const mongoose = require('mongoose');

router
    .get('/', getAllOrders)
    .get('/:_id', getOrder)
    .put('/:_id', updateOrder)
    .post('/', createOrder)
    .delete('/:_id', deleteOrder);
   


/////////


function getAllOrders(req, res) {
        order.find(function(err, orders){
            if (err)
                res.status(500).send(err);

            res.json(orders);
    })
            .populate('user');
}

function getOrder(req, res) {
        order.findById(req.params._id, function(err, order) {
            if (err)
                res.status(500).send(err);
            res.json(order);
    });
}

function updateOrder(req, res) {
        order.findById(req.params._id, function(err, order) {
            if (err)
                res.send(err)

        // order.username =  vm.tempOrder.username;
        // order.date =  vm.tempOrder.date;
        // order.number =  vm.tempOrder.number;
        // order.total =  vm.tempOrder.total;
        // order.status =  vm.tempOrder.status;
        // order.paid =  vm.tempOrder.paid;
        // order.orderItems =  vm.orderItems
        // order.orderItems = req.body.orderItems;

        order.save(function(err, order){
            if (err)
                res.status(500).send(err);
            res.send(order);
            res.json({ message: 'Order Updated!' });
        });
    });
}

function createOrder(req, res) {
        var o = new order(req.body);
        o.save(function(err) {
            if (err)
                return res.status(500).send(err);

            res.json({ message: 'Order created!' });
    });
}

function deleteOrder(req, res) {
        order.remove({
            _id: req.params._id
        }, function(err, order) {
            if (err)
                res.status(500).send(err);

            res.json({ message: 'Order Deleted!' })
    });
}

module.exports = router;