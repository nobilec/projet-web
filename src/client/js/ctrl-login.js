var server = "http://localhost:3000/"

/*
 * LoginCtrl
 *
 * Gère les utilisateurs et les amis
 */
var loginCtrlF = function($scope, $http){
	
	// Inscription :
	$scope.suUsername = "";
	$scope.suPassword = "";
	$scope.suConfirmPassword = "";
	$scope.suMail = "";
	
	// Connexion :
	$scope.liPassword = "";
	$scope.liMail = "";
	
    $scope.user = {};

	// FUNCTIONS :
		
    $scope.inscription = function() {
		$scope.user = {
			"pseudo" : "",
			"email" : "",
			"password" : "",
			"friends" : [{"pseudo" : ""}] ,
			"groupes" : [{"groupeName" : ""}]
		};
		
		$scope.user.pseudo = "clovis"//$scope.suUsername;
		$scope.user.email = "a@a.fr"//$scope.suEmail;
		$scope.user.password = "mdp"//$scope.suPassword;
		
		console.log("suUsername = " + $scope.suUsername)
		console.log("user = " + $scope.user)
		console.log("user.pseudo = " + $scope.user.pseudo)
		
		if (($scope.user.email != "") && ($scope.user.pseudo != "") && ($scope.user.password != "")){
			console.log("ON VA POST :")
			
			$http.post(server + "addUser/", $scope.user).then(
				function(result) {
				}, function(error) {
					console.log(error)
				})
		}
	}
    
    $scope.login = function(email, password) {
		$http.get(server + "getUser/" + email).then( 
				function(result){
					$scope.user = result.data[0]
					
					if (($scope.user.email == email) && ($scope.user.password == password)){
						$scope.$parent.connectUser($scope.user.pseudo)
					}
				}, function(error){
					console.log(error)
				})
    }

    $scope.logout = function() {
		$scope.user = {};
		$scope.$parent.disconnectUser()
	}
    
    $scope.addfriend = function(pseudo) {
	  $http.post(server + "addfriend/", {pseudo : $scope.user.pseudo, friend : pseudo}).then(
		function(result) {
		}, function(error) {
			console.log(error)
		})
    }
};

angular.module("splitwise").controller("LoginCtrl", loginCtrlF)