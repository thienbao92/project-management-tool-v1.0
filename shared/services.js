/**
 * myApp Module
 *
 * Description
 */
angular.module('myApp.services', [])

//fast console.log
.factory('firebaseRef', function () {
	return function(arrayData) {
		var ref = new Firebase('https://managementtool.firebaseio.com/'+arrayData);
        return ref;
	}	
})



