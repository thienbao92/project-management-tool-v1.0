/**
* myApp Module
*
* Description
*/
angular.module('myApp', [
//shared JS
    'myApp.services',
//controllers
    'list.Controller',
    'login.Controller',
    'board.Controller',
    'main.Controller',
    'organization.Controller',
    'profile.Controller',
    'task.Controller',
    'timeline.Controller',
//plugin dependecies
    'ui.router'
    ])

.config(function ($stateProvider, $urlRouterProvider) {

    $urlRouterProvider.otherwise("/main");

    //set up states

    $stateProvider
    //error page
    .state('error', {
        url: "/error",
        templateUrl: "/shared_template/404.html"
        })
    //main page
    .state('main', {
        url: "/main",
        views: {
        '': { templateUrl: "main/main.html"},
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
    //profile page
    .state('board', {
        url: "/board",
        views: {
        '': {templateUrl: "board/board.html"},
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
})
