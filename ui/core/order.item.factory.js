// (function() {
//     'use strict';

//     angular
//         .module('app')
//         .factory('orderItemFactory', orderItemFactory);

//     orderItemFactory.$inject = ['$http', 'apiUrl'];

//     /* @ngInject */
//     function orderItemFactory($http, apiUrl) {
//         var service = {
//             getAllOrders: getAllOrders,
//             getOrderById: getOrderById,
//             update: update,
//             create: create,
//             remove: remove
//         };

//         return service;

//         function getAllOrderItems() {
//             return $http
//                 .get(apiUrl + 'orderitem')
//                 .then(function(response) {
//                     return response.data;
//                 });
//         }

//         function getOrderById(id) {
//             return $http
//                 .get(apiUrl + 'orderitem/' + id)
//                 .then(function(response) {
//                     return response.data;
//                 });
//         }

//         function getOrdersByUserId(id) {
//             return $http
//                 .get(apiUrl + 'userorders/' + id)
//                 .then(function(response) {
//                     return response.data;
//                 });
//         }

//         function update(id, order) {
//             return $http.put(apiUrl + 'orderitem/' + id, order);
//         }

//         function create(order) {
//             return $http
//                 .post(apiUrl + 'orderitem', order)
//                 .then(function(response) {
//                     return response.data;
//                 });
//         }

//         function remove(id) {
//             return $http
//                 .delete(apiUrl + 'orderitem/' + id)
//                 .then(function(response) {
//                     return response.data;
//                 });
//         }
//     }
// })();