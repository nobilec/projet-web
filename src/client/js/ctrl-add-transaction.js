var addTransactionCtrlF = function($scope, $http) {
	// Form values :
	var init = function () {
		$scope.usrs = ""
		$scope.desc = ""
		$scope.amnt = 0.0
		$scope.paidByYou = true
		$scope.payer = ""
		$scope.errors = ""
	}
	init()
	
	$scope.payYou = function() {
		$scope.paidByYou = true
	}
	$scope.payOther = function() {
		$scope.paidByYou = false
	}
	
	$scope.send = function() {
		$scope.errors = ""
		$scope.transaction = {
			"userPaid" : "",
			"userShare" : [{"pseudo" : "", "amount" : 0.0}],
			"groupeName" : "",
			"description" : "",
			"date" : "",
			"imageID" : "",
			"amount" : 0.0
		}
		var usrsTab = $scope.usrs.split(" ")
		var amntDiv = $scope.amnt / (usrsTab.length + 1 )
		var myLogin = $scope.$parent.getConnectedUser()
		
		// Calcul des parts :
		if ( $scope.paidByYou ) {
			$scope.transaction.userPaid = myLogin
			$scope.transaction.userShare[0] =  { "pseudo" : myLogin, "amount" : amntDiv }
			for ( var i = 0; i < usrsTab.length; ++i )
				$scope.transaction.userShare[i + 1] = { "pseudo" : usrsTab[i], "amount" : amntDiv }
				
		} else {
			var payerIndex = usrsTab.indexOf($scope.payer)
			
			if ( payerIndex != - 1) {
				$scope.transaction.userPaid = $scope.payer
				$scope.transaction.userShare[0] = { "pseudo" : $scope.payer, "amount" : amntDiv }
				$scope.transaction.userShare[1] = { "pseudo" : myLogin, "amount" : amntDiv }
				for ( var i = 0; i < usrsTab.length; ++i ){
					if ( i != payerIndex )
						$scope.transaction.userShare[1] = { "pseudo" : usrsTab[i], "amount" : amntDiv }
				}
				
			} else {
				$scope.errors += "\nLe payeur n\'est pas dans la liste des participants."
			}
		}
		// POST :
		if ( $scope.errors == "") {
			$scope.transaction.description = $scope.desc
			$scope.transaction.amount = $scope.amnt
			
			if ( $scope.$parent.isUserConnected() ) {
				console.log("AJOUT TR : " + $scope.transaction.userPaid )
				$http.post(server + "addTransaction", $scope.transaction).then(
					function(result) {
						$scope.$parent.toogleAddTransaction()
						init()
						$scope.$root.$broadcast("refreshViewTransactions")
						$scope.$root.$broadcast("refreshTotalBalance")
						$scope.$root.$broadcast("refreshDashboard")
					}, function(error) {
						console.log(error)
					})
			}
			
		}
	}
}

angular.module("splitwise").controller("AddTransactionCtrl", addTransactionCtrlF)