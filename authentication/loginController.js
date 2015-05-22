/**
 * login.Controller Module
 *
 * Description
 */

angular.module('login.Controller', [])

.controller('authCtrl', function ($scope, $rootScope, firebaseAuth, $state) {
    //show signup form if value = true
    $scope.isSignup = false;

    $scope.signUp = function () {
        $scope.auth.$createUser({
          email: $scope.email,
          password: $scope.password
        });

        $state.go("authentication.logIn");
      } //end function signUp



    $scope.signIn = function () {
        $scope.auth.$authWithPassword({
          email: $scope.email,
          password: $scope.password
        }).then(function (user) {
          $state.go('main');
        }).catch(function (error) {
          $scope.announce = "fail to login due to wrong password and username";
        })
      } //end function signIn

    $rootScope.logout = function () {
        $scope.auth.$unauth();
      } //end function logout

    $scope.authGoogle = function () {
        $scope.auth.$authWithOAuthPopup("google").then(function (authData) {
          console.log("Logged in as:", authData.uid);
          $state.go('main');
        }).catch(function (error) {
          console.error("Authentication failed:", error);
        });
      } //end function authGoogle

    $scope.resetPassword = function () {

        $scope.auth.$resetPassword({
          email: $scope.resetEmail
        }).then(function () {
          alert("Your password has been reset. Check your email inbox!")
        }).catch(function () {
          alert("Unable to reset password. Please check if you type password correctly")
        })
      } //end function resetPassword

  }) //End authCtrl
