/**
 * profile.Controller Module
 *
 * Description
 */

angular.module('profile.Controller', [])

.controller('profileCtrl', function ($scope, $firebaseArray, firebaseRef) {

  var ref = firebaseRef("profile");

  $scope.profile = $firebaseArray(ref);


  $scope.addProfile = function () {
      $scope.profile.$add({
        text: $scope.addText
      })
    } //end function addProfile

  $scope.changePassword = function () {
    $scope.auth.$changePassword({
      email: $scope.email,
      oldPassword: $scope.oldPassword,
      newPassword: $scope.newPassword
    }).then(function () {
      console.log("Password changed successfully!");
    }).catch(function (error) {
      console.error("Error: ", error);
    });
  };

})
