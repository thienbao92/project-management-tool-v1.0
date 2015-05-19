/**
* login.Controller Module
*
* Description
*/

angular.module('login.Controller', [])

.controller('authCtrl', function ($scope,$rootScope, firebaseAuth ) {

    $rootScope.auth = firebaseAuth;

    //show signup form if value = true
    $scope.isSignup = false;

    $scope.signUp = function(){
        $rootScope.auth.$createUser({
			email: $scope.email,
			password: $scope.password
		}).then(function(){
		    $scope.isSignup = true;
            alert("singup successfully");
		}).error(function(){
		    elert("unable")
		})
    }//end function signUp



    $scope.signIn = function(){
        $rootScope.auth.$authWithPassword({
            email: $scope.email,
            password: $scope.password
        }).then(function(user){
            alert("success loggin as " +user);
            console.log(user)
        })
        }//end function signIn


})//End authCtrl
