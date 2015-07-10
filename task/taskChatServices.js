/**
 * chat.TaskServices Module
 *
 * Description
 */
angular.module('chat.TaskServices', [])

.factory('firebaseChat', function (firebaseUrl, $firebaseArray, $stateParams) {
    var listId = $stateParams.listId;
    var taskId = $stateParams.taskId;

    var url = firebaseUrl + '/task/' + listId + '/' + taskId + '/chat';
    var ref = new Firebase(url);
    var chat = $firebaseArray(ref);
    return chat
  }) // END firebaseChat

.service('taskMessage', function (firebaseChat) {
  var messages = firebaseChat;

  this.send = function (content, sender) {
    messages.$add({
      message: content,
      sender: sender
    }).error(function (error) {
      console.log(error);
    })
  }
})
