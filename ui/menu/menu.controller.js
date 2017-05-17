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
            vm.orderItemTotal = 0;
            vm.allIngredients = [];
            vm.additionalIngredients = [];
            vm.checkedIngredients = [];
            vm.initialIngredientChecked = false;

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
            }



            function getItemIngredientsByItemId(id) {
                return menuFactory
                .getItemIngredientsByItemId(id)
                .then(function(itemIngredient) {
                   vm.itemIngredients = itemIngredient;
                   vm.orderItemTotal = vm.itemIngredients.item.price;
                });
            }

            function getAllIngredients() {
                return menuFactory
                .getAllIngredients()
                .then(function(ingredients) {
                   vm.allIngredients = ingredients;
                });
            }

            // function orderItemTotal() {
            //     if(!vm.itemIngredients.item) {
            //         return 0;
            //     }
                

            //     var startPrice = vm.itemIngredients.item.price;
                
            //     var checkedIngredients = vm.itemIngredients.ingredients.filter(i => i.added);
            //     var costOfCheckedIngredients = checkedIngredients.reduce((acc, ingredient) => acc + parseFloat(ingredient.total), 0);
            //     var totalCost = startPrice + costOfCheckedIngredients;

            //     return totalCost;
            // }

            // vm.getAllIngredients = function(){
            //   menuFactory
            //     .getAllIngredients()
            //     .then(function(ingredients) {
            //       vm.allIngredients = ingredients;
            //     })
            // }

            // function getAdditionalIngredients() {
            //     var ing = {};
            //     var itemIngredientsIds = _.map(vm.itemIngredients.ingredients, '_id');
            //     for (var i = 0; i < itemIngredientsIds.length; i++){
            //         ing = _.find
            //     }
            //     vm.additionalIngredients = _.difference(allIngredientIds, itemIngredientsIds);
            // }; 

            vm.getItemDetails = function(id){
                var x = function() {
                    getItemIngredientsByItemId(id);
                    getAllIngredients();
                var itemIngredientsIds = _.map(vm.itemIngredients.ingredients, '_id');
                var allIngredientIds = _.map(vm.allIngredients, '_id');
                vm.additionalIngredients = _.difference(allIngredientIds, itemIngredientsIds);
                };
                x();
            };

            // vm.getAdditionalIngredients = function() {
            //         var itemIngredientsIds = _.map(vm.itemIngredients.ingredients, '_id');
            //         // for (var i = 0; i < vm.allIngredients.length; i++) {
            //         //     for (var j = 0; j < itemIngredientsIds.length; j++) {
            //         //         if (vm.allIngredients[i]._id != itemIngredientsIds[j]) {
            //         //             vm.additionalIngredients.push(vm.allIngredients[i])
            //         //         }
            //         //     }
            //         // }
            //         for(var i = 0; i < itemIngredientsIds.length; i++){
            //             var tempArray = _.filter(vm.allIngredients, !_matchesProperty('_id', itemIngredientsIds[i]));
            //             vm.additionalIngredients = _.union(tempArray);
            //         }
            // }

            vm.itemIngredientsChecked = function (ingredientId) {
                for(var i = 0; i < vm.itemIngredients.ingredients.length; i++) {
                    if (vm.itemIngredients.ingredients[i]._id == ingredientId){
                        return true;
                    } 
                }
                return false;
            };
        }
})();
