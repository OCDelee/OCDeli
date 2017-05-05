const express = require('express');
const router = express.Router();
const PaymentDetail = require('../models/paymentDetail.js');

router
    .get('/', getAllPaymentDetails)
    .get('/:paymentDetail_id', getPaymentDetail)
    .put('/:paymentDetail_id', updatePaymentDetail)
    .post('/', createPaymentDetail)
    .delete('/:paymentDetail_id', deletePaymentDetail);
   


/////////


function getAllPaymentDetails(req, res) {
        PaymentDetail.find(function(err, paymentDetails){
            if (err)
                res.send(err);

            res.json(paymentDetails);
        });
    }

function getPaymentDetail(req, res) {
        PaymentDetail.findById(req.params.paymentDetail_id, function(err, paymentDetail) {
            if (err)
                res.send(err);
            res.json(paymentDetail);
        });
    }

function updatePaymentDetail(req, res) {
        PaymentDetail.findById(req.params.paymentDetail_id, function(err, orderDetail) {
            if (err)
                res.send(err)

            paymentDetail.CCNumber = req.body.CCNumber;
            paymentDetail.ExpDate = req.body.ExpDate;
            paymentDetail.CCV = req.body.CCV;
            paymentDetail.StreetAddress = req.body.StreetAddress;
            paymentDetail.City = req.body.City;
            paymentDetail.State = req.body.State;
            paymentDetail.Zip = req.body.Zip;


            paymentDetail.save(function(err){
                if (err)
                    res.send(err);

                res.json({ message: 'Payment Detail Updated!' });
            });
        });
    }

function createPaymentDetail(req, res) {

        var paymentDetail = new PaymentDetail();
        
            paymentDetail.toStreetAddress = req.body.toStreetAddress;
            paymentDetail.toCity = req.body.toCity;
            paymentDetail.toState = req.body.toState;
            paymentDetail.toZip = req.body.toZip;
            paymentDetail.Time = req.body.Time;

       paymentDetail.save(function(err) {
            if (err)
                res.send(err);

            res.json({ message: 'Payment Detail created!' });
        });
    }

function deletePaymentDetail(req, res) {
        PaymentDetail.remove({
            _id: req.params.paymentDetail_id
        }, function(err, paymentDetail) {
            if (err)
                res.send(err);

            res.json({ message: 'Payment Detail Deleted!' })
        });
    }

module.exports = router;