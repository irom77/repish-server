/**
 * Created by IrekRomaniuk on 9/17/2015.
 */
angular.module('services', ['angular-jwt'])
    .service('CounterSvc', function ($http) {
        this.incCounter = function (name) {
            return $http.post('https://repish:3443/api/counter/' + name);
        };
        this.getCounter = function (name) {
            return $http.get('https://repish:3443/api/counter/' + name);
        }
    })
    .factory('authSvc', function ($http, jwtHelper, $window, $state) {
        var profile = {
            user: '',
            group: ''
        };
        return {
            login: function (user) {
                return $http.post('/authenticate', user, {timeout: 2000}); //2sec required over VPN
                //, headers: {'Content-Type': 'application/x-www-form-urlencoded'} }
            },
            get: function () {
                var date = new Date();
                var token = $window.localStorage['repish'];
                if (token) {
                    var tokenPayload = jwtHelper.decodeToken(token);
                    //console.log($filter('date')(date, "yyyy-MM-dd HH:mm:ss Z"));
                    //console.log($filter('date')(tokenPayload.exp * 1000, "yyyy-MM-dd HH:mm:ss Z"));
                    console.log('user: ' + tokenPayload.user + ' group: ' + tokenPayload.group);
                    console.log('token expires in ' + Math.ceil(((tokenPayload.exp * 1000) - date) / 60000) + ' min ');
                    profile.user = tokenPayload.user;
                    profile.group = tokenPayload.group;
                    profile.exp = Math.ceil(((tokenPayload.exp * 1000) - date) / 60000);
                }
                else profile = {user:'',group:'',exp:-1};
                return profile
            },
            logout : function () {
                delete $window.sessionStorage.token;
                //$window.localStorage['repish'].exp = -1;
                delete $window.localStorage['repish'];
                //$scope.$emit('loggedin', false);
                $state.go('login'); //$state.go($state.previous);
            }
        }
    })
    .factory('authInterceptor', function ($rootScope, $q, $window) {
        return {
            request: function (config) {
                config.headers = config.headers || {};
                if ($window.sessionStorage.token) {
                    config.headers.Authorization = 'Bearer ' + $window.sessionStorage.token;
                }
                //console.log(config.headers.Authorization);
                return config;
            },
            responseError: function (rejection) {
                if (rejection.status === 401) {
                    // handle the case where the user is not authenticated
                    console.log('responseError');
                }
                return $q.reject(rejection);
            }
        };
    })
    .factory("apiSvc", function($http) {
        return {
            post: function(url,data) {
                return $http.post(url,data)/*.success(function(response) {
                    return response
                });*/
            }
        }
    });
