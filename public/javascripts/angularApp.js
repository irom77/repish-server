/**
 * Created by irekromaniuk on 8/10/2015.
 */
var app = angular.module("angularApp", ['mgcrea.ngStrap'])
    .config(['$httpProvider', function($httpProvider) {
        $httpProvider.defaults.useXDomain = true;
        delete $httpProvider.defaults.headers.common['X-Requested-With'];
    }
    ])
    .controller("myConfigGenCtrl", function ($scope, $http, passwdMe) {
        //$scope.wan = {addr: 'dhcp'}; //initialized in html
        $scope.ssid = {guest: 1};
        $scope.hostname = '';
        $scope.subnet = '';
        //InternalSSID/InternalPW and GuestSSID/GuestPW to be initialised
        //$scope.countsave = 0; // not used
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
            $scope.countsave++
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
        $scope.getpass = function () { //unused
            passwdMe.getData().success(function (response) {
                console.log(response);
                $scope.InternalPW = response;
            })
        };
        $scope.addprefix = function () { //unused
            if ($scope.hostname) {
                $scope.InternalPW = '1nt3rn@l**';
                var match = /(?:\S){6}([^\d]*)/.exec($scope.hostname); //match char 6+ until first digit
                $scope.InternalPW = match[1] + $scope.InternalPW;
            }
        };
    })
    .service('passwdMe', function ($http) { //unused
    this.getData = function () {
        return $http.get('https://passwd.me/api/1.0/get_password.txt?type=random&length=6&charset=LOWERCASEALPHANUMERIC');
    }
});