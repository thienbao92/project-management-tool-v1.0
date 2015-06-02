/**
 * myApp Module
 *
 * Description
 */
angular.module('myApp.services', [])

.factory('firebaseUrl', function () {
    var url = 'https://managementtool.firebaseio.com';
    return url
  }) // END ref


.factory('firebaseRef', function ($rootScope, firebaseUrl) {
  return function (arrayData) {
    var uid = $rootScope.id;
    var ref = new Firebase(firebaseUrl + '/users/' + uid + '/' + arrayData);
    return ref;
  }
})


.factory('firebaseRefNoId', function ($rootScope, firebaseUrl) {
  return function (arrayData, uid) {
    var ref = new Firebase(firebaseUrl + '/users/' + uid + '/' + arrayData);
    return ref;
  }
})

.factory('getDate', function () {
    var today = new Date();
    var dd = today.getDate();
    var mm = today.getMonth() + 1; //January is 0!
    var yyyy = today.getFullYear();

    if (dd < 10) {
      dd = '0' + dd
    }

    if (mm < 10) {
      mm = '0' + mm
    }

    today = dd + '/' + mm + '/' + yyyy;

    return today;
  }) // END getDate
