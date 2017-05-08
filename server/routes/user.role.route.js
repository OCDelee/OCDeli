const express = require('express');
const router = express.Router();
const role = require('../models/role');
const user = require('../models/user')
const userRole = require('../models/user.role');
const mongoose = require('mongoose');

router
    .get('/', getAllUserRoles)
    .get('/:_id', getUserRole)
    .put('/:_id', updateUserRole)
    .post('/', createUserRole)
    .delete('/:_id', deleteUserRole);
   


/////////


function getAllUserRoles(req, res) {
        userRole.find(function(err, userRoles){
            if (err)
                res.status(500).send(err);

            res.json(userRoles);
        })
            .populate('user')
            .populate('role');
    }

function getUserRole(req, res) {
        userRole.findById(req.params._id, function(err, userRole) {
            if (err)
                res.status(500).send(err);
            res.json(userRole);
        });
    }

function updateUserRole(req, res){
        userRole.findById(req.params.userRole._id, function (err, userRole) {  
            if (err) 
                res.status(500).send(err);

            userRole.save(function (err, userRole) {
                if (err) 
                    res.status(500).send(err);
                
                res.send(userRole);
            });
    })
}

function createUserRole(req, res) {
        var u = new userRole(req.body);

        u.save(function(err) {
            if (err)
                return res.send();

            res.json({ message: 'User role created!' });
    });
}

function deleteUserRole(req, res) {
        userRole.remove({_id: req.params.userRole_id}, function(err, userRole) {
            if (err)
                res.status(500).send(err);

            res.json({ message: 'User role Deleted!' })
    });
}


module.exports = router;