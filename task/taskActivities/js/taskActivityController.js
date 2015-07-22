/**
 * taskActivity.controller Module
 *
 * Description
 */

angular.module('taskActivity')

.controller('taskActivityCtrl', function (
    //common injectors
    $scope,
    $stateParams,
    locationPath,
    //taskServices injectors
    taskActivityFactory,
    taskActivityServices,
    //test injectors
    firebaseUrl,
    $firebaseArray,
    $firebaseObject,
    //task notification injectors
    taskNotificationServices,
    //taskMember
    taskMember,
    userNotificationRef
  ) {


    //Start get variables
    var listId = $stateParams.listId;
    var taskId = $stateParams.taskId;
    //End get variables

    var member = taskMember.memberArray(listId, taskId);

    function taskNotification(action, content) {
      member.forEach(function (userId) {
        var memberRef = userNotificationRef(userId);

        memberRef.$add({
          type: 'task',
          action: action,
          content: content
        })
      })
    };

    $scope.taskActivities = taskActivityFactory($stateParams.taskId);
    var ref = new Firebase(firebaseUrl + '/task/' + $stateParams.listId + '/' + $stateParams.taskId);
    var array = $firebaseArray(ref);
    var object = $firebaseObject(ref);
    object.$loaded(function (value) {
      console.log(value);
      var oldTaskNameVal = value.taskName;
      var oldStartDateVal = value.startDate;
      var oldEndDateVal = value.endDate;

      array.$watch(function (event) {
        console.log(event);

        if (event.event === 'child_changed') {
          var key = event.key;
          var arrayValue = array.$getRecord(key);
          var newVal = arrayValue.$value;
          console.log(newVal);

          if (key === "taskName") {
            console.log('old Value is: ' + oldTaskNameVal);
            console.log('new Value is: ' + newVal);
            var type = "changeTaskName";
            var content = $scope.subjectId + ' changed task name from ' + oldTaskNameVal + ' to ' + newVal;
            taskActivityServices.add(type, content, $stateParams.taskId);

            taskNotification(type, content);
          }
          if (key === "startDate") {
            console.log('old Value is: ' + oldStartDateVal);
            console.log('new Value is: ' + newVal);
            var type = "changeStartDate";
            var content = $scope.subjectId + ' changed start date from ' + oldStartDateVal + ' to ' + newVal;
            taskActivityServices.add(type, content, $stateParams.taskId);
          } //end if-key==="startDate" function
          if (key === "endDate") {
            console.log('old Value is: ' + oldEndDateVal);
            console.log('new Value is: ' + newVal);
            var type = "changeEndDate";
            var content = $scope.subjectId + ' changed end date from ' + oldEndDateVal + ' to ' + newVal;
            taskActivityServices.add(type, content, $stateParams.taskId);
          } //end if-key=== "endDate" function
        } //Check event.event whether it is child_changed
      })
    })

    var checkListRef = new Firebase(firebaseUrl + '/task/' + $stateParams.listId + '/' + $stateParams.taskId + '/checklist');
    var CLObject = $firebaseObject(checkListRef);
    var CLArray = $firebaseArray(checkListRef);
    CLObject.$loaded(function (value) {
      CLArray.$watch(function (event) {
        console.log(event);

        var arrayValue = CLArray.$getRecord(event.key);
        console.log(arrayValue);
        console.log(arrayValue.text + ' is ' + arrayValue.isDone);

        if (event.event === "child_changed") {

          if (arrayValue.isDone == true) {
            var type = "checklistDone";
            var content = $scope.subjectId + ' marked ' + arrayValue.text + ' as DONE';
            taskActivityServices.add(type, content, $stateParams.taskId);
          } //end if-arrayValue.isDone == true  function

          if (arrayValue.isDone == false) {
            var type = "checklistNotDone";
            var content = $scope.subjectId + ' marked ' + arrayValue.text + ' as NOT DONE';
            taskActivityServices.add(type, content, $stateParams.taskId);
          } //end if-arrayValue.isDone == true  function
        } //end if- function
      })
    })


  }) //End taskActivityCtrl
