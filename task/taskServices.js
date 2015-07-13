/**
 * task.Services Module
 *
 * Description
 */

angular.module('task.Services', [

  'chat.TaskServices',
  'member.taskServices',
  'checkList.TaskServices'
])

.factory('getListDetail', function ($firebaseArray, firebaseUrl, $stateParams) {

    var listId = $stateParams.listId;
    var projectId = $stateParams.projectId;

    var ref = new Firebase(firebaseUrl + '/list/' + projectId);
    var query = ref.orderByKey().equalTo(listId);
    var listDetail = $firebaseArray(query);
    return listDetail;

  }) // END getListDetail

.factory('getTask', function (firebaseUrl, $firebaseArray, $stateParams) {
    var listId = $stateParams.listId;
    var taskId = $stateParams.taskId;
    var ref = new Firebase(firebaseUrl + '/task/' + listId);
    var query = ref.orderByKey().equalTo(taskId);
    var tasks = $firebaseArray(query);
    return tasks
  }) // END getTask
