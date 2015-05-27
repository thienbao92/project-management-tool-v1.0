/**
 * list.Controller Module
 *
 * Description
 */

angular.module('list.Controller', [])

.controller('listCtrl', function ($scope, $stateParams, firebaseList, firebaseTask, $mdDialog, $rootScope, $location) {
  //get stateparams ID
  $scope.projectId = $stateParams.projectId;

  //get list data from firebase

  $scope.list = firebaseList;
  $scope.data = {};

  $scope.addList = function () {
      $scope.list.$add({
        listName: $scope.data.listName,
        project: $stateParams.projectId
      })
    } //end function addList

  //End list modification area
  $scope.task = firebaseTask;

  $scope.addTask = function (uid) {
      $scope.task.$add({
        taskName: $scope.data.taskName,
        listId: uid
      })
    } //end function addTask

  $scope.showAdvanced = function ($event) {
    $mdDialog.show({
      controller: 'taskCtrl',
      templateUrl: 'task/task.html',
      //  targetEvent: $event,
    });

  }

  $scope.changeLocationPath = function (id) {

      $location.url('/task/' + id);

    } //end function getTaskId


})
