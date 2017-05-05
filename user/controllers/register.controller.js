(function() {
    'use strict';

    angular
        .module('app')
        .controller('RegisterController', RegisterController)

    RegisterController.$inject = ['$location', 'authServiceFactory']

    /* @ngInject */

    function RegisterController($location, authServiceFactory) {
        var vm = this;

        vm.register = function() {

            // initial values
            vm.error = false;
            vm.disabled = true;

            // call register from service
            authServiceFactory.register(vm.registerForm.username, vm.registerForm.password)
                // handle success
                .then(function() {
                    $location.path('/login');
                    vm.disabled = false;
                    vm.registerForm = {};
                })
                // handle error
                .catch(function() {
                    vm.error = true;
                    vm.errorMessage = "Something went wrong!";
                    vm.registerForm = {};
                });
        };
    };
})();