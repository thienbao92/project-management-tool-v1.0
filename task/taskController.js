/**
 * task.Controller Module
 *
 * Description
 */

angular.module('task.Controller', [])

.controller('taskCtrl', function ($scope, $mdDialog, firebaseTask, $stateParams, firebaseCheckList, firebaseChat, firebaseUrl, $firebaseArray, firebaseMember, getTask, getListDetail) {

    $scope.listDetail = getListDetail($stateParams.projectId, $stateParams.listId);
    $scope.taskId = $stateParams.taskId;

    $scope.tasks = getTask($stateParams.listId, $stateParams.taskId);

    $scope.close = function () {
      history.back();
    };

    //Check list function area

    $scope.checklist = firebaseCheckList($stateParams.listId, $stateParams.taskId);

    $scope.checklist.$watch(function () {
      $scope.checklist.$loaded().then(function (checklists) {
        $scope.total = checklists.length;
        $scope.count = 0;
        angular.forEach(checklists, function (cl) {
          if (cl.isDone) {
            $scope.count += 1;
          }
        });

        $scope.percentage = ($scope.count / $scope.total) * 100;

      })

    });
    $scope.data = {};
    $scope.addChecklist = function () {
        $scope.checklist.$add({
          text: $scope.data.text
        })
      } //end function addChecklist

    //End check list function area

    //Chat-message area
    $scope.messages = firebaseChat($stateParams.listId, $stateParams.taskId);
    $scope.sendMsg = function () {
        $scope.messages.$add({
          message: $scope.data.msg,
          sender: $scope.id
        })
      } //end function sendMsg

    //END chat-message area

  }) //End taskCtrl
