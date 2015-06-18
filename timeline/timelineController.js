/**
 * timeline.Controller Module
 *
 * Description
 */

angular.module('timeline.Controller', [])

.controller('timelineCtrl', function ($scope) {
  $scope.data = [
    {
      "name": "List 1",
      "from": 0,
      "to": 2,
      "progress": 20
    },
    {
      "name": "List 2",
      "from": 2,
      "to": 10,
      "progress": 70
    }
  ];
  $scope.today = 125;
  }) //End timelineCtrl
