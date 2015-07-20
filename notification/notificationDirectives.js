/**
 * notification.directive Module
 *
 * Description
 */

angular.module('notification.directive', [])

.directive('navNotification', function () {
  return {
    templateUrl: './notification/nav-notification.html',
    restrict: 'E',
    scope: {},
    link: function postLink($scope, elem, attrs) {

    }
  }
})
