(function() {
    'use strict';

    angular
        .module('app')
        .factory('orderFactory', orderFactory);

    orderFactory.$inject = ['$http', 'apiUrl'];

    /* @ngInject */
    function orderFactory($http, apiUrl) {
        var service = {
            getAllOrders: getAllOrders,
            getOrderById: getOrderById,
            getOrdersByUserId: getOrdersByUserId,
            update: update,
            create: create,
            remove: remove
        };

        return service;

        function getAllOrders() {
            return $http
                .get(apiUrl + 'order')
                .then(function(response) {
                    return response.data;
                });
        }

        function getOrderById(id) {
            return $http
                .get(apiUrl + 'order/' + id)
                .then(function(response) {
                    return response.data;
                });
        }

        function getOrdersByUserId(id) {
            return $http
                .get(apiUrl + 'userorders/' + id)
                .then(function(response) {
                    return response.data;
                });
        }

        function update(id, order) {
            return $http.put(apiUrl + 'order/' + id, order);
        }

        function create(order) {
            return $http
                .post(apiUrl + 'order', order)
                .then(function(response) {
                    return response.data;
                });
        }

        function remove(id) {
            return $http
                .delete(apiUrl + 'order/' + id)
                .then(function(response) {
                    return response.data;
                });
        }
    }
})();