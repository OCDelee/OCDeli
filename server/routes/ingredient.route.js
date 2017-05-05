const express = require('express');
const router = express.Router();
const Ingredient = require('../models/ingredient.js');

router
    .get('/', getAllIngredients)
    .get('/:ingredient_id', getIngredient)
    .put('/:ingredient_id', updateIngredient)
    .post('/', createIngredient)
    .delete('/:ingredient_id', deleteIngredient);
   


/////////


function getAllIngredients(req, res) {
        Ingredient.find(function(err, ingredients){
            if (err)
                res.send(err);

            res.json(ingredients);
        });
    }

function getIngredient(req, res) {
        Ingredient.findById(req.params.ingredient_id, function(err, ingredient) {
            if (err)
                res.send(err);
            res.json(ingredient);
        });
    }

function updateIngredient(req, res) {
        Ingredient.findById(req.params.ingredient_id, function(err, ingredient) {
            if (err)
                res.send(err)

            ingredient.Name = req.body.Name;
            ingredient.Calories = req.body.Calories;
            ingredient.Cost = req.body.Cost;


            ingredient.save(function(err){
                if (err)
                    res.send(err);

                res.json({ message: 'Ingredient Updated!' });
            });
        });
    }

function createIngredient(req, res) {

        var ingredient = new Ingredient();

            ingredient.Name = req.body.Name;
            ingredient.Calories = req.body.Calories;
            ingredient.Cost = req.body.Cost;

        ingredient.save(function(err) {
            if (err)
                res.send(err);

            res.json({ message: 'Ingredient created!' });
        });
    }

function deleteIngredient(req, res) {
        Ingredient.remove({
            _id: req.params.ingredient_id
        }, function(err, ingredient) {
            if (err)
                res.send(err);

            res.json({ message: 'Ingredient Deleted!' })
        });
    }

module.exports = router;