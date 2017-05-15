(function() {
    'use strict';

    angular
        .module('app', [
          'ui.router',
          'app.menu'
          // 'angular-stripe',
          // 'credit-cards'

        ])
        .value('apiUrl', 'http://localhost:3000/api/')
        .config(function($stateProvider, $urlRouterProvider) {
          $urlRouterProvider.otherwise('/landing');
          // stripeProvider.setPublishableKey('pk_test_L6fEVgzAFeoFv1Yy3kGtFwv3');

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
            // .state('admin', {
            //   url: '/admin',
            //   templateUrl: '../admin/dist/index.html'
            // })
            // .state('sales', {
            //   url: '/sales',
            //   abstract: true,
            //   template: '<div ui-view></div>'
            // })
            // .state('sales.grid', {
            //   url: '/grid',
            //   controller: 'SalesGridController as salesGridCtrl',
            //   templateUrl: 'app/sales/sales.grid.html'
            // })
            // .state('sales.detail', {
            //   url: '/detail/:id',
            //   controller: 'SalesDetailController as salesDetailCtrl',
            //   templateUrl: 'app/sales/sales.detail.html'
            // })
            // .state('vehicles', {
            //   url: '/vehicles',
            //   abstract: true,
            //   template: '<div ui-view></div>'
            // })
            // .state('vehicles.grid', {
            //   url: '/grid',
            //   controller: 'VehiclesGridController as vehiclesGridCtrl',
            //   templateUrl: 'app/vehicles/vehicles.grid.html'
            // })
            // .state('vehicles.detail', {
            //   url: '/detail/:id',
            //   controller: 'VehiclesDetailController as vehiclesDetailCtrl',
            //   templateUrl: 'app/vehicles/vehicles.detail.html'
            // });

        });
})();
