angular.module('shakespeareApp')
// This controller handles the error.tmpl.htm
    .controller('errorCtrl', function ($scope, $timeout, $location, logicService) {
        // First populate the $scope with values from the logic service.
        $scope.category = logicService.category;
        $scope.search_term = logicService.search_term;
        $scope.counter = 5;
        var stopped;
        // This function is used to countdown from 5 for the automatic redirection.
        var countdown = function () {
            stopped = $timeout(function () {
                $scope.counter--;
                if ($scope.counter === 0) {
                    $('#redirection_notice').addClass('animated fadeIn');
                    $timeout(function () {
                        $location.path('/');
                    }, 1000);
                } else
                    countdown();
            }, 1000);
        };
        // This launches the countdown.
        countdown();
    });