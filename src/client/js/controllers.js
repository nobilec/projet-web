'use strict';
var splitwise = angular.module("splitwise", [])
var server = "http://localhost:3000/"

/*
 * A faire :
 * - Prendre en compte le pseudo de l'utilisateur
 *   connecté dans la requête GET.
 */
var viewTransactionsCtrlF = function($scope, $http) {
	$scope.atVisible = false
	$scope.transactions = []
	
	$scope.toogle = function(){
		console.log("TOOGLE :" + $scope.atVisible)
		$scope.atVisible = !$scope.atVisible
		console.log($scope.atVisible)
	}
	
	$scope.remove = function(tId){
		$http.get(server + "delTransaction/" + tId.toString()).then(
			function(result){
				for ( var i = 0; i < $scope.transactions.length; ++i ){
					if ( $scope.transactions[i]._id == tId ){
						$scope.transactions.splice(i, 1)
						break
					}
				}
			}, function(error){
				console.log(error)
			})
	}
	
	$http.get(server + "getTransactions/" + "default").then( 
		function(result){
			$scope.transactions = result.data
		}, function(error){
			console.log(error)
		})
}

/* 
 * A faire :
 * - Ajouter le pseudo de l'utilisateur connecté ;
 * - Le prendre en compte dans le calcul des parts ;
 */
var addTransactionCtrlF = function($scope, $http) {
	// Form values :
	$scope.usrs = ""
	$scope.desc = ""
	$scope.amnt = 0.0
	
	$scope.send = function() {
		$scope.transaction = {
			"userPaid" : "default",
			"userShare" : [{"pseudo" : "", "amount" : 0.0}],
			"groupeName" : "",
			"description" : "",
			"date" : "",
			"imageID" : "",
			"amount" : 0.0
		}
		
		var usrsTab = $scope.usrs.split(" ")
		var amntDiv = $scope.amnt / (usrsTab.length + 1 )
		for ( var i = 0; i < usrsTab.length; ++i )
			$scope.transaction.userShare[i] = { "pseudo" : usrsTab[i], "amount" : amntDiv }		
		$scope.transaction.description = $scope.desc
		$scope.transaction.amount = $scope.amnt
		
		$http.post(server + "addTransaction", $scope.transaction).then(
			function(result) {
				$scope.$parent.toogle()
				$scope.$parent.transactions.push(result.data)
			}, function(error) {
				console.log(error)
			})
	}
}

splitwise.controller("ViewTransactionsCtrl", viewTransactionsCtrlF)
splitwise.controller("AddTransactionCtrl", addTransactionCtrlF)
