/**
 * organization.services Module
 *
 * Description
 */

angular.module('organization.services', [])

.factory('firebaseOrg', function (firebaseUrl, $firebaseArray) {
    var ref = new Firebase(firebaseUrl + '/organization');
    //var query = ref.orderByKey().equalTo(filterArray);
    var organization = $firebaseArray(ref);
    return organization;
  }) // END firebaseOrg

.service('organization', function (firebaseUrl) {

  this.addMemberToGroup = function (groupId, memberId) {
      var ref = new Firebase(firebaseUrl + '/groupMember/' + groupId + '/member');
      var userRef = new Firebase(firebaseUrl + '/users/' + memberId + '/groupMember');
      var groupMemberRef = new Firebase(firebaseUrl + '/groupMember/');
      var projectRef = new Firebase(firebaseUrl + '/project');

      projectRef.child(groupId).set(true);
      groupMemberRef.child(groupId).set(true);
      ref.child(memberId).set(true);
      userRef.child(groupId).set(true);
    } //End function addMemberToGroup

  this.removeOrg = function (groupId, memberId) {
      var ref = new Firebase(firebaseUrl + '/groupMember/' + groupId + '/member');
      var userRef = new Firebase(firebaseUrl + '/users/' + memberId + '/groupMember');
      var groupMemberRef = new Firebase(firebaseUrl + '/groupMember/');
      var orgRef = new Firebase(firebaseUrl + '/organization');
      var projectRef = new Firebase(firebaseUrl + '/project');

      projectRef.child(groupId).remove();
      orgRef.child(groupId).remove();
      groupMemberRef.child(groupId).remove();
      ref.child(memberId).remove();
      userRef.child(groupId).remove();
    } //End function addMemberToGroup
})


.factory('firebaseProject', function (firebaseUrl, $firebaseArray) {

    return function (uId) {

      var ref = new Firebase(firebaseUrl + '/project/' + uId);
      var array = $firebaseArray(ref);
      return array;
    }

  }) // END firebaseProject

.filter('orgFilterTest', function (firebaseOrg) {
  return function (orgs, tags) {
    var filtered = [];
    //    return orgs.filter(function (org) {
    //      for (var i in org.$id) {
    //        if (firebaseOrg.$indexFor(i) != -1) {
    //          return false;
    //        }
    //      }
    //      return true;
    //    })

    angular.forEach(orgs, function (org) {
      if (tags.indexOf(org.$id) != -1) {
        filtered.push(org)
      }

    })

    return filtered;
  };
})
