const express = require('express');
const router = express.Router();
const address = require('../models/address');
const mongoose = require('mongoose');

router
    .get('/', getAllAddresses)
    // .get('/:_id', getAddressByUserId)
    .put('/:_id', updateAddress)
    .post('/', createAddress)

   


/////////


function getAllAddresses(req, res) {
        address.find(function(err, addresses){
            if (err)
                res.status(500).send(err);

            res.json(addresses);
        })
        .populate('user');
}

function updateAddress(req, res) {
        address.findById(req.params._id, function (err, address) {  
            if (err) 
                res.status(500).send(err);

        address.addressType = req.body.addressType;
        address.user = req.body.user;
        address.address1 = req.body.address1;
        address.address2 = req.body.address2;
        address.city = req.body.city;
        address.state = req.body.state;
        address.zip = req.body.zip;

        address.save(function (err, address) {
            if (err) {
                res.status(500).send(err)
            }
            res.send(address);
        });
});
}


function createAddress(req, res) {
        var a = new address(req.body);
        a.save(function(err) {
            if (err)
            return res.status(500).send(err);
            res.json({ message: 'Address created!' });
        });
}


// get all addresses by user 

// function getAllAddressesByUserId(req, res) {
//         address.find({
//     'userId': { $in: [req.params.userId]}},function(err, addresses){
//             if (err)
//                 res.send(err);

//             res.json(addresses);
//         });
//     }

module.exports = router;