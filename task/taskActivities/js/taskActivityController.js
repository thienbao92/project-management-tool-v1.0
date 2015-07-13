/**
 * taskActivity.controller Module
 *
 * Description
 */

angular.module('taskActivity.controller', [])

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
    $firebaseObject
  ) {
    console.log($scope.subjectId);
    $scope.taskActivities = taskActivityFactory;
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

          if (key === "taskName") {
            console.log('old Value is: ' + oldTaskNameVal);
            console.log('new Value is: ' + newVal);
            var type = "changeTaskName";
            var content = $scope.subjectId + ' changed task name from ' + oldTaskNameVal + ' to ' + newVal;
            taskActivityServices.add(type, content);
          }
          if (key === "startDate") {
            console.log('old Value is: ' + oldStartDateVal);
            console.log('new Value is: ' + newVal);
            var type = "changeStartDate";
            var content = $scope.subjectId + ' changed start date from ' + oldStartDateVal + ' to ' + newVal;
            taskActivityServices.add(type, content);
          } //end if-key==="startDate" function
          if (key === "endDate") {
            console.log('old Value is: ' + oldEndDateVal);
            console.log('new Value is: ' + newVal);
            var type = "changeEndDate";
            var content = $scope.subjectId + ' changed end date from ' + oldEndDateVal + ' to ' + newVal;
            taskActivityServices.add(type, content);
          } //end if-key=== "endDate" function
        } //Check event.event whether it is child_changed
      })
    })


  }) //End taskActivityCtrl
