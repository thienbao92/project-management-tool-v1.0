(function () {
  'use strict';

  angular
    .module('task.message')
    .controller('taskMessageCtrl', taskMessageCtrl);

  //////////////

  function taskMessageCtrl($scope, $stateParams) {
    var vm = this;
    //Start get values
    var senderId = $scope.senderId;
    var listId = $stateParams.listId;
    var taskId = $stateParams.taskId;
    console.log(senderId);
    //End get values

    //Start call function area
    vm.test1 = test;

    vm.test1();
    //End call function area

    //Start function expression area
    function test() {
      console.log('test calling function');
    }
    //End function expression area


  }; // end taskMessage controller
})();
