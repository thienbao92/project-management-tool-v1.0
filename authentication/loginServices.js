/**
* login.Services Module
*
* Description
*/

angular.module('login.Services', [])

.factory('firebaseAuth', function ($firebaseAuth) {
    var ref = new Firebase('https://managementtool.firebaseio.com/');
    var auth = $firebaseAuth(ref);
    return auth;
})// END firebaseAuth
