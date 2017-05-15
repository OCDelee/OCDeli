(function() {
    'use strict';

    angular
        .module('app')
        .controller('PaymentController', PaymentController);

    PaymentController.$inject = ['$http', 'stripe'];

    /* @ngInject */
    function PaymentController($http, stripe) {
        var vm = this;

        vm.charge = function () {
          return stripe.card.createToken(vm.payment.card)
            .then(function (response) {
              console.log('token created for card ending in ', response.card.last4);
              var payment = angular.copy(vm.payment);
              payment.card = void 0;
              payment.token = response.id;
              return $http.post('https://localhost:8080/payments', payment);
            })
            .then(function (payment) {
              console.log('successfully submitted payment for $', payment.amount);
            })
            .catch(function (err) {
              if (err.type && /^Stripe/.test(err.type)) {
                console.log('Stripe error: ', err.message);
              }
              else {
                console.log('Other error occured, possible with your API', err.message);
              }
            });
        };
    };
})();
