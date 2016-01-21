/*
 * ViewTransactionsCtrl
 *
 * A faire :
 * - Prendre en compte le pseudo de l'utilisateur
 *   connecté dans la requête GET.
 */
var viewTransactionsCtrlF = function($scope, $http) {
	$scope.whoOwesWho = ""
	$scope.amountOwed = 0.0

	$scope.remove = function(tId){
		if ( $scope.$parent.isUserConnected() ) {
			$http.get(server + "delTransaction/" + tId.toString()).then(
				function(result){
					for ( var i = 0; i < $scope.$parent.transactions.length; ++i ){
						if ( $scope.$parent.transactions[i]._id == tId ){
							$scope.$parent.transactions.splice(i, 1)
							break
						}
					}
					$scope.$root.$broadcast("refreshTotalBalance")
					$scope.$root.$broadcast("refreshDashboard")
				}, function(error){
					console.log(error)
				})
		}
	}
	
	$scope.calc = function() {
		if ( $scope.$parent.isUserConnected() ) {
			$http.get(server + "getTransactions/" + $scope.$parent.getConnectedUser()).then( 
				function(result){
					$scope.$parent.transactions = result.data
				}, function(error){
					console.log(error)
				})
		}
	}
	$scope.$on("refreshViewTransactions", $scope.calc)
	$scope.calc()
}

angular.module("splitwise").controller("ViewTransactionsCtrl", viewTransactionsCtrlF)