(function() {
    'use strict';

    angular
        .module('app')
        .factory('menuFactory', menuFactory);

    menuFactory.$inject = ['$http', 'apiUrl'];

    /* @ngInject */
    function menuFactory($http, apiUrl) {
        var service = {
            getAllItems: getAllItems,
            getItemIngredientsByItemId: getItemIngredientsByItemId,
            getAllIngredients: getAllIngredients,
            // create: create,
            // remove: remove
        };

        return service;

        function getAllItems() {
            return $http
                .get(apiUrl + 'item')
                .then(function(response) {
                    return response.data;
                });
        }

        function getAllIngredients() {
            return $http
                .get(apiUrl + 'ingredient')
                .then(function(response) {
                    return response.data;
                });
        }

        function getItemIngredientsByItemId(id) {
            return $http
                .get(apiUrl + 'itemingredient/')
                .then(function(response) {
                    for (var i in response.data) {
                        if (response.data[i].item._id == id) {
                            return response.data[i];
                        }
                    }
                });
        }
        //
        // function update(id, item) {
        //     return $http.put(apiUrl + 'item/' + id, item);
        // }
        //
        // function create(item) {
        //     return $http
        //         .post(apiUrl + 'item', item)
        //         .then(function(response) {
        //             return response.data;
        //         });
        // }
        //
        // function remove(id) {
        //     return $http
        //         .delete(apiUrl + 'item/' + id)
        //         .then(function(response) {
        //             return response.data;
        //         });
        // }
    }
})();
