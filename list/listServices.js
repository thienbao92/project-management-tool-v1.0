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

    var url = firebaseUrl + '/task';
    var ref = new Firebase(url);
    var task = $firebaseArray(ref);
    return task
  }) // END firebaseList

.run(function ($rootScope, $urlRouter) {
  $rootScope.$on('$locationChangeSuccess', function (evt) {
    // Halt state change from even starting
    evt.preventDefault();
    // Perform custom logic

  })
});
