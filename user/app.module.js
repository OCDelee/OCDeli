(function() {
    'use strict';

    angular
        .module('app', ['ui.router'
        ])

    .config(function($stateProvider, $urlRouterProvider) {

        $urlRouterProvider.otherwise(function($injector){
        var $state = $injector.get('$state');
        $state.go('landing');
    });

        $stateProvider
        .state('landing', {
            url: '/landing',
            templateUrl:'partials/landing.html',
            access: {restricted: false}
        })
        .state('login', {
            url: '/login',
            templateUrl: 'partials/login.html',
            controller: 'LoginController as loginCtrl',
            access: {restricted: false}
        })
        .state('logout', {
            controller: 'LogoutController as logoutCtrl',
            access: {restricted: false}
        })
        .state('register', {
            url: '/register',
            templateUrl: 'partials/register.html',
            controller: 'RegisterController as registerCtrl',
            access: {restricted: false}
        })
        $urlRouterProvider.otherwise('/');
    })

    .run(function($rootScope, $state, $location, authServiceFactory) {
        $rootScope.$on('$routeChangeStart',
        function (event, toState, toParams, fromState, fromParams) {
            authServiceFactory.getUserStatus()
            .then(function() {
                if(toState.access.restricted && authServiceFactory.isLoggedIn() === false) {
                    $location.path('/login');
                    $route.reload();
                }
            });

        });
    });

    
})();