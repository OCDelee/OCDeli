(function() {
        'use strict';

        angular
            .module('app.menu')
            .controller('MenuController', MenuController);

        MenuController.$inject = ['menuFactory', 'itemService'];

        /* @ngInject */
        function MenuController(menuFactory, itemService) {
            var vm = this;

            vm.menu = [];
            vm.selectedItem = {};
            vm.itemTotal = 0;
            vm.orderItemTotal = 0;
            vm.itemQty = 1;
            vm.allIngredients = [];
            vm.cart = itemService.cart;
            vm.cartTotal = itemService.cartTotal;

            activate();

            function activate() {
                menuFactory
                    .getAllItems()
                    .then(function(data) {
                        vm.menu = data;
                    })
                    .catch(function(error) {
                        alert(error);
                    });

                
        
            }


            vm.getAllIngredients = function (){
                return menuFactory
                    .getAllIngredients()
                    .then(function(ingredients) {
                        vm.allIngredients = ingredients;
                });
            }


            vm.getItemDetails = function(id){
                vm.selectedItem = _.find(vm.menu, function(o){return o._id == id});
                vm.itemTotal = vm.selectedItem.price;

                vm.getAllIngredients();
            };

            vm.toggleIngredientCost = function (amt, e){
                if (e.target.checked){
                    vm.itemTotal = vm.itemTotal + amt;
                }
                else {
                    vm.itemTotal = vm.itemTotal - amt;
                }
            };

            vm.adjustQty = function(action){
                if(action == 'add'){
                    vm.itemQty++;
                }
                else if (action == 'sub'){
                    if(vm.itemQty > 1)
                        vm.itemQty--;
                }

            };


            vm.addToCart = function(i){
                var cartItem = {
                    item: i,
                    itemTotal: vm.itemTotal,
                    itemQty: vm.itemQty,
                    specialInstructions: vm.specialInstructions
                };
                vm.cart.push(cartItem);
                vm.cartTotal += cartItem.itemTotal * cartItem.itemQty;
            };

            // vm.calcTotal = function(){
            //     var total = 0;
            //     for (var i = 0; i < vm.itemQty; i++){
            //         total += vm.itemTotal * vm.itemQty;
            //     };
            //     vm.itemTotal = total;
            // }

            vm.toggleItemIngredients = function(ingredient, e){
                if(e.target.checked)
                {
                    vm.selectedItem.ingredients.push(ingredient);
                } else {
                    _.remove(vm.selectedItem.ingredients, function(o){return o._id == ingredient._id});
                }
            };

            vm.selectedIngredients = function (ingredientId) {
                for(var i = 0; i < vm.selectedItem.ingredients.length; i++) {
                    if (vm.selectedItem.ingredients[i]._id == ingredientId){
                        return true;
                    } 
                }
                return false;
            };
        }
})();
