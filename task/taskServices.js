/**
 * task.Services Module
 *
 * Description
 */

angular.module('task.Services', [
  'chat.TaskServices',
  'member.taskServices'
])

.factory('getListDetail', function ($firebaseArray, firebaseUrl) {

    return function (projectId, listId) {
        var ref = new Firebase(firebaseUrl + '/list/' + projectId);
        var query = ref.orderByKey().equalTo(listId);
        var listDetail = $firebaseArray(query);
        return listDetail;
      } //End function
  }) // END getListDetail


.factory('getTask', function (firebaseUrl, $firebaseArray) {

    return function (listId, taskId) {
        var ref = new Firebase(firebaseUrl + '/task/' + listId);
        var query = ref.orderByKey().equalTo(taskId);
        var tasks = $firebaseArray(query);
        return tasks
      } //End function
  }) // END getTask


.factory('firebaseCheckList', function (firebaseUrl, $firebaseArray) {
    return function (listId, taskId) {
        var url = firebaseUrl + '/task/' + listId + '/' + taskId + '/checklist';
        var ref = new Firebase(url);
        var checklist = $firebaseArray(ref);
        return checklist
      } //End function
  }) // END firebaseCheckList

