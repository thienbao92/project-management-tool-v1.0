/**
 * profile.Controller Module
 *
 * Description
 */

angular.module('profile.Controller', [])

.factory('firebaseProfile', function (firebaseUrl, $firebaseArray, $rootScope) {
    var uid = $rootScope.id;
    var ref = new Firebase(firebaseUrl + '/users/' + uid + '/profile');
    var profile = $firebaseArray(ref);
    return profile;
  }) // END firebaseProfile



.controller('profileCtrl', function ($scope, $firebaseArray, firebaseRef, firebaseProfile, notification) {

    $scope.profile = firebaseProfile;

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

    $scope.notification = function () {
      notification.addNoti("test thu xem hieu qua khong hehehe");
    }


  }) //End controller
