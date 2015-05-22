/**
 * login.Services Module
 *
 * Description
 */

angular.module('login.Services', [])

.factory('firebaseAuth', function ($firebaseAuth, firebaseUrl) {
    var ref = new Firebase(firebaseUrl);
    var auth = $firebaseAuth(ref);
    return auth;
  }) // END firebaseAuth

//run function
.run(function ($rootScope, firebaseAuth, $state) {

    $rootScope.auth = firebaseAuth;

    $rootScope.auth.$onAuth(function (authData) {
        if (authData) {
          console.log("Logged in as:", authData.uid);
          $rootScope.id = authData.uid;

          //$rootScope.googleName = authData.google.displayName;
          $rootScope.isLogin = true;

        } else {
          console.log("Logged out or have not logged in");
          $rootScope.isLogin = false;
          $state.go('authentication.logIn');
        }
      }) //END rootScope function
  }) //END run function
