angular.module('shakespeareApp')
    .controller('errorCtrl', function ($scope, $timeout, $location, logicService) {
        $scope.category = logicService.category;
        $scope.search_term = logicService.search_term;
        $scope.counter = 5;
        var stopped;
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
        countdown();
    });