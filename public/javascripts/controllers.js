/**
 * Created by IrekRomaniuk on 9/17/2015.
 */
angular.module('controllers', ['ngSanitize'])
    .controller("myConfigGenCtrl", function ($scope, $http, CounterSvc) {
        //$scope.wan = {addr: 'dhcp'}; //initialized in html
        $scope.ssid = {guest: 1};
        $scope.hostname = '';
        $scope.subnet = '';
        //InternalSSID/InternalPW and GuestSSID/GuestPW to be initialised
        //@@include('./configure/init.js', ( ENV==='production' ));
        $scope.save = function (data, filename) {
            data = $("#textarea").val();
            if ($scope.wan.addr != 'static') data = data.replace(/.*WAN type static.*/g, '');
            if ($scope.wan.addr != 'dhcp') data = data.replace(/.*WAN type dhcp.*/g, '');
            if ($scope.wan.addr != 'pppoe') data = data.replace(/.*WAN type pppoe.*/g, '');
            //see https://regex101.com/r/rO0yD8/13
            if ($scope.ssid.guest == 0) data = data.replace(/#Guest.*(?:\n.*){7}/g, '');
            data = data.replace(/\n/g, '\r\n');
            var blob = new Blob([data], {type: "text/plain;charset=utf-8"});
            filename = "autoconf.clish"; //.replace("\u00EF\u00BB\u00BF", "");
            saveAs(blob, filename, true);
            $scope.Counter('save');
        };
        $scope.popover = {
            title: 'Hostname Naming Convention',
            content: 'TYPE OF OFFICE (3 Char): ADV or CFN ' +
            'LOCATION (1 Char): O=Office, V=Vacation, P=Partner, H=Home ' +
            'STATE (2 Char): ' +
            'OFFICE NAME (8 Char MAX) ' +
            'LAST TWO OCTETs OF SUBNET  (6 Digits - fill the open numbers of the 2nd and 3rd octets with 0s)' +
            ' i.e. ADVOMAKEVTESTE192007 (not ADVOMAKEVTESTE192-7)'
        };
        $scope.Counter = function (name) {
            CounterSvc.incCounter(name).success(function (response) {
                console.log(response);
            })
        };
    })
    .controller('appCtrl', function ($scope, $location, authSvc) {
        $scope.pageClass = function (path) {
            return (path == $location.path()) ? 'active' : '';
        };
        $scope.$on('loggedin', function (event, data) {
            $scope.isAuthenticated = data;
            console.log('loggedin', data)
        });
        $scope.logout = function () {
            $scope.welcome = '';
            $scope.isAuthenticated = false;
            $scope.$emit('loggedin', false);
            authSvc.logout();
        };
    })
    .controller('managerCtrl', function ($scope, apiSvc, $sanitize) {
        $scope.gateway = {
            SDREPVPN: 'SD-REPVPN',
            WALREPVPN: 'WAL-REPVPN',
            MALREPVPN: 'MAL-REPVPN'
        };
        $scope.COSelected = function () {
            for (var gw in $scope.gateway) {
                if ($scope.gateway[gw]) return true;
            }
            return false;
        };
        $scope.updategateways = function () {
            $scope.responseCO = 'Only one click allowed. Updating ... ';
            for (var gw in $scope.gateway) {
                if ($scope.gateway[gw]) {
                    //console.log($scope.gateway[gw]);
                    apiSvc.post('/api/updategateways/' + $scope.gateway[gw]).success(function (response) {
                        $scope.responseCO += '<br>' + response;
                    })
                        .error(function (response) {
                            $scope.responseCO = "NO RESPONSE";
                        }
                    );
                }
                //else $scope.responseCO = "NO GATEWAYS SELECTED";
            }
        };
        $scope.addrobo = function () {
            var ROBO = { host: $scope.hostname,
                subnet: $scope.subnet };
            //console.log(ROBO);
            $scope.responseAddROBO = 'Adding ROBO ' + $scope.hostname + ' with subnet ' + $scope.subnet + '0<br>';
            apiSvc.post('/api/addrobo/', ROBO).then(
                function (response) {
                $scope.responseAddROBO += response.data;
            },
                function (response) {
                    $scope.responseAddROBO = "NO RESPONSE";
                }
            );
            $scope.hostname = '';
            $scope.subnet = '';
        };
        $scope.cert = "VPN";
        $scope.resetcert = function () {
            $scope.responseResetROBO = 'Reset ' + $scope.cert + ' in progress ... ';
                    //console.log($scope.hostname, $scope.cert);
                    apiSvc.post('/api/repcertifcates/' + $scope.hostname + ' ' + $scope.cert)
                        .success(function (response) {
                        $scope.responseResetROBO += '<br>' + response;
                    })
                        .error(function (response) {
                            $scope.responseResetROBO = "NO RESPONSE";
                        }
                    );
        }
    })
    .controller('authCtrl', function ($scope, $window, authSvc, $state) {
        $scope.user = {username: '', password: ''};
        $scope.isAuthenticated = false;
        $scope.welcome = '';
        $scope.error = '';

        $scope.submit = function () {
            authSvc.login($scope.user).success(function (data, status, headers, config) {
                $scope.error = '';
                var date = new Date();
                $window.sessionStorage.token = data.token;
                //console.log($window.sessionStorage.token);
                $window.localStorage['repish'] = data.token;
                $scope.isAuthenticated = true;
                var profile = authSvc.get();
                $scope.welcome = 'Welcome ' + profile.user + '/' + profile.group;
                $scope.$emit('loggedin', true);
                $state.go('manage'); //$state.go($state.previous);
            }).error(function (data, status, headers, config) {
                delete $window.sessionStorage.token;
                $scope.isAuthenticated = false;
                console.log('Error: ' + status);
                // Handle login errors here
                if (status == 401) {
                    $scope.error = 'Error: ' + status + ', Not Authorized';
                }
                else
                    $scope.error = 'Error: ' + status + ', Invalid user or password';
                $scope.welcome = '';

            });
        };

    });