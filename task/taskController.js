/**
 * task.Controller Module
 *
 * Description
 */

angular.module('task.Controller', [])

.controller('taskCtrl', function ($scope, $mdDialog, firebaseTask, $stateParams) {


    $scope.closeDialog = function () {
      // Easily hides most recent dialog shown...
      // no specific instance reference is needed.
      $mdDialog.hide();
      history.back();

    };

    $scope.task = firebaseTask;
    $scope.getId = $stateParams.taskId;
    console.log($stateParams.taskId);


  }) //End taskCtrl
