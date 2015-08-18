angular.module('timeline', [])

.directive('timeline', function (today, $window, $timeout, dateToValue, $location) {
    return {
      restrict: 'E',
      replace: false,
      templateUrl: 'timelineDirective/timeline.html',
      link: link,
      controller: 'listCtrl'
    } //End returns

    function link(scope, elem, attrs) {
      var pixels = attrs.pixels;
      scope.pixels = pixels;
      scope.svgHeight = attrs.taskHeight;

      //Start timelineContainer Height
      $timeout(function () {
        scope.timelineContainerHeight = document.getElementById('timelineContainer').clientHeight + 'px';
      });
      //End timelineContainer Height

      //Start calculate min and max value of tasks
      var maxValue = today + 365;
      console.log('max value is: ' + maxValue * 86400000);

      var minValue = today - 365;
      console.log('min value is: ' + minValue * 86400000);
      //End calculate min and max value of tasks

      //Start auto scroll to position
      var scrollLocation = (today - 10) * 86400000;
      $location.hash(scrollLocation);

      var mainContainer = angular.element(document.getElementById('mainContainer'));
      mainContainer.$anchorScroll;
      //End auto scroll to position

      //Start calculate dateLine
      var previousDateValue = minValue;
      scope.startPositionX = function (x) {
        var startDate = dateToValue(x);

        var value = ((startDate) * pixels);
        return value;
      }
      scope.dateLine = [];
      for (i = previousDateValue; i < maxValue; i++) {
        scope.dateLine.push(i * 86400000)
      }
      //End calculate dateLine

      //Start calculate table width
      scope.tableWidth = scope.dateLine.length * pixels;
      console.log('table width is: ' + scope.tableWidth);
      //End calculate table width

      //Start calculate task and progress bar
      scope.taskBarWidth = function (start, end) {
          var startDate = dateToValue(start);
          var endDate = dateToValue(end);

          var width = (endDate - startDate + 1) * pixels;
          return width;
        } //end function taskBarWidth

      scope.progessBarWidth = function (start, end, progess) {
          var startDate = dateToValue(start);
          var endDate = dateToValue(end);

          var progressWidth = (endDate - startDate) * (progess / 100);
          var finalValue = (progressWidth + 1) * pixels;
          return finalValue;
        } //end function progessBar
        //End calculate task and progress bar width

      //Start calculate position of tasks
      scope.startPositionX = function (x) {
          var startDate = dateToValue(x);
          var value = ((startDate - previousDateValue) * pixels);
          return value;
        }
        //End calculate position of tasks
      console.log(today);
    }; //end function link
  }) //end Directive
