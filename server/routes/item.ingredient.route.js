const express = require('express');
const router = express.Router();
const itemIngredient = require('../models/item.ingredient');
const ingredient = require('../models/ingredient');
const item = require('../models/item');
const mongoose = require('mongoose');

router
    .get('/', getAllItemIngredients)
    .get('/:_id', getItemIngredient)
    .put('/:_id', updateItemIngredient)
    .post('/', createItemIngredient)
    // .delete('/:_id', delete);
   


/////////


function getAllItemIngredients(req, res) {
        itemIngredient.find(function(err, itemIngredients){
            if (err)
                res.status(500).send(err);

            res.json(itemIngredients);
        })
            .populate('ingredients')
            .populate('item');
    }

function getItemIngredient(req, res) {
        itemIngredient.findById(req.params._id, function(err, itemIngredient) {
            if (err)
                res.status(500).send(err);
            res.json(itemIngredient);
        })
            .populate('ingredients')
            .populate('item');
    }

function updateItemIngredient(req, res){
        itemIngredient.findById(req.params._id, function (err, itemIngredient) {  
            if (err) 
                res.status(500).send(err);

            itemIngredient.save(function (err, itemIngredient) {
                if (err) 
                    res.status(500).send(err);
                
                res.send(itemIngredient);
            });
    })
}

function createItemIngredient(req, res) {
        itemIngredient.find({_id: req.body._id})

        var i = new itemIngredient(req.body);
        i.save(function(err) {
            if (err)
                return res.status(500).send(err);

            res.json({ message: 'Item ingredient created!' });
    });
}


module.exports = router;