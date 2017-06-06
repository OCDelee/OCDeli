(function() {
    'use strict';

    angular
        .module('app.service', [])
        .service('itemService', itemService);

    function itemService() {
        var iS = this;

        iS.cart = [];
        iS.cartTotal = 0;



    }
})();
