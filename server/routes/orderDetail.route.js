const express = require('express');
const router = express.Router();
const OrderDetail = require('../models/orderDetail.js');

router
    .get('/', getAllOrderDetails)
    .get('/:order_id', getOrderDetail)
    .put('/:order_id', updateOrderDetail)
    .post('/', createOrderDetail)
    .delete('/:order_id', deleteOrderDetail);
   


/////////


function getAllOrderDetails(req, res) {
        OrderDetail.find(function(err,orderDetails){
            if (err)
                res.send(err);

            res.json(orderDetails);
        });
    }

function getOrderDetail(req, res) {
        OrderDetail.findById(req.params.orderDetail_id, function(err,orderDetail) {
            if (err)
                res.send(err);
            res.json(orderDetail);
        });
    }

function updateOrderDetail(req, res) {
        OrderDetail.findById(req.params.orderDetail_id, function(err, orderDetail) {
            if (err)
                res.send(err)

            orderDetail.Rating = req.body.Rating;
            orderDetail.Cost = req.body.Cost;
            orderDetail.Canceled = req.body.Canceled;
            orderDetail.Confirmed = req.body.Confirmed;
            orderDetail.Completed = req.body.Completed;


            orderDetail.save(function(err){
                if (err)
                    res.send(err);

                res.json({ message: 'Order Detail Updated!' });
            });
        });
    }

function createOrderDetail(req, res) {

        var orderDetail = new OrderDetail();
        
            orderDetail.toStreetAddress = req.body.toStreetAddress;
            orderDetail.toCity = req.body.toCity;
            orderDetail.toState = req.body.toState;
            orderDetail.toZip = req.body.toZip;
            orderDetail.Time = req.body.Time;

       orderDetail.save(function(err) {
            if (err)
                res.send(err);

            res.json({ message: 'Order Detail created!' });
        });
    }

function deleteOrderDetail(req, res) {
        OrderDetail.remove({
            _id: req.params.orderDetail_id
        }, function(err, order) {
            if (err)
                res.send(err);

            res.json({ message: 'Order Detail Deleted!' })
        });
    }

module.exports = router;