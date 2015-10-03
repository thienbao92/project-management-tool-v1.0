angular.module('timeline.Services', [])

.factory('dateToValue', function () {

    return function (date) {
        var dateValue = date;
        var splitAtt = dateValue.split('/');
        var day = splitAtt[0];
        var month = splitAtt[1];
        var year = splitAtt[2];

        var dateUTC = new Date(Date.UTC(year, month - 1, day));
        var miliseconds = dateUTC.getTime();
        var date = miliseconds / 86400000;
        return date;

      } //End function
  }) // END dateToValue

.factory('today', function () {
    var d = new Date();
    var day = d.getDate();
    var month = d.getMonth();
    var year = d.getFullYear();
    var dateUTC = new Date(Date.UTC(year, month + 1, day));
    var miliseconds = dateUTC.getTime();
    var date = dateUTC / 86400000;
    return date;
  }) // END today
