//ROUTES
var calibreApp = angular.module('calibreApp');

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
});