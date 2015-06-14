/**
 * navigation.Controller Module
 *
 * Description
 */

angular.module('navigation.Controller', [])

.controller('navCtrl', function ($rootScope, $state) {
    $rootScope.close = function () {
      history.back();
    };

    }) //End navCtrl
