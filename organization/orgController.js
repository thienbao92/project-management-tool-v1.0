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


.controller('orgCtrl', function ($scope, firebaseOrg, firebaseProject, firebaseUrl, organization, $firebaseArray) {


    var userId = $scope.id;
    var ref = new Firebase(firebaseUrl + '/users/' + userId + '/groupMember');
    var orgRef = new Firebase(firebaseUrl + '/organization');

    $scope.orgUser = $firebaseArray(ref);
    $scope.filteredArray = [new Array()];

    ref.on("value", function (snapshot) {
      snapshot.forEach(function (value) {
        $scope.filteredArray.push(value.key());

      })
    })


    $scope.makeTest = function () {
      $scope.test = ["-JqsNbnuM7ghg5Xs7yFS", "-JqsNgJgqjtYsGgbZqjX"];
      return test;
    }
    console.log($scope.makeTest);

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
        organization.removeOrg(orgId, $scope.id);
      } //end function removeOrg


    //add project area

    $scope.projectData = {};

    $scope.getProjects = function (id) {
        var ref = new Firebase(firebaseUrl + '/project/' + id);
        var array = $firebaseArray(ref);
        return array;
      } //end function getProject


    $scope.addProject = function (uid) {

        $scope.projects = firebaseProject(uid);

        $scope.projects.$add({
          projectName: $scope.projectData.name
        })
      } //end function addProject

  }) //End orgCtrl
