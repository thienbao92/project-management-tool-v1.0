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


    //get value from User
    //functions shows how to get groupId of users in order to get data from organizations
    var userId = $scope.id;
    var ref = new Firebase(firebaseUrl + '/users/' + userId + '/groupMember');


    $scope.filteredArray = []; // declare blank scope array
    ref.on("value", function (snapshot) {
      snapshot.forEach(function (value) {
        $scope.filteredArray.push(value.key());
      })
    })

    //END get value from User

    //Organization area
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

    //END Organization area

    //add project area

    //Project area

    $scope.getProjects = function (id) {
        var array = firebaseProject(id);
        return array;
      } //end function getProject


    $scope.projectData = {};
    $scope.addProject = function (uid) {
        $scope.projects = firebaseProject(uid);

        $scope.projects.$add({
          projectName: $scope.projectData.name
        })
      } //end function addProject

    //END project area

  }) //End orgCtrl
