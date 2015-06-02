/**
 * list.Controller Module
 *
 * Description
 */

angular.module('list.Controller', [])

.controller('listCtrl', function ($scope, $stateParams, firebaseList, firebaseTask, firebaseProject, $mdDialog, $rootScope, $location, $state, getDate, $filter) {


  $scope.projects = firebaseProject;

  //get stateparams ID
  $scope.projectId = $stateParams.projectId;

  //get list data from firebase

  $scope.lists = firebaseList;
  $scope.data = {};

  $scope.addList = function () {
      $scope.lists.$add({
        listName: $scope.data.listName,
        listTheme: $scope.getListTheme(),
        project: $stateParams.projectId
      })
    } //end function addList

  //End list modification area
  $scope.task = firebaseTask;
  $scope.date = getDate;

  //$scope.date = $filter('date')(new Date(), 'dd/MM/yyyy');

  //date time area
  //  var parser = datetime("yyyy-MM-dd");
  //  var date = parser.parse("2015-01-30");
  //  console.log(date);
  //END date time are
  $scope.addTask = function (uid, projectId, organizationId, nameOfList) {
      $scope.task.$add({
        taskName: $scope.data.taskName,
        listId: uid,
        projectId: projectId,
        organizationId: organizationId,
        listName: nameOfList,
        startDate: $scope.date,
        endDate: $scope.date

      })
    } //end function addTask


  $scope.goToTask = function (id) {
      $state.go('task', {
        taskId: id
      });
    } //end function goToTask

  var paletteNumber = 0;

  $scope.getListTheme = function () {
    paletteNumber = (paletteNumber + 1) % 6;

    switch (paletteNumber) {
    case 1:
      return 'list-bg-1';
      break;
    case 2:
      return 'list-bg-2';
      break;
    case 3:
      return 'list-bg-3';
      break;
    case 4:
      return 'list-bg-4';
      break;
    case 5:
      return 'list-bg-5';
      break;
    default:
      return 'list-bg-default';
    }
  }

})

.config(function ($mdThemingProvider) {

  $mdThemingProvider.theme('list-bg-1')
    .backgroundPalette('purple', {
      'default': '500',
    });

  $mdThemingProvider.theme('list-bg-2')
    .backgroundPalette('teal', {
      'default': '500',
    });

  $mdThemingProvider.theme('list-bg-3')
    .backgroundPalette('blue', {
      'default': '500',
    });

  $mdThemingProvider.theme('list-bg-4')
    .backgroundPalette('deep-orange', {
      'default': '500',
    });

  $mdThemingProvider.theme('list-bg-5')
    .backgroundPalette('pink', {
      'default': '500',
    });

  $mdThemingProvider.theme('list-bg-default')
    .backgroundPalette('blue-grey', {
      'default': '500',
    });
})
