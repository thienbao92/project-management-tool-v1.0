/**
 * member.taskServices Module
 *
 * Description : services container saving task services
 */

angular.module('member.taskServices', [])

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

.factory('firebaseMember', function (firebaseUrl, $firebaseArray) {

    return function (id, field) {
        var url = firebaseUrl + '/' + field + '/' + id;
        var ref = new Firebase(url);
        var members = $firebaseArray(ref);
        return members;
      } //End function
  }) // END firebaseMember
