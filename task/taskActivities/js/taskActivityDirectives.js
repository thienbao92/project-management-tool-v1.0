/**
 * taskActivity.directive Module
 *
 * Description task Activity directive
 */

angular.module('taskActivity')

.directive('taskActivity', function () {
  return {
    templateUrl: './task/taskActivities/task-activity.html',
    restrict: 'E',
    scope: {
      subjectId: '='
    },
    link: link,
    controller: 'taskActivityCtrl'
  }
})

function link(scope, elem, attrs) {

}
