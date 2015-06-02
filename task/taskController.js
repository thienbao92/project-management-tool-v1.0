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

.factory('firebaseChat', function (firebaseUrl, $firebaseArray) {

    return function (TaskId) {
        var url = firebaseUrl + '/task/' + TaskId + '/chat';
        var ref = new Firebase(url);
        var chat = $firebaseArray(ref);
        return chat
      } //End function
  }) // END firebaseChat

.factory('firebaseMember', function (firebaseUrl, $firebaseArray) {

    return function (id, field) {
        var url = firebaseUrl + '/' + field + '/' + id + '/member';
        var ref = new Firebase(url);
        var members = $firebaseArray(ref);
        return members;
      } //End function
  }) // END firebaseMember


.controller('taskCtrl', function ($scope, $mdDialog, firebaseTask, $stateParams, firebaseCheckList, firebaseChat, firebaseUrl, $firebaseArray, firebaseMember) {


    $scope.taskId = $stateParams.taskId;

    $scope.task = firebaseTask;

    $scope.close = function () {
      history.back();
    };

    //Check list function area

    $scope.checklist = firebaseCheckList($stateParams.taskId);

    $scope.checklist.$watch(function () {
      $scope.checklist.$loaded().then(function (checklists) {
        $scope.total = checklists.length;
        $scope.count = 0;
        angular.forEach(checklists, function (cl) {
          if (cl.isDone) {
            $scope.count += 1;
          }
        })
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

    // member function area

    function member(field, id) {
      field.$add({
        member: id
      }).then(function (data) {
        console.log(data);
      })
    };

    $scope.addMember = function (userId, orgId, projectId, listId, taskId) {
        $scope.memberOrg = firebaseMember(orgId, 'organization');
        $scope.memberProject = firebaseMember(projectId, 'project');
        $scope.memberList = firebaseMember(listId, 'list');
        $scope.memberTask = firebaseMember(taskId, 'task');

        //        $scope.memberTask.$add({
        //          member: userId
        //        }).then(function (data) {
        //          console.log(data);
        //        })

        member($scope.memberOrg, userId);
        member($scope.memberProject, userId);
        member($scope.memberList, userId);
        member($scope.memberTask, userId);



      } //end function addMember
      //END member function area
      //Chat-message area
    $scope.messages = firebaseChat($stateParams.taskId);
    $scope.sendMsg = function () {
        $scope.messages.$add({
          message: $scope.data.msg,
          sender: $scope.id
        })
      } //end function sendMsg

    //END chat-message area

  }) //End taskCtrl
