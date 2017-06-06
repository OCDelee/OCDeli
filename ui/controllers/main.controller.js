
angular

    .module('app.main', ['authServices', 'userFactory'])
    .controller('MainController',  function(auth, user, $timeout, $location, $rootScope) {

        var vm = this;

        vm.loadme = false;

        // vm.loginData = {username: '', password: ''};

        //vm.cart = itemService.cart;


            if (auth.isLoggedIn()) {
                console.log('Success: User is logged in.')
                vm.isLoggedIn = true;
                auth.getUser().then(function(data) {
                    vm.userName = data.data.username;
                    vm.userEmail = data.data.email;
                    vm.loadme = true;
            });
        } else {
            console.log('Failure: User is NOT logged in.');
            vm.isLoggedIn = false;
            vm.username = '';
            vm.loadme = true;
        }




        vm.doLogin= function() {
            vm.loading = true;
            vm.errorMsg = false;

            auth.login(vm.loginData)
                .then(function(data) {
                    if(data.data.success) {
                        vm.loading = false;
                        vm.successMessage = data.data.message + '...redirecting';
                        $timeout(function() {
                            $location.path('/landing');
                            vm.loginData = '';
                            vm.successMessage = false;
                        }, 2000)
                    } else {
                        vm.loading = false;
                        vm.errorMsg = data.data.message;
                    }
                });


        };

        vm.logout = function() {
            auth.logout();
            $location.path('/logout')
            $timeout(function() {
                $location.path('/')
            }, 2000);

        };


    });

