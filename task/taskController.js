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


.controller('taskCtrl', function ($scope, $mdDialog, firebaseTask, $stateParams, firebaseCheckList, firebaseUrl, $firebaseArray) {


    $scope.taskId = $stateParams.taskId;

    $scope.task = firebaseTask;

    $scope.close = function () {
      history.back();
    };

    //Check list function area
    $scope.total;

    $scope.checklist = firebaseCheckList($stateParams.taskId);

    $scope.checklist.$watch(function () {

      $scope.checklist.$loaded().then(function (x) {
        $scope.total = x.length;
      })

    });


    $scope.data = {};
    $scope.addChecklist = function () {
        $scope.checklist.$add({
          text: $scope.data.text
        })
      } //end function addChecklist




    angular.forEach($scope.checklist, function (value, key) {
      total += value.text;
    })


    //End check list function area
  }) //End taskCtrl
