/**
* login.Controller Module
*
* Description
*/

angular.module('login.Controller', [])

.controller('authCtrl', function ($scope, firebaseAuth, $state ) {
    //show signup form if value = true
    $scope.isSignup = false;

    $scope.signUp = function(){
        $scope.auth.$createUser({
			email: $scope.email,
			password: $scope.password
		}).then(function(){
		    $scope.isSignup = false;
            alert("singup successfully");
		}).error(function(){
		    elert("unable")
		})
    }//end function signUp



    $scope.signIn = function(){
        $scope.auth.$authWithPassword({
            email: $scope.email,
            password: $scope.password
        }).then(function(user){
            $state.go('main');
        })
        }//end function signIn

    $scope.logout = function(){
        $scope.auth.$unauth();
        }//end function logout
})//End authCtrl
