angular
    .module('userFactory', [])
    .factory('user', function($http){

        userFactory = {};

        
        userFactory.create = function(regData) {
                return $http
                    .post('/api/user', regData)
        }

        return userFactory;

    });
