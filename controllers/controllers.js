angular.module('calibreApp')

// The home controller handles the home.tmpl.htm page

    .controller('homeCtrl', function ($scope, logicService) {

        $scope.connect = function() {
                // var pathCategory = logicService.lowerCaseThis($scope.category);
                // $location.path("/results");
                console.log('button submitted');
                logicService.navTo("/connect");
        };
    })

    .controller('connectCtrl', function ($scope, logicService) {


    })
