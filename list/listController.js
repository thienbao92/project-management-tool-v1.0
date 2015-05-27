/**
 * list.Controller Module
 *
 * Description
 */

angular.module('list.Controller', [])

.controller('listCtrl', function ($scope, $stateParams) {
  $scope.projectId = $stateParams.projectId;
  console.log($scope.projectId);
})
