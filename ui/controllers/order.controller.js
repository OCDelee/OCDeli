(function() {
    'use strict';

    angular
        .module('app.order')
        .controller('OrderController', OrderController);

    OrderController.$inject = ['orderFactory', 'itemService', 'auth'];

    /* @ngInject */
    function OrderController(orderFactory, itemService, auth) {
        var vm = this;

        vm.orderItems = itemService.cart;
        vm.orderTotal = getOrderTotal();
        vm.user = {};
        vm.tempOrder = {};
        vm.order = {};

        
        
        activate();

        function activate() {
            if (auth.isLoggedIn()) {
                console.log('Success: User is logged in.')
                vm.isLoggedIn = true;
                auth.getUser().then(function(data) {
                    vm.user = data.data;
                });
            } else {
                console.log('Failure: User is NOT logged in.');
                vm.isLoggedIn = false;
                vm.username = '';
                vm.user = {};
            }

            createOrderObject();
            //vm.order = updateOrderObject();
            
        };


        function getOrderTotal(){
            var total = 0;
            for(var i = 0; i < vm.orderItems.length; i++) {
                total += vm.orderItems[i].itemTotal * vm.orderItems[i].itemQty;
            }
            return total;
        };



        function createOrderObject() {
            var currentDate = new Date();
             vm.order = {
                username: vm.user.username,
                date: currentDate,
                number: currentDate.getTime(),
                total: vm.orderTotal,
                status: 'Confirmed',
                paid: true
            };

            return orderFactory
                .create(vm.order)
                .then(function(response){
                    vm.tempOrder = response.data;
                });
        };

        function updateOrderObject() {
            var order = {
                username: vm.tempOrder.username,
                date: vm.tempOrder.date,
                number: vm.tempOrder.number,
                total: vm.tempOrder.total,
                status: vm.tempOrder.status,
                paid: vm.tempOrder.paid,
                orderItems: vm.orderItems
            }
            return orderFactory
                .update(vm.tempOrder._id, order)
                .then(function(response) {
                    return response.data;
                });
        };


    }
})();
