var loginCtrlF = function($scope, $location, $resource, $session){
    var lien =$resource(server, {}, {
        post: {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' }
        }
    });
    $scope.user;
    var addUser = $resource(server + 'addUser', {}, {
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

    var getuser = $resource(server + 'GetUser', {}, {
        post: {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
			xhrFields: { withCredentials: true }
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

    var addfriend = $resource(server + 'addfriend', {}, {
        post: {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
			xhrFields: { withCredentials: true }
        }
    });
    addfriend.post(function(req) {
        }, function(errResponse) {
        // fail
        });
    
    $scope.addfriend = function(pseudo) {
      addfriend.post({pseudo : $scope.user.pseudo, friend : pseudo})
    }
};

angular.module("splitwise").controller("LoginCtrl", loginCtrlF)