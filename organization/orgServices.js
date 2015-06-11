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
      var ref = new Firebase(firebaseUrl + '/groupMember/' + groupId);
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

      var orgRef = new Firebase(firebaseUrl + '/organization');
      var projectRef = new Firebase(firebaseUrl + '/project');
      var projectUserRef = new Firebase(firebaseUrl + '/users/' + memberId + '/groupMember/' + groupId);

      var projectMemberRef = new Firebase(firebaseUrl + '/projectMember');
      var taskRef = new Firebase(firebaseUrl + '/task');
      var listRef = new Firebase(firebaseUrl + '/list');
      projectUserRef.on("value", function (snapshot) {
        snapshot.forEach(function (projectId) {
          var projectId = projectId.key();
          listRef.child(projectId).remove();

          var projectGroupMemberRef = new Firebase(firebaseUrl + '/projectMember');

          projectGroupMemberRef.child(projectId).remove();

          var listIdInUserProjectRef = new Firebase(firebaseUrl + '/users/' + memberId + '/groupMember/' + groupId + '/' + projectId);


          listIdInUserProjectRef.on("value", function (snapshot) {
            snapshot.forEach(function (listId) {
              var listId = listId.key();
              taskRef.child(listId).remove();
            })
          })

        })
      })

      projectRef.child(groupId).remove();
      orgRef.child(groupId).remove();

      ref.child(memberId).remove();
      userRef.child(groupId).remove();
    } //End function addMemberToGroup

  this.removeOrgfromMember = function (orgId) {

      var groupMemberRef = new Firebase(firebaseUrl + '/groupMember/' + orgId);
      groupMemberRef.on("value", function (members) {
        members.forEach(function (member) {
          var memberId = member.key();
          var userRef = new Firebase(firebaseUrl + '/users/' + memberId + '/groupMember');
          userRef.child(orgId).remove();
        })
        var groupMemberRef = new Firebase(firebaseUrl + '/groupMember/');
        groupMemberRef.child(orgId).remove();
      })
    } //End functionr emoveOrgfromMember

})

.service('projectServices', function (firebaseUrl) {

  this.addMemberToProject = function (projectId, memberId, orgId) {

      var userRef = new Firebase(firebaseUrl + '/users/' + memberId + '/groupMember/' + orgId);

      var projectMemberRef = new Firebase(firebaseUrl + '/projectMember/' + projectId);
      var listRef = new Firebase(firebaseUrl + '/list');

      projectMemberRef.child(memberId).set(true);

      listRef.child(projectId).set(true);

      userRef.child(projectId).set(true);
    } //End function

  this.removeMemberFromProject = function (projectId, memberId) {

      var userRef = new Firebase(firebaseUrl + '/users/' + memberId + '/groupMember');

      userRef.child(projectId).remove();
    } //End function


})



.factory('firebaseProject', function (firebaseUrl, $firebaseArray) {
    return function (uId) {
      var ref = new Firebase(firebaseUrl + '/project/' + uId);
      var array = $firebaseArray(ref);
      return array;
    }
  }) // END firebaseProject

.filter('filterByUserId', function () {
    return function (orgs, tags) {
      var filtered = [];
      angular.forEach(orgs, function (org) {
        if (tags.indexOf(org.$id) != -1) {
          filtered.push(org)
        }
      })
      return filtered;
    };
  }) // END filterByUserId
