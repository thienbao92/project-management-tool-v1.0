/**
 * myApp Module
 *
 * Description
 */
angular.module('myApp', [
    'ngMaterial',
    'angularMoment',
  '720kb.datepicker',
//shared JS
    'myApp.services',
  'task.Services',

  //services
    'organization.services',
    'list.Services',
  'login.Services',

//controllers
    'list.Controller',
    'login.Controller',
    'board.Controller',
    'main.Controller',
    'organization.Controller',
    'profile.Controller',
    'task.Controller',
    'timeline.Controller',
    'navigation.Controller',

//plugin dependecies
    'ui.router',
//angularfire
    'firebase'
    ])

.config(function ($stateProvider, $urlRouterProvider) {

  $urlRouterProvider.when('', 'main');
  $urlRouterProvider.otherwise("/main");

  //set up states

  $stateProvider
  //error page
    .state('error', {
    url: "/error",
    templateUrl: "/shared_template/404.html"
  })

  //authentication
  .state('authentication', {
    url: "/auth",
    templateUrl: "authentication/auth.html",
    controller: 'authCtrl'
  })

  .state('authentication.logIn', {
    url: "/login",
    templateUrl: "authentication/login.html",
    controller: "authCtrl"
  })

  .state('authentication.signUp', {
    url: "/signup",
    templateUrl: "authentication/signup.html",
    controller: "authCtrl"
  })




  .state('authentication.resetPassword', {
      url: "/signUp",
      templateUrl: "authentication/resetPassword.html",
      controller: "authCtrl"
    })
    //main page
    .state('main', {
      url: "/main",
      views: {
        '': {
          templateUrl: "main/main.html",
          controller: "mainCtrl"
        },
        'profile@main': {
          templateUrl: "profile/profile.html",
          controller: "profileCtrl"
        },
        'org@main': {
          templateUrl: "organization/organization.html",
          controller: "orgCtrl"
        }
      }
    })
    //board page
    .state('board', {
      url: "/board/:orgId/:projectId",
      views: {
        '': {
          templateUrl: "board/board.html",
          controller: "boardCtrl"
        },
        'list@board': {
          templateUrl: "list/list.html",
          controller: "listCtrl"
        },
        'timeline@board': {
          templateUrl: "timeline/timeline.html",
          controller: "timelineCtrl"
        }

      }
    })
    .state('task', {
      url: "/task/:projectId/:listId/:taskId",
      templateUrl: "task/task.html",
      controller: "taskCtrl",

    })
})

.config(function ($mdThemingProvider) {
  var lightBlueWhite = $mdThemingProvider.extendPalette('light-blue', {
    'contrastDefaultColor': 'light'
  });

  $mdThemingProvider.definePalette('light-blue-white', lightBlueWhite);
  $mdThemingProvider.theme('default')
    .primaryPalette('blue-grey')
    .accentPalette('light-blue-white')
    .backgroundPalette('blue-grey', {
      'default': '50',
      'hue-1': '500',
    });

  $mdThemingProvider.theme('white-bg')
    .backgroundPalette('grey');

  $mdThemingProvider.theme('google')
    .accentPalette('red');

  $mdThemingProvider.theme('progress-state')
    .primaryPalette('green')
    .accentPalette('yellow', {
      'default': '600'
    });
})

.directive('jsonDate', function ($filter) {
  return {
    restrict: 'A',
    require: 'ngModel',
    link: function (scope, element, attrs, ngModel) {

      //format text going to user (model to view)
      ngModel.$formatters.push(function (value) {
        var date = $filter('stringToDate')(value);
        return date.toString();
      });

      //format text from the user (view to model)
      ngModel.$parsers.push(function (value) {
        var date = new Date(value);
        if (!isNaN(date.getTime())) {
          return moment(date).format();
        }
      });
    }
  }
})
