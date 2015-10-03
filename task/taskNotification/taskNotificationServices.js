/**
 * taskNotification.services Module
 *
 * Description
 */

angular.module('taskNotification.services', [])

.service('taskNotificationServices', function (taskMember, firebaseUrl, $firebaseArray, userNotificationRef, taskMemberFactory) {
  this.test = function (listId, taskId) {
    var array = taskMember.memberArray(listId, taskId);
    //    array.forEach(function (value) {
    //      console.log(value);
    //    })
    return array
  }

  this.addNoti = function (userId) {

    var member = userNotificationRef(userId);
    member.$add({
      type: 'task',
      content: 'thu may lan 2'
    })

  }
})
