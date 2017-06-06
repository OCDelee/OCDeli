angular.module('app.reg', ['userFactory'])

    .controller('RegisterController', function($http, $location, $timeout, user) {

        var vm = this;


        vm.regUser= function(regData) {
            vm.loading = true;
            vm.errorMsg = false;

            user.create(vm.regData)
                .then(function(data) {
                    if(data.data.success) {
                        vm.loading = false;
                        vm.successMessage = data.data.message + '...redirecting';
                        $timeout(function() {
                            $location.path('/landing');
                        }, 2000)
                    } else {
                        vm.loading = false;
                        vm.errorMsg = data.data.message;
                    }
                });


        };
    });