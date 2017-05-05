(function() {
    'use strict';

    angular
        .module('app')
        .factory('authServiceFactory', authServiceFactory);

    authServiceFactory.$inject = ['$q', '$timeout', '$http'];

    /* @ngInject */

    function authServiceFactory($q, $timeout, $http) {

        // create user variable
        var user = null;

        // return available functions for use in the controllers

        var service = {
            isLoggedIn: isLoggedIn,
            getUserStatus: getUserStatus,
            login: login,
            logout: logout,
            register: register

        };


        return service;

        // returns true if user = true

        function isLoggedIn() {
            if(user) {
                return true;
            }
            else {
                return false;
            }
        }

        function getUserStatus() {
            return $http
            .get('http://localhost:3000/user/status')
            // handle success
            .success(function(data) {
                if(data.status){
                    user = true;
                }
                else {
                    user = false;
                }
            })
            // handle error
            .error(function(data) {
                user = false;
            });
        }

        function login(username, password) {

            // create instance of deferred
            var deferred = $q.defer();

            // send post request to server
            $http
                .post('http://localhost:3000/user/login', 
                    {username: username, password: password})
                // handle success
                .success(function (data, status) {
                    if(status === 200 && data.status) {
                        user = true;
                        deferred.resolve();
                    }
                    else {
                        user = false;
                        deferred.reject();
                    }
                })
                // handle error
                .error(function (data) {
                    user = false;
                    deferred.reject();
                });
            
            // return promise object
            return deferred.promise;
        }

        function logout() {

            
            var deferred = $q.defer();

            //send a get request to the server
            $http
                .get('http://localhost:3000/user/logout')
                .success(function (data) {
                    user = false;
                    deferred.resolve();
                })
                .error(function (data) {
                    user = false;
                    deferred.reject();
                });
            
            return deferred.promise;
        }

        function register(username, password) {

            var deferred = $q.defer();

            // send a post request to the server
            $http
                .post('http://localhost:3000/user/register',
                    {username: username, password: password})
                .success(function (data, status) {
                    if(status === 200 && data.status) {
                        deferred.resolve();
                    }
                    else {
                        deferred.reject();
                    }
                })
                .error(function (data) {
                    deferred.reject();
                });
            return deferred.promise;
        }

    };
})();