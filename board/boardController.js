/**
 * board.Controller Module
 *
 * Description
 */

angular.module('board.Controller', [])




.controller('boardCtrl', function ($rootScope, $scope, $stateParams, firebaseUrl, $firebaseArray, filterUsersByArray) {

    var projectId = $stateParams.projectId;

    var getProjectMemberRef = new Firebase(firebaseUrl + '/projectMember/' + projectId);

    $scope.projectMember = $firebaseArray(getProjectMemberRef);


    $scope.memberProfiles = filterUsersByArray($scope.projectMember);

    $scope.addUsers = function (userId) {

        var orgId = $stateParams.orgId;
        var groupMemberRef = new Firebase(firebaseUrl + '/groupMember/' + orgId);
        var projectId = $stateParams.projectId;
        var url = firebaseUrl + '/users/' + userId + '/groupMember/';


        var addOrgRef = new Firebase(url);
        var addProjectRef = new Firebase(url + orgId);

        groupMemberRef.child(userId).set(true);
        getProjectMemberRef.child(userId).set(true);
        //addOrgRef.child(orgId).set(true);
        addProjectRef.child(projectId).set(true);
      } //end function addUsers

    $scope.removeUsers = function (userId) {

        var orgId = $stateParams.orgId;
        var groupMemberRef = new Firebase(firebaseUrl + '/groupMember/' + orgId);
        var projectId = $stateParams.projectId;
        var url = firebaseUrl + '/users/' + userId + '/groupMember/';


        var addOrgRef = new Firebase(url);
        var addProjectRef = new Firebase(url + orgId);


        groupMemberRef.child(userId).remove();
        getProjectMemberRef.child(userId).remove();
        //addOrgRef.child(orgId).remove();
        addProjectRef.child(projectId).remove();



      } //end function removeUsers
    $scope.projectMemberArray = [];


    getProjectMemberRef.on("value", function (snapshot) {
      snapshot.forEach(function (value) {
        $scope.projectMemberArray.push(value.key());
        $scope.test = value.key();
      })
    })
    getProjectMemberRef.on("child_removed", function (snapshot) {
      var deletedValue = snapshot.key();
      console.log(deletedValue);
    })


    //Test drag and drop
    $scope.logEvent = function (message, event) {
      console.log(message, '(triggered by the following', event.type, 'event)');
      console.log(event);
    };

    $scope.containers = {};

    $scope.log = function (message) {
        console.log(message);
      } //end function log


  }) //End boardCtrl
