(function () {
  'use strict';

  angular
    .module('task.member')
    .factory('taskMemberTester', taskMemberTester);

  function taskMemberTester() {
    var service = {

      test1: test1,
      test2: test2,
      test3: test3

    }
    return service;

    /////////////////////


    function test1() {
      console.log('test 1');
    };

    function test2() {
      console.log('this is test 2');
    };

    function test3() {
      console.log('this is test 3');
    }
  }; //end taskMemberTester
})();
