angular.module('taskActivity.services', [])

.factory('taskActivityFactory', function (firebaseUrl, $firebaseArray, $stateParams) {
    var taskId = $stateParams.taskId;
    var ref = new Firebase(firebaseUrl + '/taskActivity/' + taskId);
    var array = $firebaseArray(ref);
    return array;
  }) //End factory

.service('taskActivityServices', function (taskActivityFactory, locationPath) {

    this.add = function (type, content) {
        var taskActivity = taskActivityFactory;
        taskActivity.$add({
            type: type,
            content: content,
            location: locationPath
          }) //add notification
      } //End function

    this.taskNameChange = function () {

      } //End function
  }) //End service taskActivityServices
