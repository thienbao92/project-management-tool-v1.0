/**
* profile.Controller Module
*
* Description
*/

angular.module('profile.Controller', [])

.controller('profileCtrl', function ($scope,$firebaseArray,firebaseRef) {

    var ref = firebaseRef("profile");

    $scope.profile = $firebaseArray(ref);

    $scope.addProfile = function(){
          $scope.profile.$add({
              text: $scope.addText
          })
        }//end function addProfile
})

