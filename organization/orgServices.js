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

    var ref = new Firebase(firebaseUrl + '/project');
    var project = $firebaseArray(ref);
    return project;

    //    return function (id) {
    //        var ref = new Firebase(firebaseUrl + '/organization/' + id + '/project');
    //        var project = $firebaseArray(ref);
    //        return project;
    //      } //End function


  }) // END firebaseProject

.service('organization', function (firebaseUrl) {

  this.addMemberToGroup = function (groupId, memberId) {
      var ref = new Firebase(firebaseUrl + '/groupMember/' + groupId + '/member');
      var userRef = new Firebase(firebaseUrl + '/users/' + memberId + '/groupMember');
      var groupMemberRef = new Firebase(firebaseUrl + '/groupMember/');

      groupMemberRef.child(groupId).set(true);
      ref.child(memberId).set(true);
      userRef.child(groupId).set(true);
    } //End function


})
