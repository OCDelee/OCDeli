// (function(){
//     'use strict';

//     angular
//         .module('app.purchase')
//         .controller('PurchaseController', PurchaseController)

//     PurchaseController.$inject = ['productFactory', 'orderFactory', 'StripeCheckout', 'SweetAlert'];

//     function PurchaseController(productFactory, orderFactory, StripeCheckout, SweetAlert) {
//         var vm = this;

//         vm.buy = buy;

//         var handler = StripeCheckout.configure({
//             name: "Acme Store"
//         });

//         activate();

//         ///////////

//         function buy(product) {
//             var options = {
//               description: product.name,
//               amount: product.retailPrice * 100
//             };

//             handler.open(options)
//               .then(function(result) {
//                 var stripeToken = result[0].id;

//                 orderFactory
//                     .create(product, stripeToken)
//                     .then(function() {
//                         SweetAlert.swal("Purchase complete!", "The product is on it's way", "success")
//                     });
//               });
//         }

//         function activate() {
//             productFactory
//                 .getAll()
//                 .then(function(products) {
//                     vm.products = products;
//                 });
//         }
//     }
// })();