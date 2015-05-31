/**
 * task.Controller Module
 *
 * Description
 */

angular.module('task.Controller', [])

.factory('firebaseCheckList', function (firebaseUrl, $firebaseArray) {

    return function (TaskId) {
        var url = firebaseUrl + '/task/' + TaskId + '/checklist';
        var ref = new Firebase(url);
        var checklist = $firebaseArray(ref);
        return checklist
      } //End function
  }) // END firebaseCheckList


.controller('taskCtrl', function ($scope, $mdDialog, firebaseTask, $stateParams, firebaseCheckList) {


    $scope.taskId = $stateParams.taskId;

    $scope.task = firebaseTask;

    $scope.close = function () {
      history.back();
    };

    //Check list function area
    $scope.checklist = firebaseCheckList($stateParams.taskId);
    $scope.data = {};
    $scope.addChecklist = function () {
        $scope.checklist.$add({
          text: $scope.data.text,
          isDone: false
        })
      } //end function addChecklist


    //End check list function area
  }) //End taskCtrl
