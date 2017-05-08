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
        order.findById(req.params.order_id, function(err, order) {
            if (err)
                res.status(500).send(err);
            res.json(order);
    });
}

function updateOrder(req, res) {
        order.findById(req.params.order_id, function(err, order) {
            if (err)
                res.send(err)

        order.user = req.body.user;
        order.number = req.body.number;
        order.status = req.body.status;
        order.paid = req.body.paid;

        order.save(function(err){
            if (err)
                res.status(500).send(err);

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
            _id: req.params.order_id
        }, function(err, order) {
            if (err)
                res.status(500).send(err);

            res.json({ message: 'Order Deleted!' })
    });
}

module.exports = router;