/**
 * myApp Module
 *
 * Description
 */
angular.module('myApp.services', [])

//fast console.log
.factory('$log', function () {
	return function(name) {
		console.log(name)
	}	
})



