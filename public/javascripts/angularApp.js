/**
 * Created by irekromaniuk on 8/10/2015.
 */
angular.module("angularApp", ['mgcrea.ngStrap', 'ui.router', 'services', 'controllers','directives'])
    .config(['$stateProvider', '$urlRouterProvider', '$httpProvider',
        function ($stateProvider, $urlRouterProvider, $httpProvider) {
            $httpProvider.interceptors.push('authInterceptor');
            $httpProvider.defaults.useXDomain = true;
            $httpProvider.defaults.withCredentials = true;
            delete $httpProvider.defaults.headers.common['X-Requested-With'];
            $urlRouterProvider.otherwise('/config');
            $stateProvider
                .state('config', {
                    url: '/config',
                    controller: 'myConfigGenCtrl',
                    templateUrl: 'partials/partial-config.html',
                    authenticate: false
                })
                .state('manage', {
                    url: '/manage',
                    controller: 'managerCtrl',
                    templateUrl: 'partials/partial-manage.html',
                    authenticate: true
                })
                .state('login', {
                    url: '/login',
                    controller: 'authCtrl',
                    templateUrl: 'partials/partial-login.html',
                    authenticate: false
                })
        }
    ])
    .run(function($rootScope, $state, authSvc) {
        $rootScope.$on("$stateChangeStart", function(event, toState, toParams, fromState, fromParams){
            if (toState.authenticate && authSvc.get().exp<0){ //
                // User isn’t authenticated
                //console.log('Redirected ', authSvc.get().exp);
                $state.transitionTo('login');
                event.preventDefault();
            }
        });
        $rootScope.$on('$stateChangeSuccess', function (event, toState, toParams, fromState) {
            $state.previous = fromState;
            $state.next = toState;
        });
    });
