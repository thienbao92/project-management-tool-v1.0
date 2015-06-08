/**
 * list.Controller Module
 *
 * Description
 */

angular.module('list.Controller', [])

.controller('listCtrl', function ($scope, $stateParams, getProjectName, firebaseList, task, firebaseTask, firebaseProject, $mdDialog, $rootScope, $location, $state, getDate, $filter) {

  //get list data from firebase

  $scope.projects = getProjectName($stateParams.orgId, $stateParams.projectId);


  $scope.lists = firebaseList($stateParams.projectId);
  $scope.data = {};

  $scope.addList = function (inputListName) {
      $scope.lists.$add({
        listName: inputListName,
        // listTheme: $scope.getListTheme(),
      }).then(function (data) {
        var listId = data.key();
        task.addTaskParent(listId);
      })
    } //end function addList

  //End list modification area
  $scope.task = firebaseTask;
  $scope.date = getDate;

  $scope.tasks = function (listId) {
    var tasks = firebaseTask(listId);
    return tasks;
  }

  //$scope.date = $filter('date')(new Date(), 'dd/MM/yyyy');

  //date time area
  //  var parser = datetime("yyyy-MM-dd");
  //  var date = parser.parse("2015-01-30");
  //  console.log(date);
  //END date time are
  $scope.addTask = function (listId, inputTaskName) {

      $scope.addTasks = firebaseTask(listId);

      $scope.addTasks.$add({
        taskName: inputTaskName,
        startDate: $scope.date,
        endDate: $scope.date
      })
    } //end function addTask


  $scope.goToTask = function (id, idList) {
      $state.go('task', {
        taskId: id,
        listId: idList,
        projectId: $stateParams.projectId
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
      'default': '200',
    });

  $mdThemingProvider.theme('list-bg-2')
    .backgroundPalette('teal', {
      'default': '300',
    });

  $mdThemingProvider.theme('list-bg-3')
    .backgroundPalette('lime', {
      'default': '300',
    });

  $mdThemingProvider.theme('list-bg-4')
    .backgroundPalette('orange', {
      'default': '300',
    });

  $mdThemingProvider.theme('list-bg-5')
    .backgroundPalette('brown', {
      'default': '300',
    });
})
