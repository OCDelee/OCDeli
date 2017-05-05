(function() {
    'use strict';

    angular
        .module('app', ['ngRoute'
        ])

    .config(function($routeProvider) {
        $routeProvider
        .when('/', {
            templateUrl:'partials/landing.html',
            access: {restricted: false}
        })
        .when('/login', {
            templateUrl: 'partials/login.html',
            controller: 'LoginController as loginCtrl',
            access: {restricted: false}
        })
        .when('/logout', {
            controller: 'LogoutController as logoutCtrl',
            access: {restricted: true}
        })
        .when('/register', {
            templateUrl: 'partials/register.html',
            controller: 'RegisterController as registerCtrl',
            access: {restricted: false}
        })
        .otherwise({
            redirectTo: '/'
        });
    })

    .run(function($rootScope, $location, $route, authServiceFactory) {
        $rootScope.$on('$routeChangeStart',
        function (event, next, current) {
            authServiceFactory.getUserStatus()
            .then(function() {
                if(next.access.restricted && authServiceFactory.isLoggedIn() === false) {
                    $location.path('/login');
                    $route.reload();
                }
            });

        });
    });

    
})();