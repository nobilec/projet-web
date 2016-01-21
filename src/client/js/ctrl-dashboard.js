var dashboardCtrlF = function($scope, $http) {
	$scope.owedBy = []
	$scope.owingTo = []

	$scope.calc = function() {
		if ( $scope.$parent.isUserConnected() ) {
			var myLogin = $scope.$parent.getConnectedUser()
			$scope.owedBy = []
			$scope.owingTo = []
			
			$http.get(server + "getTransactionShare/" + myLogin).then( 
			function(result){
				var trns = result.data
		
				for ( var i = 0; i < trns.length; ++i ){
					var usrShr = trns[i].userShare
					var payer = usrShr[0]
					
					// Si on a payé :
					if ( payer.pseudo == myLogin ){
						for ( var j = 1; j < usrShr.length; ++j ){
							payer = usrShr[j]
							$scope.owedBy.push( { "pseudo" : payer.pseudo, "amount" : payer.amount } )
						}
					// Si quelqu'un d'autre a payé
					} else {
						for ( var j = 1; j < usrShr.length; ++j ){
							payer = usrShr[j]
							if ( payer.pseudo == myLogin )
								$scope.owingTo.push( { "pseudo" : usrShr[0].pseudo, "amount" : payer.amount } )
						}
					}
				}
			}, function(error){
				console.log(error)
			})
		}
	}
	$scope.$on("refreshDashboard", $scope.calc)
	$scope.calc()
}

angular.module("splitwise").controller("DashboardCtrl", dashboardCtrlF)