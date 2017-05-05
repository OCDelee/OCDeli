const express = require('express');
const router = express.Router();
const Customer = require('../models/customer.js');

router
    .get('/', getAllCustomers)
    .get('/:customer_id', getCustomer)
    .put('/:customer_id', updateCustomer)
    .post('/', createCustomer)
    .delete('/:customer_id', deleteCustomer);
   


/////////


function getAllCustomers(req, res) {
        Customer.find(function(err, customers){
            if (err)
                res.send(err);

            res.json(customers);
        });
    }

function getCustomer(req, res) {
        Customer.findById(req.params.customer_id, function(err, customer) {
            if (err)
                res.send(err);
            res.json(customer);
        });
    }

function updateCustomer(req, res) {
        Customer.findById(req.params.customer_id, function(err, customer) {
            if (err)
                res.send(err)

            customer.firstName = req.body.firstName;
            customer.lastName = req.body.lastName;
            customer.Telephone = req.body.Telephone;

            customer.save(function(err){
                if (err)
                    res.send(err);

                res.json({ message: 'Customer Updated!' });
            });
        });
    }

function createCustomer(req, res) {

        var customer = new Customer();
        customer.firstName = req.body.firstName;
        customer.lastName = req.body.lastName;
        customer.Telephone = req.body.Telephone;

        customer.save(function(err) {
            if (err)
                res.send(err);

            res.json({ message: 'Customer created!' });
        });
    }

function deleteCustomer(req, res) {
        Customer.remove({
            _id: req.params.customer_id
        }, function(err, customer) {
            if (err)
                res.send(err);

            res.json({ message: 'Customer Deleted!' })
        });
    }

module.exports = router;