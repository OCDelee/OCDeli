(function() {
    'use strict';

    angular
        .module('app', [
          'ui.router',
          'app.main',
          'app.menu',
          'app.checkout',
          'app.reg',
          'app.service',
          'app.order'

          // 'stripe-checkout',
          // 'app.purchase'

        ])
        .value('apiUrl', 'http://localhost:3000/api/')
        .config(function($stateProvider, $urlRouterProvider, $httpProvider) {
          $urlRouterProvider.otherwise('/landing');
          $httpProvider.interceptors.push('authInterceptors');
          //  StripeCheckoutProvider.defaults({
          //       key: 'pk_test_L6fEVgzAFeoFv1Yy3kGtFwv3'
          //   })


          $stateProvider
            .state('landing', {
              url: '/landing',
              controller: 'MenuController as menuCtrl',
              templateUrl: './views/menu.html'
            })
            .state('checkout', {
              url: '/checkout',
              controller: 'CheckoutController as checkoutCtrl',
              templateUrl: './views/checkout.html'
            })
            .state('register', {
              url:'/register',
              controller: 'RegisterController as regCtrl',
              templateUrl: './views/users/register.html',
              // authenticated: false
            })
            .state('authenticate', {
              url:'/authenticate',
              templateUrl: './views/users/login.html',
              // authenticated: false
            })
            .state('logout', {
              templateUrl: './views/users/logout.html',
              // authenticated: true
            })
            .state('profile', {
              url: '/profile',
              templateUrl: './views/users/profile.html'
              // authenticated: true
            })
            .state('order', {
              url: '/order',
              controller: 'OrderController as orderCtrl',
              templateUrl: './views/order.html'
            })

        })

        //   .run(function($log, StripeCheckout) {
        //     StripeCheckout.defaults({
        //       opened: function() {
        //         $log.debug("Stripe Checkout opened");
        //       },
        //       closed: function() {
        //         $log.debug("Stripe Checkout closed");
        //       }
        //     });
        // });

      //   .run(function($rootScope, auth, $location) {
      //       $rootScope.$on('$stateChangeStart', function(event, next, current){
      //         if (next.$$route.authenticated == true) {
      //           if (!auth.isLoggedIn()) {
      //               event.preventDefault();
      //               $location.path('/landing');
      //           }
      //         } else if (next.$$route.authenticated == false) {
      //           if (auth.isLoggedIn()) {
      //             event.preventDefault();
      //             $location.path('/profile')
      //           }
      //           console.log('should not be authenticated')
      //         } 
      //   })
      // })
})();
