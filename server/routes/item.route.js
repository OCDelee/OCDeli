const express = require('express');
const router = express.Router();
const item = require('../models/item');
const mongoose = require('mongoose');

router
    .get('/', getAllItems)
    .get('/:_id', getItem)
    .put('/:_id', updateItem)
    .post('/', createItem)
    .delete('/:_id', deleteItem);
   


/////////


function getAllItems(req, res) {
        item.find(function(err, items){
            if (err)
                res.status(500).send(err);

            res.json(items);
        })
            .populate('ingredient');
    }

function getItem(req, res) {
        item.findById(req.params.item_id, function(err, item) {
            if (err)
                res.status(500).send(err);
            res.json(item);
        });
    }

function updateItem(req, res) {
        item.findById(req.params.item_id, function(err, item) {
            if (err)
                res.send(err)

            item.imagePath = req.body.imagePath;
            item.name = req.body.name;
            item.description = req.body.description;
            item.price = req.body.price;


            item.save(function(err){
                if (err)
                    res.status(500).send(err);

                res.json({ message: 'Item Updated!' });
        });
    });
}


function createItem(req, res) {
            var a = new item(req.body);
            a.save(function(err) {
                if (err)
                    return res.send();
                    
                res.json({ message: 'Item created!' });
    });
}

function deleteItem(req, res) {
        item.remove({
            _id: req.params.item_id
        }, function(err, item) {
            if (err)
                res.status(500).send(err);

            res.json({ message: 'Item Deleted!' })
        });
}

module.exports = router;
