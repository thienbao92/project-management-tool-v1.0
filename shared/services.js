/**
 * myApp Module
 *
 * Description
 */
angular.module('myApp.services', [])

.factory('firebaseUrl', function () {
        var url = 'https://managementtool.firebaseio.com/users/';
        return url
    }) // END ref


.factory('firebaseRef', function ($rootScope, firebaseUrl) {
    return function (arrayData) {
        var uid = $rootScope.id;
        var ref = new Firebase(firebaseUrl + uid + '/' + arrayData);
        return ref;
    }
})
