/**
 * Created by irekromaniuk on 8/10/2015.
 */
var app = angular.module("angularApp", [])
.controller("myConfigGenCtrl", function($scope, $http, customService) {
    $scope.wan={addr:'dhcp'};
    $scope.ssid= {guest: 1};
    $scope.save  = function(data, filename) {
        data = $("#textarea").val();
        if ($scope.wan.addr != 'static') data = data.replace(/.*WAN ipv4-address.*/g, '');
        if ($scope.wan.addr != 'dhcp') data = data.replace(/.*WAN type dhcp.*/g, '');
        if ($scope.wan.addr != 'pppoe') data = data.replace(/.*WAN type pppoe.*/g, '');
        //https://regex101.com/r/rO0yD8/13
        if ($scope.ssid.guest==0) data = data.replace(/#Guest.*(?:\n.*){7}/g,'');
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