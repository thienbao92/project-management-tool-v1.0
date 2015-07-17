/**
 * task.Controller Module
 *
 * Description
 */

angular.module('task.Controller', [])

.controller('taskCtrl', function (
    //common injectors
    $scope,
    $stateParams,
    firebaseUrl, $firebaseArray,
    firebaseUser,
    $window,
    $firebaseObject,
    //task injector from taskServices.js
    getTask,
    getListDetail,
    //checklist injectors from taskCheckListServices.js
    firebaseCheckList,
    taskCheckList,
    //chat injector from taskChatServices.js
    firebaseChat,
    taskMessage,
    //members injector from taskMemberServices.js
    taskMember,
    projectMember
  ) {
    $scope.getSubjectId = $scope.id;

    $scope.listDetail = getListDetail;
    console.log(getListDetail);
    $scope.taskId = $stateParams.taskId;
    $scope.tasks = getTask;
    //Check list function area
    $scope.users = firebaseUser;

    //Start get projectMember
    $scope.projectMemberArray = projectMember.projectMemberArray();
    //console.log($scope.projectMemberArray);
    //End get projectMember

    //Start check list area
    $scope.checklist = firebaseCheckList;

    taskCheckList.modifyCheckList();
    //End check list area

    $scope.data = {};
    $scope.addChecklist = function () {
        $scope.checklist.$add({
          text: $scope.data.text
        })
      } //end function addChecklist

    //End check list function area

    //Chat-message area
    $scope.messages = firebaseChat;
    $scope.sendMsg = function () {
        taskMessage.send($scope.data.msg, $scope.id);
      } //End function

    $scope.senderIsMe = function (sender) {
        return ($scope.id == sender);
      }
      //END chat-message area

    //Start add task Member
    $scope.addTaskMember = function (memberId) {
        taskMember.addMember(memberId);
      } //end function addTaskMember
    $scope.taskMember = taskMember.memberArray();
    //End add task Member

    //Start test save task name
    var href = new Firebase(firebaseUrl + '/task/' + $stateParams.listId + '/' + $stateParams.taskId);
    var obj = $firebaseObject(href);
    var array = $firebaseArray(href);
    $scope.saveTaskName = function () {
        obj.taskName = $scope.data.taskName;
        obj.$save().then(function (ref) {
          console.log(ref);
        })
      } //end function saveTaskName
      //End test save task name

  }) //End taskCtrl

.config(function ($mdThemingProvider) {
  $mdThemingProvider.theme('message-bg')
    .backgroundPalette('light-blue', {
      'default': '100',
    });
})
