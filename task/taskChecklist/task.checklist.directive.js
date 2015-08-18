(function () {
  'use strict';

  angular
    .module('task.checklist')
    .directive('taskChecklist', taskChecklist);

  //////////////
  function taskChecklist() {

    var directive = {
      templateUrl: 'task/taskChecklist/task-checklist.html',
      restrict: 'E',
      scope: {

      },
      link: link,
      controller: 'taskChecklistCtrl'
    };
    return directive;

    function link(scope, element, attrs) {

    } // end function link
  }; // end function taskChecklist
})();
