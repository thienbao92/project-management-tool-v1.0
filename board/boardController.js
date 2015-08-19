/**
 * board.Controller Module
 *
 * Description
 */

angular.module('board.Controller', [])

.factory('projectName', function (firebaseUrl, $firebaseObject, $firebaseArray) {

  return function (orgId, projectId) {
    var ref = new Firebase(firebaseUrl + '/project/' + orgId + '/' + projectId);
    var object = $firebaseObject(ref);
    var array = $firebaseArray(ref)
      //    array.$loaded().then(function () {
      //      var projectName = array.$getRecord(orgId);
      //      return projectName
      //    })
    return object
  }
})


.service('projectActivity', function (notification, locationPath, $stateParams) {
  var location = '#' + locationPath;
  //var projectId = $stateParams.projectId;

  this.addMember = function (firstUser, secondUser, projectId) {
      var type = "addMember";
      var content = firstUser + " added " + secondUser + " to project";

      notification.add(projectId, type, content, location);
    } //End function

  this.removeMember = function (firstUser, secondUser, projectId) {
      var type = "removeMember";
      var content = firstUser + " removed " + secondUser + " from project";

      notification.add(projectId, type, content, location);
    } //End function

  this.addList = function (user, listName, projectId) {
      var type = "addList";
      var content = user + " added list " + listName + " to project";

      notification.add(projectId, type, content, location);
    } //End function

  this.removeList = function (user, listName, projectId) {
      var type = "removeList";
      var content = user + " removed list " + listName + " from project";

      notification.add(projectId, type, content, location);
    } //End function

  this.addTask = function (user, listName, taskName, projectId) {
      var type = "addTask";
      var content = user + " added task " + taskName + " to list" + listName;

      notification.add(projectId, type, content, location);
    } //End function
})

.controller('boardCtrl', function ($scope, $stateParams, firebaseUrl, $firebaseArray, firebaseUser, $location, notification, projectNotiFactory, projectActivity, userNotification, projectName, $mdSidenav) {

    //Start get member Array from users directory. Source: loginServices.js
    $scope.members = firebaseUser;
    //End get member Array from users directory. Source: loginServices.js


    $scope.toggleRight = function () {
      $mdSidenav('right').toggle();
    };
    //Start get State params
    var projectId = $stateParams.projectId;
    var orgId = $stateParams.orgId;
    var id = $scope.id;
    var location = '#' + $location.path();
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

        projectActivity.addMember(id, userId, projectId);

        //Start get project name
        var projectSource = projectName(orgId, projectId);
        projectSource.$loaded(function (value) {
          var projectValue = value.projectName;
          userNotification.addMember(id, userId, projectValue, location);
        })

        //End get project name



      } //end function addUsers

    $scope.removeUsers = function (userId) {
        var groupMemberRef = new Firebase(firebaseUrl + '/groupMember/' + orgId);
        var addProjectRef = new Firebase(firebaseUrl + '/users/' + userId + '/groupMember/' + orgId);

        var userProjectMemberRef = new Firebase(firebaseUrl + '/users/' + userId + '/projectMember');
        userProjectMemberRef.child(projectId).remove();

        groupMemberRef.child(userId).remove();
        getProjectMemberRef.child(userId).remove();
        addProjectRef.child(projectId).remove();

        projectActivity.removeMember(id, userId, projectId)
          //Start get project name
        var projectSource = projectName(orgId, projectId);
        projectSource.$loaded(function (value) {
          var projectValue = value.projectName;
          userNotification.removeMember(id, userId, projectValue, location);
        })

        //End get project name

      } //end function removeUsers

  }) //End boardCtrl
