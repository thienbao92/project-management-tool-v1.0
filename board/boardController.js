/**
 * board.Controller Module
 *
 * Description
 */

angular.module('board.Controller', [])

.service('projectActivity', function (notification, locationPath, $stateParams) {
  var location = '#' + locationPath;
  var projectId = $stateParams.projectId;

  this.addMember = function (firstUser, secondUser) {
      var type = "addMember";
      var content = firstUser + " added " + secondUser + " to project";

      notification.add(projectId, type, content, location);
    } //End function

  this.removeMember = function (firstUser, secondUser) {
      var type = "removeMember";
      var content = firstUser + " removed " + secondUser + " from project";

      notification.add(projectId, type, content, location);
    } //End function

  this.addList = function (user, listName) {
      var type = "addList";
      var content = user + " added list " + listName + " to project";

      notification.add(projectId, type, content, location);
    } //End function

  this.removeList = function (user, listName) {
      var type = "removeList";
      var content = user + " removed list " + listName + " from project";

      notification.add(projectId, type, content, location);
    } //End function

  this.addTask = function (user, listName, taskName) {
      var type = "addTask";
      var content = user + " added task " + taskName + " to list" + listName;

      notification.add(projectId, type, content, location);
    } //End function
})

.controller('boardCtrl', function ($scope, $stateParams, firebaseUrl, $firebaseArray, firebaseUser, locationPath, notification, projectNotiFactory, projectActivity) {

    //Start get member Array from users directory. Source: loginServices.js
    $scope.members = firebaseUser;
    //End get member Array from users directory. Source: loginServices.js

    //Start get State params
    var projectId = $stateParams.projectId;
    var orgId = $stateParams.orgId;
    var id = $scope.id;
    //End get State params

    //Start notification
    $scope.projectActivities = projectNotiFactory(projectId);
    //End notification

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

        var userProjectMemberRef = new Firebase(firebaseUrl + '/users/' + userId + '/projectMember');
        userProjectMemberRef.child(projectId).set(true);

        groupMemberRef.child(userId).set(true);
        getProjectMemberRef.child(userId).set(true);
        addProjectRef.child(projectId).set(true);

        projectActivity.addMember(id, userId);
      } //end function addUsers

    $scope.removeUsers = function (userId) {
        var groupMemberRef = new Firebase(firebaseUrl + '/groupMember/' + orgId);
        var addProjectRef = new Firebase(firebaseUrl + '/users/' + userId + '/groupMember/' + orgId);

        var userProjectMemberRef = new Firebase(firebaseUrl + '/users/' + userId + '/projectMember');
        userProjectMemberRef.child(projectId).remove();

        groupMemberRef.child(userId).remove();
        getProjectMemberRef.child(userId).remove();
        addProjectRef.child(projectId).remove();

        projectActivity.removeMember()

      } //end function removeUsers


    console.log($scope.id);
  }) //End boardCtrl
