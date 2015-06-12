/**
 * board.Controller Module
 *
 * Description
 */

angular.module('board.Controller', [])

.controller('boardCtrl', function ($rootScope, $scope, $stateParams, firebaseUrl, $firebaseArray, filterUsersByArray, firebaseUser) {

    //Start get member Array from users directory. Source: loginServices.js
    $scope.members = firebaseUser;
    //End get member Array from users directory. Source: loginServices.js

    //Start get State params
    var projectId = $stateParams.projectId;
    var orgId = $stateParams.orgId;
    //End get State params

    //Start projectMemberArray modification
    var getProjectMemberRef = new Firebase(firebaseUrl + '/projectMember/' + projectId);

    $scope.projectMemberArray = [];

    //Start detect when child add
    getProjectMemberRef.on("child_added", function (snapshot) {
        var addValue = snapshot.key();
        console.log("added value " + addValue);
        $scope.projectMemberArray.push(addValue);
        console.log($scope.projectMemberArray);
      })
      //End detect when child add

    //Start detect when child removed
    getProjectMemberRef.on("child_removed", function (snapshot) {
        var deletedValue = snapshot.key();
        console.log("deleted value " + deletedValue);
        var index = $scope.projectMemberArray.indexOf(deletedValue);
        $scope.projectMemberArray.splice(index, 1);
      })
      //End detect when child removed

    //End projectMemberArray modification

    $scope.addUsers = function (userId) {
        var groupMemberRef = new Firebase(firebaseUrl + '/groupMember/' + orgId);
        var addProjectRef = new Firebase(firebaseUrl + '/users/' + userId + '/groupMember/' + orgId);

        groupMemberRef.child(userId).set(true);
        getProjectMemberRef.child(userId).set(true);
        addProjectRef.child(projectId).set(true);
      } //end function addUsers

    $scope.removeUsers = function (userId) {
        var groupMemberRef = new Firebase(firebaseUrl + '/groupMember/' + orgId);
        var addProjectRef = new Firebase(firebaseUrl + '/users/' + userId + '/groupMember/' + orgId);

        groupMemberRef.child(userId).remove();
        getProjectMemberRef.child(userId).remove();
        addProjectRef.child(projectId).remove();

      } //end function removeUsers

  }) //End boardCtrl
