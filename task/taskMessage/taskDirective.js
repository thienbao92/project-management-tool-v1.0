(function () {
  'use strict';

  angular
    .module('task.message')
    .directive('taskMessage', taskMessage);

  //////////////
  function taskMessage() {

    var directive = {
      templateUrl: 'task/taskMessage/task-message.html',
      restrict: 'EA',
      scope: {

      },
      link: link,
      controller: 'taskMessageCtrl'
    };
    return directive;

    function link(scope, element, attrs) {

    } // end function link
  }; // rnd function taskMessage
})();
