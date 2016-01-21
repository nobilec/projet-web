'use strict';
var splitwise = angular.module("splitwise", ["ngResource", "ngSession"])
var server = "http://localhost:3000/"

var mainCtrlF = function($scope, $http, $session) {
	//$scope.connectedUserSKey = "connUsr"
	$scope.connectedUser = ""
	$scope.atVisible = false
	$scope.transactions = []
	$scope.pages = 
		[ 	{ "pageName" : "dashboard", "selected" : true},
			{ "pageName" : "viewTransactions", "selected" : false},
			{ "pageName" : "signUp", "selected" : false},
			{ "pageName" : "logIn", "selected" : false} ]
	
	$scope.getSelectedPage = function() {
		for ( var i = 0; i < $scope.pages.length; ++i )
			if ( $scope.pages[i].selected )
				return $scope.pages[i].pageName
		return ""
	}
	
	$scope.selectPage = function(pageName) {
		for ( var i = 0; i < $scope.pages.length; ++i )
			$scope.pages[i].selected = (pageName == $scope.pages[i].pageName)
	}
	
	$scope.isPageSelected = function(pageName) {
		for ( var i = 0; i < $scope.pages.length; ++i ){
			var page = $scope.pages[i]
			if ( pageName == page.pageName && page.selected )
				return true
		}
		return false
	}
	
	$scope.isPageTransactionRelated = function(pageName) {
		return pageName == "dashboard" || pageName == "viewTransactions"
	}
	
	$scope.toogleAddTransaction = function(){
		$scope.atVisible = !$scope.atVisible
	}
	
	$scope.getConnectedUser = function(){
		/*
		 * Quand connexion ok :
		 *  > return $session.get()
		 */
		 //return "default"
		 /*var cUsr = $session.get($scope.connectedUserSKey)
		 console.log("CONNECTED USER : " + cUsr)
		 return cUsr*/
		 console.log("connectedUser = " + $scope.connectedUser)
		 return $scope.connectedUser
	}
	
	$scope.isUserConnected = function(){
		return $scope.getConnectedUser() != ""
	}
	
	$scope.connectUser = function(userName){
		$scope.connectedUser = userName
	}
	
	$scope.disconnectUser = function(){
		$scope.connectedUser = ""
	}
}

splitwise.controller("MainCtrl", mainCtrlF)