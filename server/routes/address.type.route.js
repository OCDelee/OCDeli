const express = require('express');
const router = express.Router();
const addressType = require('../models/address.type');

router
    .get('/', getAllAddressTypes)
    .get('/:_id', getAddressTypeById)
    // .put('/:_id', updateAddressType)
    .post('/', createAddressType)
    // .delete('/:_id', deleteAddressType);
   


/////////
function getAllAddressTypes(req, res) {
        addressType.find(function(err, addressTypes){
            if (err)
                res.status(500).send(err);

            res.json(addressTypes);
    });
}

function getAddressTypeById(req, res) {
        addressType.findById(req.params._id, function(err, addressType) {
            if (err)
                res.status(500).send(err);

            res.json(addressType);
    });
}

function createAddressType(req, res) {
        var a = new addressType(req.body);
        a.save(function(err) {
            if (err)
                return res.status(500).send(err);

            res.json({ message: 'Address type created!' });
    });
}

module.exports = router;