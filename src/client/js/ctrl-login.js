var server = "http://localhost:3000/"

/*
 * LoginCtrl
 *
 * Gère les utilisateurs et les amis
 */
var loginCtrlF = function($scope, $http){
	var init = function() {
		$scope.inputs = {}
		$scope.inputs.suUsername = "";
		$scope.inputs.suPassword = "";
		$scope.inputs.suConfirmPassword = "";
		$scope.inputs.suMail = "";
		$scope.inputs.liPassword = "";
		$scope.inputs.liMail = "";
		$scope.inputs.user = {};
	}
	init() 
	
    $scope.inscription = function(username, password, mail) {
		$scope.user = {
			"pseudo" : "",
			"email" : "",
			"password" : "",
			"friends" : [{"pseudo" : ""}] ,
			"groupes" : [{"groupeName" : ""}]
		};
		
		console.log("INSCRIPTION : " + username + " ; " + mail + " ; " + password)
		$scope.user.pseudo = username;
		$scope.user.email = mail;
		$scope.user.password = password;
		
		if (($scope.user.email != "") && ($scope.user.pseudo != "") && ($scope.user.password != "")){
			$http.post(server + "addUser/", $scope.user).then(
				function(result) {
					console.log("Avant : " + $scope.inputs.suUsername );
					init();
					console.log("Apres : " + $scope.inputs.suUsername );
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
						$scope.$parent.connectUser($scope.user.pseudo);
						$scope.$parent.refreshAllControllers();
						init();
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