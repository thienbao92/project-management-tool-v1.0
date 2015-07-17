/**
 * chat.TaskServices Module
 *
 * Description
 */
angular.module('chat.TaskServices', [])

.factory('firebaseChat', function (firebaseUrl, $firebaseArray, $stateParams) {
    return function (listId, taskId) {
      var url = firebaseUrl + '/task/' + listId + '/' + taskId + '/chat';
      var ref = new Firebase(url);
      var chat = $firebaseArray(ref);
      return chat
    }
  }) // END firebaseChat

.service('taskMessage', function (firebaseChat) {

  this.send = function (listId, taskId, content, sender) {
    var messages = firebaseChat(listId, taskId);
    messages.$add({
      message: content,
      sender: sender
    })
  }
})
