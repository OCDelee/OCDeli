(function() {
    'use strict';

    angular
        .module('app.checkout')
        .controller('CheckoutController', CheckoutController);

    CheckoutController.$inject = ['itemService'];

    /* @ngInject */
    function CheckoutController(itemService) {
        var vm = this;

        vm.cart = itemService.cart;
        vm.cartTotal = getCartTotal();

        vm.loginOrRegisterShown = false;
        vm.loginShown = false;
        vm.registerShown = false;
        
        activate();

        function activate() {
            vm.loginOrRegisterShown = true;
        }

        vm.showRegister = function(){
            vm.registerShown = true;
            vm.loginOrRegisterShown = false;
            vm.loginShown = false;
        };

        vm.showLogin = function(){
            vm.registerShown = false;
            vm.loginOrRegisterShown = false;
            vm.loginShown = true;
        };

        function getCartTotal(){
            var total = 0;
            for(var i = 0; i < vm.cart.length; i++) {
                total += vm.cart[i].itemTotal * vm.cart[i].itemQty;
            }
            return total;
        };


    }
})();
