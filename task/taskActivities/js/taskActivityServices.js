angular.module('task.activity')

.factory('taskActivityFactory', function (firebaseUrl, $firebaseArray, $stateParams) {
    return function (taskId) {
      var ref = new Firebase(firebaseUrl + '/taskActivity/' + taskId);
      var array = $firebaseArray(ref);
      return array;
    }
  }) //End factory

.service('taskActivityServices', function (taskActivityFactory, locationPath) {

    this.add = function (type, content, taskId) {
        var taskActivity = taskActivityFactory(taskId);
        taskActivity.$add({
            type: type,
            content: content,
            location: locationPath
          }) //add notification
      } //End function

  }) //End service taskActivityServices
