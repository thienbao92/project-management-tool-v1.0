/**
 * task.Services Module
 *
 * Description
 */

angular.module('task.Services', [])

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

.service('taskMember', function ($stateParams, firebaseUrl, $firebaseObject, $firebaseArray) {

    var listId = $stateParams.listId;
    var taskId = $stateParams.taskId;

    var ref = new Firebase(firebaseUrl + '/task/' + listId + '/' + taskId + '/member');

    this.addMember = function (memberId) {
      ref.child(memberId).set(true);
    }; //End function

    this.memberArray = function () {
        var taskMemberArray = [];
        var listId = $stateParams.listId;
        var taskId = $stateParams.taskId;

        var ref = new Firebase(firebaseUrl + '/task/' + listId + '/' + taskId + '/member');

        var obj = $firebaseArray(ref);
        obj.$watch(function (event) {
          angular.forEach(obj, function (value, key) {
            taskMemberArray.push(value.$id);
          })

          if (event.event === "child_removed") {
            var deletedValue = event.key;
            var value = taskMemberArray.indexOf(event.key);
            taskMemberArray.splice(value, 1);
          }
        });
        return taskMemberArray;
      } //End function


  }) //End service task Member


.factory('firebaseCheckList', function (firebaseUrl, $firebaseArray) {

    return function (listId, taskId) {
        var url = firebaseUrl + '/task/' + listId + '/' + taskId + '/checklist';
        var ref = new Firebase(url);
        var checklist = $firebaseArray(ref);
        return checklist
      } //End function
  }) // END firebaseCheckList

.factory('firebaseChat', function (firebaseUrl, $firebaseArray) {

    return function (listId, taskId) {
        var url = firebaseUrl + '/task/' + listId + '/' + taskId + '/chat';
        var ref = new Firebase(url);
        var chat = $firebaseArray(ref);
        return chat
      } //End function
  }) // END firebaseChat

.factory('firebaseMember', function (firebaseUrl, $firebaseArray) {

    return function (id, field) {
        var url = firebaseUrl + '/' + field + '/' + id;
        var ref = new Firebase(url);
        var members = $firebaseArray(ref);
        return members;
      } //End function
  }) // END firebaseMember
