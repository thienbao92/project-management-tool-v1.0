/**
 * list.Controller Module
 *
 * Description
 */

angular.module('list.Controller', [])

.controller('listCtrl', function ($scope, $stateParams, firebaseList, firebaseTask, $mdDialog, $rootScope, $location, $state, getDate) {




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

  var d = new Date();
  var date = d.toJSON();
  console.log(date);

  $scope.addTask = function (uid, nameOfList) {
      $scope.task.$add({
        taskName: $scope.data.taskName,
        listId: uid,
        listName: nameOfList,
        startDate: date,
        endDate: date

      })
    } //end function addTask


  $scope.goToTask = function (id) {
      $state.go('task', {
        taskId: id
      });
    } //end function goToTask


})
