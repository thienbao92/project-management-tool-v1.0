/**
 * notification.controller Module
 *
 * Description
 */

angular.module('notification.controller', [])

.controller('navNotiCtrl', function ($scope, userNotificationRef) {
  $scope.notifications = userNotificationRef($scope.userId);
  console.log($scope.notifications);
})
