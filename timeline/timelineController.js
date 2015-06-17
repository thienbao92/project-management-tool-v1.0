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
      "from": "2015-06-24",
      "to": "2015-07-13",
      "duration": 10
    },
    {
      "name": "List 2",
      "from": "2015-06-26",
      "to": "2015-07-15",
      "duration": 20
    }
  ];
  $scope.today = 125;
  }) //End timelineCtrl
