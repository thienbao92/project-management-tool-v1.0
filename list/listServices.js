/**
 * list.Services Module
 *
 * Description
 */

angular.module('list.Services', [])

.factory('firebaseList', function (firebaseUrl, $firebaseArray) {

    var url = firebaseUrl + '/list';
    var ref = new Firebase(url);
    var list = $firebaseArray(ref);
    return list
  }) // END firebaseList

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
