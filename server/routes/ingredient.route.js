const express = require('express');
const router = express.Router();
const ingredient = require('../models/ingredient.js');

router
    .get('/', getAllIngredients)
    .get('/:_id', getIngredient)
    .put('/:_id', updateIngredient)
    .post('/', createIngredient)
    .delete('/:_id', deleteIngredient);
   


/////////


function getAllIngredients(req, res) {
        ingredient.find(function(err, ingredients){
            if (err)
                res.status(500).send(err);

            res.json(ingredients);
        })
        
    }

function getIngredient(req, res) {
        ingredient.findById(req.params.ingredient_id, function(err, ingredient) {
            if (err)
                res.status(500).send(err);
            res.json(ingredient);
        });
    }

function updateIngredient(req, res) {
        ingredient.findById(req.params.ingredient_id, function(err, ingredient) {
            if (err)
                res.send(err)

            ingredient.name = req.body.name;
            ingredient.calories = req.body.calories;
            ingredient.fiber = req.body.fiber;
            ingredient.protein = req.body.protein;
            ingredient.vitamin = req.body.vitamin;
            ingredient.mineral = req.body.mineral;
            ingredient.total = req.body.total;
            ingredient.servingSize = req.body.servingSize;
            ingredient.servingSizeUOM = req.body.servingSizeUOM;


            ingredient.save(function(err){
                if (err)
                    res.status(500).send(err);

                res.json({ message: 'Ingredient Updated!' });
            });
        });
    }

function createIngredient(req, res) {
        var i = new ingredient(req.body);

        i.save(function(err) {
            if (err)
                res.status(500).send(err);

            res.json({ message: 'Ingredient created!' });
        });
    }

function deleteIngredient(req, res) {
        ingredient.remove({
            _id: req.params.ingredient_id
        }, function(err, ingredient) {
            if (err)
                res.status(500).send(err);

            res.json({ message: 'Ingredient Deleted!' })
        });
    }

module.exports = router;