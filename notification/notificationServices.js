angular.module('notification.services', [])


.factory('notiFactory', function (firebaseUrl, $firebaseArray) {
  var ref = new Firebase(firebaseUrl + '/projectNotification');
  var array = $firebaseArray(ref);
  return array
})

.service('notification', function (notiFactory) {
    var noti = this;
    var resource = notiFactory;



    noti.addNoti = function (content) {
        resource.$add({
          title: "thu resources",
          content: content
        })
      } //End function

  }) //End services
