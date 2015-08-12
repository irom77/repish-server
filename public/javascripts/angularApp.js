/**
 * Created by irekromaniuk on 8/10/2015.
 */
var app = angular.module("angularApp", [])
.controller("myConfigGenCtrl", function($scope, $http, customService) {
    //customService.getData().then(function(response) {
    //console.log(response.data);
    //   $scope.myTextArea = response.data;
    //});
    $scope.save  = function(data, filename) {
        data = $("#textarea").val().replace(/\n/g, '\r\n');
        var blob = new Blob([data], {type: "text/plain;charset=utf-8"});
        filename = "autoconf.clish";
        //console.log(data);
        saveAs(blob, filename);};
})
.service ('customService',function($http) {
    this.getData=function() {
        return $http.get('http://repish:3000/data/config1100.txt');
    }
});