angular
    .module('authServices', ['userFactory'])
    .factory('auth', function($http, authToken){

        var authFactory = {};

        
        authFactory.login = function(loginData) {
                return $http
                    .post('/api/user/authenticate', loginData)
                    .then(function(data) {
                        authToken.setToken(data.data.token);
                        return data;
                    });
        };


        
        authFactory.isLoggedIn = function() {
            if (authToken.getToken()) {
                return true;
            } else {
                return false;
            }
        }

        authFactory.getUser = function() {
            if (authToken.getToken()) {
                return $http.post('/api/user/me');
            } else {
                $q.reject({ message: 'User has no token' })
            }
        };
        
        authFactory.getCurrentUser = function(req, res) {
            user.findOne({token: req.token}, function(err, user) {
                
            })
        };

        authFactory.logout = function() {
            authToken.setToken();
        }

        return authFactory;

    })

        .factory('authToken', function($window) {
            var authTokenFactory = {};

            
            authTokenFactory.setToken = function(token) {
                if (token) {
                    $window.localStorage.setItem('token', token)
                } else {
                    $window.localStorage.removeItem('token')
                }
                
            }

            authTokenFactory.getToken = function() {
                return $window.localStorage.getItem('token');
            }

            return authTokenFactory;
        })

        .factory('authInterceptors', function (authToken){
            var authInterceptorsFactory = {};

            authInterceptorsFactory.request = function (config) {
                var token = authToken.getToken();

                if (token) config.headers['x-access-token'] = token;

                return config;
            };

            return authInterceptorsFactory;
        });