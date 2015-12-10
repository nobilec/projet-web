'use strict';
var splitwise = angular.module("splitwise", [])

var welcomeCtrlF = function($scope) {
    $scope.bonjour = "ECHEC."

    $scope.data = {}
    $scope.response = {}
    console.log("welcome")
    
    $scope.send = function () {
	console.log("send")
        var getting = $http({
            method: 'GET',
            url: '/bonjour',
            data: $scope.data,
            processData: false
        })
	
        getting.success(function (response) {
            console.log(response)
            $scope.response.data = response
        });
    }

    $scope.bonjour = $scope.response.data
}

splitwise.controller("WelcomeCtrl", welcomeCtrlF)
