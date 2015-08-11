/**
 * Created by irekromaniuk on 8/10/2015.
 */
var app = angular.module("angularApp", [])
.controller("myConfigGenCtrl", function($scope, $http, customService) {
    //$http.get('data/config1100.txt').success (function(data){
    //    $scope.myTextArea = data;
    //});
    customService.getData().then(function(response) {
        $scope.myTextArea = response.data;
    });
    $scope.save  = function(data, filename) {
        data = $("#textarea").val().replace(/\n/g, '\r\n');
        //data = $scope.myTextArea;
        var blob = new Blob([data], {type: "text/plain;charset=utf-8"});
        filename = "textarea.txt";
        console.log(data);
        console.log($scope.message1,$scope.message2);
        saveAs(blob, filename);};
})
.service ('customService',function($http) {
    this.getData=function() {
        return $http.get('localhost:3000/data/config1100.txt');
    }
});