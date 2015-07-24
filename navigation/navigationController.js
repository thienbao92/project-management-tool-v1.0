/**
 * navigation.Controller Module
 *
 * Description
 */

angular.module('navigation.Controller', [])

.controller('navCtrl', function ($rootScope, $state, $scope) {
    $rootScope.close = function () {
      history.back();
    };

    $scope.userId = $scope.id;

  }) //End navCtrl
