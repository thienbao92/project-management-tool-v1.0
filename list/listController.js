/**
 * list.Controller Module
 *
 * Description
 */

angular.module('list.Controller', [])

.controller('listCtrl', function ($scope, $stateParams, firebaseList, firebaseTask, firebaseProject, $mdDialog, $rootScope, $location, $state, getDate) {


  $scope.projects = firebaseProject;

  //get stateparams ID
  $scope.projectId = $stateParams.projectId;

  //get list data from firebase

  $scope.list = firebaseList;
  $scope.data = {};

  $scope.addList = function () {
      $scope.list.$add({
        listName: $scope.data.listName,
        listTheme: $scope.getListTheme(),
        project: $stateParams.projectId
      })
    } //end function addList

  //End list modification area
  $scope.task = firebaseTask;

  var date = moment().format();

  $scope.addTask = function (uid, nameOfList) {
      $scope.task.$add({
        taskName: $scope.data.taskName,
        listId: uid,
        listName: nameOfList,
        startDate: date,
        endDate: date

      })
    } //end function addTask


  $scope.goToTask = function (id) {
      $state.go('task', {
        taskId: id
      });
    } //end function goToTask

  var paletteNumber = 0;

  $scope.getListTheme = function () {
    paletteNumber = (paletteNumber + 1) % 5;

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
    default:
      return 'list-bg-5';
    }
  }

})

.config(function ($mdThemingProvider) {

  $mdThemingProvider.theme('list-bg-1')
    .backgroundPalette('purple', {
      'default': '50',
      'hue-1': '200',
    });

  $mdThemingProvider.theme('list-bg-2')
    .backgroundPalette('teal', {
      'default': '50',
      'hue-1': '300',
    });

  $mdThemingProvider.theme('list-bg-3')
    .backgroundPalette('lime', {
      'default': '50',
      'hue-1': '300',
    });

  $mdThemingProvider.theme('list-bg-4')
    .backgroundPalette('orange', {
      'default': '50',
      'hue-1': '300',
    });

  $mdThemingProvider.theme('list-bg-5')
    .backgroundPalette('brown', {
      'default': '50',
      'hue-1': '300',
    });
})
