const express = require('express');
const router = express.Router();
const item = require('../models/item');
const order = require('../models/order');
const orderItem = require('../models/order.item');
const mongoose = require('mongoose');

router
    .get('/', getAllOrderItems)
    .get('/:_id', getOrderItem)
    .put('/:_id', updateOrderItem)
    .post('/', createOrderItem)
    // .delete('/:_id', delete);
   


/////////


function getAllOrderItems(req, res) {
        orderItem.find(function(err, orderItems){
            if (err)
                res.status(500).send(err);

            res.json(orderItems);
        })
            .populate('item')
            .populate('order');
    }

function getOrderItem(req, res) {
        orderItem.findById(req.params._id, function(err, orderItem) {
            if (err)
                res.status(500).send(err);
            res.json(orderitem);
        });
    }

function updateOrderItem(req, res){
        orderItem.findById(req.params._id, function (err, orderItem) {  
            if (err) 
                res.status(500).send(err);

            orderItem.save(function (err, orderItem) {
                if (err) 
                    res.status(500).send(err);
                
                res.send(orderItem);
            });
    })
}

function createOrderItem(req, res) {
        var o = new orderItem(req.body);

        o.save(function(err) {
            if (err)
                return res.send();

            res.json({ message: 'Order item created!' });
    });
}

function deleteOrderItem(req, res) {
        orderItem.remove({_id: req.params._id}, function(err, orderItem) {
            if (err)
                res.status(500).send(err);

            res.json({ message: 'Order item Deleted!' })
    });
}


module.exports = router;