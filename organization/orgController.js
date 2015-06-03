/**
 * organization.Controller Module
 *
 * Description
 */

angular.module('organization.Controller', [])

.directive('showFocus', function ($timeout) {
  return function (scope, element, attrs) {
    scope.$watch(attrs.showFocus,
      function (newValue) {
        $timeout(function () {
          newValue && element.focus();
        });
      }, true);
  };
})


.controller('orgCtrl', function ($scope, firebaseOrg, firebaseProject, firebaseUrl, organization) {


    var userId = $scope.id;
    var ref = new Firebase(firebaseUrl + '/users/' + userId + '/groupMember');
    var orgRef = new Firebase(firebaseUrl + '/organization');

    //load org data and filter by
    $scope.getOrg = [];

    ref.on("child_added", function (snapshot) {

        orgRef.orderByKey().equalTo(snapshot.key()).on("child_added", function (data) {
          $scope.getOrg.push(data.val());
          console.log($scope.getOrg);
        })
      }) // end ref on function
      //Endthu nghiem load org data



    $scope.organization = firebaseOrg;

    $scope.addOrg = function () {
      $scope.organization.$add({
        name: $scope.orgName,
        owner: $scope.id
      }).then(function (data) {
        var orgId = data.key();
        organization.addMemberToGroup(orgId, $scope.id);

      })
    }; //end function addOrg

    $scope.removeOrg = function (orgId) {
        organization.remove(orgId, $scope.id);
      } //end function removeOrg


    //add project area

    $scope.projectData = {};
    $scope.project = firebaseProject;

    $scope.addProject = function (uid) {
        $scope.project.$add({
          projectName: $scope.projectData.name,
          org: uid
        })
      } //end function addProject

  }) //End orgCtrl
