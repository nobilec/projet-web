var server = "http://localhost:3000/"

/*
 * LoginCtrl
 *
 * Gère les utilisateurs et les amis
 */
var loginCtrlF = function($scope, $http){
	var init = function() {
		$scope.inputs = {};
		$scope.inputs.suUsername = "";
		$scope.inputs.suPassword = "";
		$scope.inputs.suConfirmPassword = "";
		$scope.inputs.suMail = "";
		$scope.inputs.liPassword = "";
		$scope.inputs.liMail = "";
		$scope.inputs.user = {};
		$scope.outputs = {};
		$scope.outputs.errors = "";
		$scope.outputs.liErrors = "";
		$scope.outputs.messages = "";
	}
	init() 
	
    $scope.inscription = function(username, password, mail) {
		$scope.outputs.messages = ""
		$scope.user = {
			"pseudo" : "",
			"email" : "",
			"password" : "",
			"friends" : [{"pseudo" : ""}] ,
			"groupes" : [{"groupeName" : ""}]
		};
		$scope.user.pseudo = username;
		$scope.user.email = mail;
		$scope.user.password = password;
		
		if (($scope.user.email != "") && ($scope.user.pseudo != "") && ($scope.user.password != "")){
		
			$http.get(server + "getUser/" + mail).then( // Verification mail unique
				function(result) {
					if ( typeof result.data[0] != "undefined" ){
						$scope.outputs.errors = "Cette adresse e-mail existe déjà.\n";
					} else {
						$http.get(server + "getUserByPseudo/" + username).then( // Verification pseudo unique
							function(result) {
								if ( typeof result.data[0] != "undefined" ){
									$scope.outputs.errors = "Ce nom d'utilisateur existe déjà.\n";
								} else {
									$http.post(server + "addUser/", $scope.user).then(
										function(result) {
											init();
											$scope.outputs.messages = "Inscription réalisée avec succès.";
										}, function(error) {
											console.log(error);
										})
								}
							}, function(error) {
								console.log(error);
							})
					}
				}, function(error) {
					console.log(error);
				})
		} else {
			$scope.outputs.errors = "Tous les champs ne sont pas remplis.\n";
		}
	}
    
    $scope.login = function(email, password) {
		$http.get(server + "getUser/" + email).then( 
				function(result){
					$scope.user = result.data[0]
					
					if ( typeof result.data[0] != "undefined" ){
						if (($scope.user.email == email) && ($scope.user.password == password)){
							$scope.$parent.connectUser($scope.user.pseudo);
							$scope.$parent.refreshAllControllers();
							init();
						}
					} else {
						$scope.outputs.liErrors = "Identifiants incorrects."
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