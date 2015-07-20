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
    scope: {
      userId: '='
    },
    link: link,
    controller: 'navNotiCtrl'
  }
})

function link(scope, elem, attrs) {

}
