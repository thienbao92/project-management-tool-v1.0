/**
 * list.Services Module
 *
 * Description
 */

angular.module('list.Services', [])

.factory('firebaseList', function (firebaseUrl, $firebaseArray) {

    return function (projectId) {

      var ref = new Firebase(firebaseUrl + '/list/' + projectId);
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

  }) // END service task

.service('list', function (firebaseUrl) {
  this.addListToUser = function (userId, orgId, projectId, listId) {
    var ref = new Firebase(firebaseUrl + '/users/' + userId + '/groupMember/' + orgId + '/' + projectId);

    ref.child(listId).set(true);

  }
  return null;
})
