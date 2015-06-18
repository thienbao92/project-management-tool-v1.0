/**
 * organization.Controller Module
 *
 * Description
 */

angular.module('organization.Controller', [])

.directive('showFocus', function ($timeout) {
  return {
    restrict: 'A',
    link: function (scope, element, attrs) {
      scope.$watch(attrs.showFocus,
        function (newValue) {
          $timeout(function () {
            newValue && element.focus();
          });
        }, true);
    }
  }
})


.controller('orgCtrl', function ($scope, firebaseOrg, firebaseProject, firebaseUrl, organization, $firebaseArray, projectServices) {


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
        organization.removeOrgfromMember(orgId);
      } //end function removeOrg

    //END Organization area

    //add project area

    //Project area

    $scope.getProjects = function (id) {
        var array = firebaseProject(id);
        return array;
      } //end function getProject

    $scope.getProjectFilter = function (orgId) {
        $scope.projectFilterArray = [];
        var ref = new Firebase(firebaseUrl + '/users/' + userId + '/groupMember/' + orgId);

        ref.on("value", function (snapshot) {
          snapshot.forEach(function (value) {
            $scope.projectFilterArray.push(value.key());
          })
        })

        ref.on("child_removed", function (snapshot) {
          var removedProject = snapshot.key();
          var index = $scope.projectFilterArray.indexOf(removedProject);

          if (index > -1) {
            $scope.projectFilterArray.splice(index, 1);
          }

        })




      } //end function getProjectFilter

    $scope.projectData = {};
    $scope.addProject = function (uid) {
        $scope.projects = firebaseProject(uid);

        $scope.projects.$add({
          projectName: $scope.projectData.name
        }).then(function (data) {
          var projectId = data.key();
          projectServices.addMemberToProject(projectId, $scope.id, uid);
        })
      } //end function addProject

    $scope.removeProjectIdFromUser = function (id) {
        projectServices.removeMemberFromProject(id, $scope.id);
      } //end function removeProjectIdFromUser

    $scope.deleteProject = function (orgId, projectId) {
        var taskRef = new Firebase(firebaseUrl + '/task');
        var listRef = new Firebase(firebaseUrl + '/list');
        var userRef = new Firebase(firebaseUrl + '/users/' + userId + '/groupMember/' + orgId + '/' + projectId);
        var projectUserRef = new Firebase(firebaseUrl + '/users/' + userId + '/groupMember/' + orgId);

        var projectGroupMemberRef = new Firebase(firebaseUrl + '/projectMember');

        userRef.on("value", function (snapshot) {
          snapshot.forEach(function (listId) {
            var listId = listId.key();
            taskRef.child(listId).remove();
          })
        })
        listRef.child(projectId).remove();
        projectUserRef.child(projectId).remove();
        projectGroupMemberRef.child(projectId).remove();

      } //end function deleteProject


    //END project area

  }) //End orgCtrl
