/**
 * myApp Module
 *
 * Description
 */
angular.module('myApp', [
    'ngMaterial',
//shared JS
    'myApp.services',
//controllers
    'list.Controller',
    'login.Controller',
    'login.Services',
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
        templateUrl: "authentication/login.html",
        controller: 'authCtrl'
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
        //profile page
        .state('board', {
            url: "/board",
            views: {
                '': {
                    templateUrl: "board/board.html"
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
})
