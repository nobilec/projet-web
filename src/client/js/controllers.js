'use strict';
var splitwise = angular.module("splitwise", [])
var server = "http://localhost:3000/"

var welcomeCtrlF = function($scope, $http) {
    $scope.bonjour = "BONJOUR"
	
	/*$http.get(server + "bonjour").
		then( function(response){
			$scope.bonjour = response.data
		}, function(error){
			console.log(error)
		});*/
}

var addTransactionCtrlF = function($scope, $http) {
	// Form values :
	$scope.usrs = ""
	$scope.desc = ""
	$scope.amnt = 0.0
	
	$scope.send = function() {
		$scope.transaction = {
			"pseudo" : "",
			"userShareList" : [{"pseudo" : "", "amount" : 0.0}],
			"groupeName" : "",
			"description" : "",
			"date" : "",
			"imageID" : "",
			"amount" : 0.0
		}
		// Pseudo : voir apres avoir fait la connexion
		var usrsTab = $scope.usrs.split(" ")
		var amntDiv = $scope.amnt / (usrsTab.length + 1 )
		for ( var i = 0; i < usrsTab.length; ++i )
			$scope.transaction.userShareList[i] = { "pseudo" : usrsTab[i], "amount" : amntDiv }
		
		$scope.transaction.description = $scope.desc
		$scope.transaction.amount = $scope.amnt
		console.log($scope.transaction)
		
		$http.post(server + 'addTransaction', $scope.transaction).then(
			function(result) {
				console.log(result)
			}, function(error) {
				console.log(error)
			}
		)
	}
}

splitwise.controller("WelcomeCtrl", welcomeCtrlF)
splitwise.controller("AddTransactionCtrl", addTransactionCtrlF)
