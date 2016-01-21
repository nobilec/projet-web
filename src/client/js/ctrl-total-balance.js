var totalBalanceCtrlF = function($scope, $http){
	$scope.owedToOthers = ""
	$scope.owedToYou = ""
	$scope.totalBalance = ""
	
	$scope.calc = function() {
		if ( $scope.$parent.isUserConnected() ) {
			var myLogin = $scope.$parent.getConnectedUser()
			
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
				
				$scope.totalBalance = (total >= 0.0 ? "+ " : "") + total.toString() + "€"
				$scope.owedToOthers = (youOwe >= 0.0 ? "+ " : "") + youOwe.toString() + "€"
				$scope.owedToYou = (youreOwed >= 0.0 ? "+ " : "") + youreOwed.toString() + "€"
			}, function(error){
				console.log(error)
			})
		}
	}
	$scope.$on("refreshTotalBalance", $scope.calc)
	$scope.calc()
}

angular.module("splitwise").controller("TotalBalanceCtrl", totalBalanceCtrlF)