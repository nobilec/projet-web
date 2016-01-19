'use strict';
var splitwise = angular.module("splitwise", [])
var server = "http://localhost:3000/"
 
 /*
  * CONTROLEURS :
  */

/*
 * A faire :
 * - Prendre en compte le pseudo de l'utilisateur
 *   connecté dans la requête GET.
 */
var viewTransactionsCtrlF = function($scope, $http) {
	$scope.atVisible = false
	$scope.myLogin = "default" // Gérer la connexion
	$scope.transactions = []
	
	$scope.toogle = function(){
		$scope.atVisible = !$scope.atVisible
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
				$scope.$broadcast("refreshTotalBalance")
			}, function(error){
				console.log(error)
			})
	}
	
	$http.get(server + "getTransactions/" + $scope.myLogin).then( 
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
			"userPaid" : $scope.$parent.myLogin,
			"userShare" : [{"pseudo" : "", "amount" : 0.0}],
			"groupeName" : "",
			"description" : "",
			"date" : "",
			"imageID" : "",
			"amount" : 0.0
		}
		
		var usrsTab = $scope.usrs.split(" ")
		var amntDiv = $scope.amnt / (usrsTab.length + 1 )
		$scope.transaction.userShare[0] =  { "pseudo" : $scope.$parent.myLogin, "amount" : amntDiv }
		
		for ( var i = 0; i < usrsTab.length; ++i )
			$scope.transaction.userShare[i + 1] = { "pseudo" : usrsTab[i], "amount" : amntDiv }		
		$scope.transaction.description = $scope.desc
		$scope.transaction.amount = $scope.amnt
		
		$http.post(server + "addTransaction", $scope.transaction).then(
			function(result) {
				$scope.$parent.toogle()
				$scope.$parent.transactions.push(result.data)
				$scope.usrs = ""
				$scope.desc = ""
				$scope.amnt = 0.0
				$scope.$root.$broadcast("refreshTotalBalance") // $root car non parent de TotalBalanceCtrl
			}, function(error) {
				console.log(error)
			})
	}
}

var totalBalanceCtrlF = function($scope, $http){
	$scope.owedToOthers = ""
	$scope.owedToYou = ""
	$scope.totalBalance = ""
	$scope.calc = function() {
		var myLogin = $scope.$parent.myLogin
		$http.get(server + "getTransactionShare/" + myLogin).then( 
		function(result){
			var trns = result.data
			var youOwe = 0.0
			var youreOwed = 0.0
			var total = 0.0
	
			for ( var i = 0; i < trns.length; ++i ){
			
				var usrShr = trns[i].userShare
				var payer = usrShr[0]
				
				// Si on a payé :
				if ( payer.pseudo == myLogin ){
					for ( var j = 1; j < usrShr.length; ++j ){
						payer = usrShr[j]
						youreOwed += payer.amount
					}
				// Si quelqu'un d'autre a payé
				} else {
					for ( var j = 1; j < usrShr.length; ++j ){
						payer = usrShr[j]
						if ( payer.pseudo == myLogin )
							youOwe += payer.amount
					}
				}
			}
			
			total = youreOwed - youOwe
			
			$scope.totalBalance = (total >= 0.0 ? "+ " : "-") + total.toString() + "€"
			$scope.owedToOthers = (youOwe >= 0.0 ? "+ " : "-") + youOwe.toString() + "€"
			$scope.owedToYou = (youreOwed >= 0.0 ? "+ " : "-") + youreOwed.toString() + "€"
		}, function(error){
			console.log(error)
		})
	}
	$scope.$on("refreshTotalBalance", $scope.calc)
	$scope.calc()
}

splitwise.controller("ViewTransactionsCtrl", viewTransactionsCtrlF)
splitwise.controller("AddTransactionCtrl", addTransactionCtrlF)
splitwise.controller("TotalBalanceCtrl", totalBalanceCtrlF)