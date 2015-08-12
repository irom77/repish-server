/**
 * Created by irekromaniuk on 8/10/2015.
 */
var app = angular.module("angularApp", [])
.controller("myConfigGenCtrl", function($scope, $http, customService) {
    $scope.wan={addr:'dhcp'};
    $scope.ssid= {guest: true};
    $scope.save  = function(data, filename) {
        data = $("#textarea").val();
        if ($scope.wan.addr != 'static') data = data.replace(/.*WAN ipv4-address.*/g, '');
        if ($scope.wan.addr != 'dhcp') data = data.replace(/.*WAN type dhcp.*/g, '');
        if ($scope.wan.addr != 'pppoe') data = data.replace(/.*WAN type pppoe.*/g, '');
        //if (!$scope.ssid.guest) data = data.replace(/.*#Guest.*+5d/g, '');
        data = data.replace(/\n/g, '\r\n');
        var blob = new Blob([data], {type: "text/plain;charset=utf-8"});
        filename = "autoconf.clish";
        saveAs(blob, filename);};
})
.service ('customService',function($http) {
    this.getData=function() {
        return $http.get('http://repish:3000/data/config1100.txt');
    }
});