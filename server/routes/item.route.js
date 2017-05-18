const express = require('express');
const router = express.Router();
const ingredient = require('../models/ingredient');
const item = require('../models/item');
const mongoose = require('mongoose');

router
    .get('/', getAllItems)
    .get('/:_id', getItemById)
    .put('/:_id', updateItem)
    .post('/', createItem)
    // .delete('/:_id', delete);
   


/////////


function getAllItems(req, res) {
        item.find(function(err, items){
            if (err)
                res.status(500).send(err);

            res.json(items);
        })
            .populate('ingredients');
    }

function getItemById(req, res) {
        item.findById(req.params._id, function(err, item) {
            if (err)
                res.status(500).send(err);
            res.json(item);
        })
            .populate('ingredients');
    }

function updateItem(req, res){
        item.findById(req.params._id, function (err, item) {  
            if (err) 
                res.status(500).send(err);

            item.save(function (err, item) {
                if (err) 
                    res.status(500).send(err);
                
                res.send(item);
            });
    })
}

function createItem(req, res) {
        item.find({_id: req.body._id})

        var i = new item(req.body);
        i.save(function(err) {
            if (err)
                return res.status(500).send(err);

            res.json({ message: 'Item created!' });
    });
}


module.exports = router;