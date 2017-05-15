(function() {
        'use strict';

        angular
            .module('app.menu')
            .controller('MenuController', MenuController);

        MenuController.$inject = ['menuFactory'];

        /* @ngInject */
        function MenuController(menuFactory) {
            var vm = this;

            vm.menu = {};
            vm.itemIngredients = {};
            vm.orderItemTotal = orderItemTotal;
            vm.allIngredients = [];
            vm.additionalIngredients = [];
            // vm.ingredientAdded = false;
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
                
              getAllIngredients()
              getAdditionalIngredients(vm.allIngredients, vm.itemIngredients.ingredients);
            }



            function getItemIngredientsByItemId(id) {
                return menuFactory
                .getItemIngredientsByItemId(id)
                .then(function(itemIngredient) {
                   vm.itemIngredients = itemIngredient;
                });
            }

            function getAllIngredients() {
                return menuFactory
                .getAllIngredients()
                .then(function(ingredients) {
                   vm.allIngredients = ingredients;
                });
            }

            function orderItemTotal() {
                if(!vm.itemIngredients.item) {
                    return 0;
                }
                

                var startPrice = vm.itemIngredients.item.price;
                
                var checkedIngredients = vm.itemIngredients.ingredients.filter(i => i.added);
                var costOfCheckedIngredients = checkedIngredients.reduce((acc, ingredient) => acc + parseFloat(ingredient.total), 0);
                var totalCost = startPrice + costOfCheckedIngredients;

                return totalCost;
            }

            // vm.getAllIngredients = function(){
            //   menuFactory
            //     .getAllIngredients()
            //     .then(function(ingredients) {
            //       vm.allIngredients = ingredients;
            //     })
            // }

            function getAdditionalIngredients() {
                var itemIngredientsIds = _.map(vm.itemIngredients.ingredients, '_id');
                var allIngredientIds = _.map(vm.allIngredients, '_id');
                vm.additionalIngredients = _.difference(allIngredientIds, itemIngredientsIds);
            } 

            vm.getItemDetails = function(id){

                getItemIngredientsByItemId(id)
                    .then(getAllIngredients)
                    .then(getAdditionalIngredients)
                    .catch(function(err) {
                        console.log(err);
                    });
            };
        }
})();
