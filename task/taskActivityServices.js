angular.module('task.activities', [])

.factory('taskActivityFactory', function (firebaseUrl, $firebaseArray) {
    return function (taskId, type, content, location) {
        var ref = new Firebase(firebaseUrl + '/taskActivity/' + taskId);
        var array = $firebaseArray(ref);
        return array;
      } //End function

  }) //End factory

.service('taskActivityServices', function (taskActivityFactory) {
  this.add = function (taskId, type, content, location) {
      var taskActivity = taskActivityFactory(taskId);
      taskActivity.$add({
          type: type,
          content: content,
          location: location
        }) //add notification
    } //End function
})

.service('taskActivity', function (taskActivityServices, locationPath, $stateParams) {


})
