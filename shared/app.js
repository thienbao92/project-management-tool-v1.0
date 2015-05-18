/**
* myApp Module
*
* Description
*/
angular.module('myApp', [
    'myApp.services',
    'list.Controller',
    'login.Controller',
    'board.Controller',
    'main.Controller',
    'organization.Controller',
    'profile.Controller',
    'task.Controller',
    'timeline.Controller'
    'ui.router',




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
        'profile@main': {templateUrl: "profile/profile.html"},
        'org@main': {templateUrl: "organization/organization.html"}
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
        'timeline@board': {templateUrl: "timeline/timeline.html"}
        }        

        })
    //org page
    .state('main.org', {
        url: "/organization",
        templateUrl: "organization/organization.html"
        })
    
    
})
