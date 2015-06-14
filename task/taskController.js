/**
 * task.Controller Module
 *
 * Description
 */

angular.module('task.Controller', [])

.controller('taskCtrl', function ($scope, $mdDialog, firebaseTask, $stateParams, firebaseCheckList, firebaseChat, firebaseUrl, $firebaseArray, firebaseMember, firebaseUser, getTask, getListDetail) {

    $scope.listDetail = getListDetail($stateParams.projectId, $stateParams.listId);
    $scope.taskId = $stateParams.taskId;

    $scope.tasks = getTask($stateParams.listId, $stateParams.taskId);
    tasksVar = getTask($stateParams.listId, $stateParams.taskId);

    //Check list function area
    $scope.users = firebaseUser;

    var firebaseMembers = firebaseMember($stateParams.projectId, 'projectMember');

    $scope.projectMemberArray = [];
    firebaseMembers.$loaded(
      function () {
        firebaseMembers.forEach(function (member) {
          $scope.projectMemberArray.push(member.$id);
        });
      });

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

        var percentage = ($scope.count / $scope.total) * 100;
        $scope.percentage = percentage;

        var items = $scope.tasks.$getRecord($stateParams.taskId);

        items.percentOfChecklist = percentage;
        $scope.tasks.$save(items);


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
    $scope.senderIsMe = function (sender) {
        return ($scope.id == sender);
      }
      //END chat-message area


    //Test change List

    $scope.changeListParent = function () {
        var listId = $stateParams.listId;
        var taskId = $stateParams.taskId;
        var ref = new Firebase(firebaseUrl + '/task/' + listId + '/' + taskId);

        var newRef = new Firebase(firebaseUrl + '/task/' + '-JraoneUti-4BpHxZVnA');

        ref.on('value', function (snapshot) {
          var data = snapshot.val();
          newRef.push(data);
        })

      } //end function changeListParent



    //END test change List


  }) //End taskCtrl

.config(function ($mdThemingProvider) {
  $mdThemingProvider.theme('message-bg')
    .backgroundPalette('light-blue', {
      'default': '100',
    });
})
