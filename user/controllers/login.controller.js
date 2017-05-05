(function() {
    'use strict';

    angular
        .module('app')
        .controller('LoginController', LoginController)

    LoginController.$inject = ['$location', 'authServiceFactory'];

    /* @ngInject */

    function LoginController($location, authServiceFactory) {
        var vm = this;

        vm.login = function () {

            // inital values
            vm.error = false;
            vm.disabled = true;

            // call login from service
            authServiceFactory.login(vm.loginForm.username, vm.loginForm.password)
                // handle success
                .then(function () {
                    $location.path('/');
                    vm.disabled = false;
                    vm.loginForm = {};
                })
                // handle error
                .catch(function() {
                    vm.error = true;
                    vm.errorMessage = "Invalid email and/or password";
                    vm.disabled = false;
                    vm.loginForm = {};
                });
        };
    };
})();