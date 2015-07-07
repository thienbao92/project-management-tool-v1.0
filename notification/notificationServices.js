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
