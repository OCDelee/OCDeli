const express = require('express');
const router = express.Router();
const role = require('../models/role.js');

router
    .get('/', getAllRoles)
    .get('/:_id', getRole)
    .put('/:_id', updateRole)
    .post('/', createRole)
    .delete('/:_id', deleteRole);
   


/////////


function getAllRoles(req, res) {
        role.find(function(err, roles){
            if (err)
                res.status(500).send(err);

            res.json(roles);
        })
        
    }

function getRole(req, res) {
        role.findById(req.params.role_id, function(err, role) {
            if (err)
                res.status(500).send(err);
            res.json(role);
        });
    }

function updateRole(req, res) {
        role.findById(req.params.role_id, function(err, role) {
            if (err)
                res.send(err)

            role.name = req.body.name;

            role.save(function(err){
                if (err)
                    res.status(500).send(err);

                res.json({ message: 'Role Updated!' });
            });
        });
    }

function createRole(req, res) {
        var r = new role(req.body);

        r.save(function(err) {
            if (err)
                res.status(500).send(err);

            res.json({ message: 'Role created!' });
        });
    }

function deleteRole(req, res) {
        role.remove({
            _id: req.params.role_id
        }, function(err, role) {
            if (err)
                res.status(500).send(err);

            res.json({ message: 'Role Deleted!' })
        });
    }

module.exports = router;