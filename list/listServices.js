/**
 * list.Services Module
 *
 * Description
 */

angular.module('list.Services', [])

.factory('firebaseList', function (firebaseUrl, $firebaseArray) {

    return function (projectId) {

      var ref = new Firebase(firebaseUrl + '/list' + projectId);
      var list = $firebaseArray(ref);
      return list
    }
  }) // END firebaseList

.factory('getProjectName', function (firebaseUrl, $firebaseArray) {
    return function (orgId, projectId) {
      var ref = new Firebase(firebaseUrl + '/project/' + orgId);
      var query = ref.orderByKey().equalTo(projectId);
      var project = $firebaseArray(query);
      return project;
    }

  }) // END getProjectName

.factory('firebaseTask', function (firebaseUrl, $firebaseArray) {

    return function (listId) {

      var ref = new Firebase(firebaseUrl + '/task/' + listId);
      var task = $firebaseArray(ref);
      return task
    }

  }) // END firebaseList


.service('task', function (firebaseUrl) {
    this.addTaskParent = function (listId) {
      var ref = new Firebase(firebaseUrl + '/task');

      ref.child(listId).set(true);
    }

    this.addTaskComponents = function (taskId) {
        var taskMemberRef = new Firebase(firebaseUrl + '/taskMember');
        var taskConversationRef = new Firebase(firebaseUrl + '/taskConversation');
        var taskCheckListRef = new Firebase(firebaseUrl + '/taskCheckList');

        taskMemberRef.child(taskId).set(true);
        taskConversationRef.child(taskId).set(true);
        taskCheckListRef.child(taskId).set(true);

      } //End function



  }) // END service task

.run(function ($rootScope, $urlRouter) {
  $rootScope.$on('$locationChangeSuccess', function (evt) {
    // Halt state change from even starting
    evt.preventDefault();
    // Perform custom logic

  })
});
