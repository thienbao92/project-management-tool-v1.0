/**
 * board.Controller Module
 *
 * Description
 */

angular.module('board.Controller', [])

.controller('boardCtrl', function ($scope, $stateParams, firebaseUrl) {
    console.log($stateParams.projectId);
    $scope.addUsers = function (userId) {

        var orgId = $stateParams.orgId;
        var projectId = $stateParams.projectId;
        var url = firebaseUrl + '/users/' + userId + '/groupMember/';

        var addOrgRef = new Firebase(url);
        var addProjectRef = new Firebase(url + orgId);

        addOrgRef.child(orgId).set(true);
        addProjectRef.child(projectId).set(true);




      } //end function addUsers

  }) //End boardCtrl
