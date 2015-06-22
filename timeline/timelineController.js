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
        "from": '22-6-2015',
        "to": '24-6-2015',
        "progress": 20
    },
      {
        "name": "List 2",
        "from": '26-6-2015',
        "to": '30-6-2015',
        "progress": 50
    }
  ];
    $scope.today = 125;

    function dateToValue(date) {
      var dateValue = date;
      var splitAtt = dateValue.split('-');
      var day = splitAtt[0];
      var month = splitAtt[1];
      var year = splitAtt[2];

      var dateUTC = new Date(Date.UTC(year, month - 1, day));
      return dateUTC.getTime();
    }

    function startDate(startDate) {
      var date = dateToValue(startDate) / 86400000 - 16606;
      return date
    }

    $scope.positionX = function (date) {
        var dateValue = startDate(date);
        var position = 100 + (50 * dateValue);

        return position;
      } //end function positionX



    $scope.positionY = function (index) {
        var position = 105 + index * 35;
        return position;
      } //end function positionY

    function duration(startDate, endDate) {
      var duration = (dateToValue(endDate) - dateToValue(startDate)) / 86400000;
      return duration;
    }

    $scope.width = function (fromValue, toValue) {
        var dateDuration = duration(fromValue, toValue);
        var widthValue = 50 * dateDuration;
        return widthValue;
      } //end function width

    $scope.progressBar = function (progressValue, fromDate, toDate) {
        var progressBar = $scope.width(fromDate, toDate) * (progressValue / 100);
        return progressBar;
      } //end function progressBar

    //Start test thử time và date

    var today = new Date();

    today.setUTCHours(0);
    today.setUTCMinutes(0);
    today.setUTCSeconds(0);
    today.setUTCMilliseconds(0);
    console.log('today is ' + today.getTime());





    console.log(duration('13-05-2015', '20-05-2015'));

    var startDateInDate = dateToValue('22-06-2015') / 86400000;
    console.log(startDateInDate);



    //End test thử time và date


  }) //End timelineCtrl
