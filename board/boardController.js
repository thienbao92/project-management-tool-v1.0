/**
 * board.Controller Module
 *
 * Description
 */

angular.module('board.Controller', [])




.controller('boardCtrl', function ($scope, $stateParams, firebaseUrl) {

    var projectId = $stateParams.projectId;

    var getProjectMemberRef = new Firebase(firebaseUrl + '/projectMember/' + projectId);


    $scope.addUsers = function (userId) {

        var orgId = $stateParams.orgId;
        var projectId = $stateParams.projectId;
        var url = firebaseUrl + '/users/' + userId + '/groupMember/';


        var addOrgRef = new Firebase(url);
        var addProjectRef = new Firebase(url + orgId);


        getProjectMemberRef.child(userId).set(true);
        addOrgRef.child(orgId).set(true);
        addProjectRef.child(projectId).set(true);
      } //end function addUsers

    $scope.projectMemberArray = [];





    getProjectMemberRef.on("value", function (snapshot) {
      snapshot.forEach(function (value) {
        $scope.projectMemberArray.push(value.key());
      })
    })


  }) //End boardCtrl
