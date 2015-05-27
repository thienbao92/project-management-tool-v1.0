/**
 * organization.services Module
 *
 * Description
 */

angular.module('organization.services', [])


.factory('firebaseOrg', function (firebaseUrl, $firebaseArray) {
    var ref = new Firebase(firebaseUrl + '/organization');
    var organization = $firebaseArray(ref);
    return organization;
  }) // END firebaseOrg

.factory('firebaseProject', function (firebaseUrl, $firebaseArray) {
    //
    //    var ref = new Firebase(firebaseUrl + '/project');
    //    var project = $firebaseArray(ref);
    //    return project;

    return function (id) {
        var ref = new Firebase(firebaseUrl + '/organization/' + id + '/project');
        var project = $firebaseArray(ref);
        return project;
      } //End function



  }) // END firebaseProject
