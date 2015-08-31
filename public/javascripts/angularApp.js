/**
 * Created by irekromaniuk on 8/10/2015.
 */
var app = angular.module("angularApp", ['mgcrea.ngStrap'])
    .config(['$httpProvider', function($httpProvider) {
        $httpProvider.defaults.useXDomain = true;
        delete $httpProvider.defaults.headers.common['X-Requested-With'];
    }
    ])
    .controller("myConfigGenCtrl", function ($scope, $http, counting) {
        //$scope.wan = {addr: 'dhcp'}; //initialized in html
        $scope.ssid = {guest: 1};
        $scope.hostname = '';
        $scope.subnet = '';
        //InternalSSID/InternalPW and GuestSSID/GuestPW to be initialised
        $scope.save = function (data, filename) {
            data = $("#textarea").val();
            if ($scope.wan.addr != 'static') data = data.replace(/.*WAN ipv4-address.*/g, '');
            if ($scope.wan.addr != 'dhcp') data = data.replace(/.*WAN type dhcp.*/g, '');
            if ($scope.wan.addr != 'pppoe') data = data.replace(/.*WAN type pppoe.*/g, '');
            //https://regex101.com/r/rO0yD8/13
            if ($scope.ssid.guest == 0) data = data.replace(/#Guest.*(?:\n.*){7}/g, '');
            data = data.replace(/\n/g, '\r\n');
            var blob = new Blob([data], {type: "text/plain;charset=utf-8"});
            filename = "autoconf.clish";
            saveAs(blob, filename);
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
            counting.incCounter(name).success(function (response) {
                console.log(response);
            })
        };
    })
.service('counting', function ($http) {
        this.incCounter = function (name) {
            return $http.put('http://repish:3001/api/counter/'+ name);
        };
        this.getCounter = function (name) {
            return $http.get('http://repish:3001/api/counter/'+ name);
        }
    });
