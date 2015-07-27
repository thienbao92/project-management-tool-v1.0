(function () {
  'use strict';

  angular
    .module('task.message')
    .controller('taskMessageCtrl', taskMessageCtrl);

  //////////////

  function taskMessageCtrl(
    $scope,
    $stateParams,
    firebaseUrl,
    $firebaseArray
  ) {
    var vm = this;
    //Start get values
    var senderId = $scope.senderId;
    var listId = $stateParams.listId;
    var taskId = $stateParams.taskId;
    console.log(senderId);
    //End get values

    //Start message Array
    var ref = new Firebase(firebaseUrl + '/task/' + listId + '/' + taskId + '/chat');
    var messageArray = $firebaseArray(ref);
    //End message Array
    //Start call function area

    $scope.messages = messageArray;
    $scope.data = {};
    $scope.test = "cdscmcksdmckcm";
    $scope.addMsg = addMessage;
    $scope.senderIsMe = senderIsMe;
    //add message function

    //End call function area

    //Start function expression area
    //Start add message functions
    function addMessage() {
      messageArray.$add({
        message: $scope.data.msg,
        sender: senderId
      })
    }
    //End add message functions
    //Start senderIsMe
    function senderIsMe(sender) {
      return (senderId == sender);
    }
    //End senderIsMe
    //End function expression area
  }; // end taskMessage controller
})();
