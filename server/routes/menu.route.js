const express = require('express');
const router = express.Router();
const Menu = require('../models/menu.js');

router
    .get('/', getAllMenus)
    .get('/:menu_id', getMenu)
    .put('/:menu_id', updateMenu)
    .post('/', createMenu)
    .delete('/:menu_id', deleteMenu);
   


/////////


function getAllMenus(req, res) {
        Menu.find(function(err, menus){
            if (err)
                res.send(err);

            res.json(menus);
        });
    }

function getMenu(req, res) {
        Menu.findById(req.params.menu_id, function(err, menu) {
            if (err)
                res.send(err);
            res.json(menu);
        });
    }

function updateMenu(req, res) {
        Menu.findById(req.params.menu_id, function(err, menu) {
            if (err)
                res.send(err)

            menu.imagePath = req.body.imagePath;
            menu.menuItem = req.body.menuItem;
            menu.Description = req.body.Description;
            menu.Price = req.body.Price;


            menu.save(function(err){
                if (err)
                    res.send(err);

                res.json({ message: 'Menu Updated!' });
            });
        });
    }

function createMenu(req, res) {

        var menu = new Menu();

            menu.imagePath = req.body.imagePath;
            menu.menuItem = req.body.menuItem;
            menu.Description = req.body.Description;
            menu.Price = req.body.Price;

        menu.save(function(err) {
            if (err)
                res.send(err);

            res.json({ message: 'Menu item created!' });
        });
    }

function deleteMenu(req, res) {
        Menu.remove({
            _id: req.params.menu_id
        }, function(err, menu) {
            if (err)
                res.send(err);

            res.json({ message: 'Menu item deleted!' })
        });
    }

module.exports = router;