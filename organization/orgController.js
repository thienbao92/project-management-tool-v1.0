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


.controller('orgCtrl', function ($scope, firebaseOrg, firebaseProject, firebaseGroupMember, firebaseUrl) {

    $scope.organization = firebaseOrg;
    $scope.groupMember = firebaseGroupMember;

    var ref = new Firebase(firebaseUrl + '/groupMember/');

    function addToIndex(id) {
      ref.child(id).set(true);
    }

    $scope.addOrg = function () {
      $scope.organization.$add({
        name: $scope.orgName,
        owner: $scope.id
      }).then(function (data) {
        var orgId = data.key();
        addToIndex(orgId);

        //        $scope.groupMember.$add({
        //          organizationId: orgId,
        //          member: $scope.id
        //        })
      })
    }; //end function addOrg


    console.log($scope.organization);
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
