//ROUTES
var calibreApp = angular.module('shakespeareApp');

calibreApp.config(function ($routeProvider) {

    $routeProvider
        .when('/', {
            templateUrl: 'templates/home.tmpl.htm',
            controller: 'homeCtrl'
        })

        .when('/connect', {
            templateUrl: 'templates/connect.tmpl.htm',
            controller: 'connectCtrl'
        })

        .when('/play', {
            templateUrl: 'templates/play.tmpl.htm',
            controller: 'playCtrl'
        })

        // .when('/play', {
        //     templateUrl: 'assets/plays/alls_well_that_ends_well_FF.htm',
        //     controller: 'playCtrl'
        // })

});