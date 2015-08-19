/**
 * task.Controller Module
 *
 * Description
 */

angular.module('task')

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
    projectMember,
    taskMemberFactory,
    //activity injectors
    taskActivityServices,
    //taskNotification injectors
    taskNotificationServices,
     $mdSidenav
  ) {

    $scope.toggleRight = function () {
      $mdSidenav('right').toggle();
    };

    //Start get variables
    $scope.getSubjectId = $scope.id;
    var listId = $stateParams.listId;
    var taskId = $stateParams.taskId;
    //End get variables

    $scope.listDetail = getListDetail;
    $scope.taskId = $stateParams.taskId;
    $scope.tasks = getTask($stateParams.listId, $stateParams.taskId);

    //Check list function area
    $scope.users = firebaseUser;

    //Start get projectMember
    $scope.projectMemberArray = projectMember.projectMemberArray();
    //console.log($scope.projectMemberArray);
    //End get projectMember

    //Start check list area
    $scope.checklist = firebaseCheckList($stateParams.listId, $stateParams.taskId);

    taskCheckList.modifyCheckList($stateParams.listId, $stateParams.taskId);
    //End check list area

    $scope.data = {};
    $scope.addChecklist = addChecklist;

    function addChecklist() {
      $scope.checklist.$add({
        text: $scope.data.text
      }).then(addToActivities)
    } //end function addChecklist

    function addToActivities(data) {
      var value = $scope.checklist.$getRecord(data.key());
      var type = "addCheckList";
      var content = $scope.id + ' added checklist ' + value.text;
      taskActivityServices.add(type, content, $stateParams.taskId);
    } //End check list function area


    //Chat-message area
    $scope.messages = firebaseChat($stateParams.listId, $stateParams.taskId);
    $scope.sendMsg = function () {
        taskMessage.send($stateParams.listId, $stateParams.taskId, $scope.data.msg, $scope.id);
      } //End function

    $scope.senderIsMe = function (sender) {
        return ($scope.id == sender);
      }
      //END chat-message area

    //Start add task Member
    $scope.addTaskMember = function (memberId) {
        taskMember.addMember(listId, taskId, memberId);
      } //end function addTaskMember
    $scope.taskMember = taskMember.memberArray(listId, taskId);
    console.log($scope.taskMember);
    //End add task Member


  }) //End taskCtrl

.config(function ($mdThemingProvider) {
  $mdThemingProvider.theme('message-bg')
    .backgroundPalette('light-blue', {
      'default': '100',
    });
})
