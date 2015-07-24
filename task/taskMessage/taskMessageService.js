(function () {
  'use strict';

  angular
    .module('task.message')
    .service('testTaskMessage', testTaskMessage);

  //////////////
  function testTaskMessage() {
    this.test = test;

    function test() {
      console.log('test thu coi co gi vui hehehe');
    }

  }; //End testTaskMessage
})();
