angular.module("monApp",['ngResource'])
.controller("inscriptioncontroller",function($scope,$location,$resource){
    var lien =$resource('http://localhost:3000/', {}, {
        post: {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' }
        }
    });
    $scope.user;
    var addUser = $resource('http://localhost:3000/addUser', {}, {
        post: {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' }
        }
    });
    addUser.post(function(user) {
        }, function(errResponse) {
        // fail
        });
    
    $scope.inscription = function() {
      if (($scope.user.email != "")&&($scope.user.pseudo != "")&&($scope.user.password != "")){
        addUser.post($scope.user);
      }
        $location.path("/Accueil");
    }

    var getuser = $resource('http://localhost:3000/GetUser', {}, {
        post: {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' }
        }
    });
    getuser.post(function(email) {
      $scope.user = comms;
        }, function(errResponse) {
        // fail
        });
    
    $scope.login = function(email,password) {
      getuser.post(email);
      if (($scope.user.email == email)&&($scope.user.password == password)){
        $session.set($scope.user);
        $location.path("/Dashboard");
      }
    }

    $scope.logout = function() {
        $scope.user = "";
        $session.set($scope.user);
        $location.path("/Accueil");
      }
    }

    var addfriend = $resource('http://localhost:3000/addfriend', {}, {
        post: {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' }
        }
    });
    addfriend.post(function(req) {
        }, function(errResponse) {
        // fail
        });
    
    $scope.addfriend = function(pseudo) {
      addfriend.post({pseudo : $scope.user.pseudo, friend : pseudo})
    }
    
}  )});