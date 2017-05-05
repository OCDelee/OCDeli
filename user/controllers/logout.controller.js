(function() {
    'use strict';

    angular
        .module('app')
        .controller('LogoutController', LogoutController)

    LogoutController.$inject = ['$location', 'authServiceFactory'];

    function LogoutController($location, authServiceFactory) {
        var vm = this;

        vm.logout = function() {

            // call logout from service
            authServiceFactory.logout()
                .then(function() {
                    $location.path('/login');
                });
        };
    };
})();