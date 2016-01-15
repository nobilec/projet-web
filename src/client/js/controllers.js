'use strict';
var splitwise = angular.module("splitwise", [])
var server = "http://localhost:3000/"

var welcomeCtrlF = function($scope, $http) {
    $scope.bonjour = "ECHEC"
	
	$http.get(server + "bonjour").
		then(function(response) {
			$scope.bonjour = response.data;
		}, function(error) {
			console.log(error);
		});
}

splitwise.controller("WelcomeCtrl", welcomeCtrlF)
