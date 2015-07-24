(function () {
  'use strict';

  angular
    .module('task.message')
    .controller('taskMessageCtrl', taskMessageCtrl);

  //////////////

  /**
    task message controller
    @taskMessageCtrl
 */
  function taskMessageCtrl($scope, testTaskMessage) {
    testTaskMessage.test();
  };
})();
