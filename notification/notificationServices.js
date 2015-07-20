angular.module('notification.services', [])

.factory('projectNotiFactory', function (firebaseUrl, $firebaseArray) {

  return function (projectId) {
      var ref = new Firebase(firebaseUrl + '/projectNotification/' + projectId);
      var array = $firebaseArray(ref);
      return array
    } //End function
})


.service('notification', function (projectNotiFactory) {
    var noti = this;

    noti.add = function (projectId, type, content, location) {
        var projectNoti = projectNotiFactory(projectId);
        projectNoti.$add({
            type: type,
            content: content,
            location: location
          }) //add notification
      } //End function
  }) //End services

.factory('userNotificationRef', function (firebaseUrl, $firebaseArray) {
  return function (template) {
    var ref = new Firebase(firebaseUrl + '/userNotification/' + template);
    var array = $firebaseArray(ref);
    return array;
  }
})

.service('userNotification', function (userNotificationRef, locationPath) {

  this.addMember = function (firstUser, secondUser, projectName, location) {
      var member = userNotificationRef(secondUser);
      var content = firstUser + ' added you to project ' + projectName;
      member.$add({
        subject: firstUser,
        type: 'addMember',
        content: content,
        location: location,
        isRead: false
      })
    } //End add member notification

  this.removeMember = function (firstUser, secondUser, projectName, location) {
    var member = userNotificationRef(secondUser);
    var content = firstUser + ' removed you from project ' + projectName;
    member.$add({
      subject: firstUser,
      type: 'removeMember',
      content: content,
      location: location
    })
  }

})
