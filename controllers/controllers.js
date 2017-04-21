angular.module('shakespeareApp')

// The home controller handles the home.tmpl.htm page
    .controller('homeCtrl', function ($scope, logicService, modelService, apiService, sharedService) {

        $('.play_cards').mixItUp({
            load: {
                filter: 'all'
            }
        });

        $scope.submit = function() {
            console.log($scope.search_term);
            var file = modelService.searchModel($scope.search_term);
            sharedService.filename = 'assets/plays/' + file;
            logicService.navTo("/play");
        };

        $scope.getPlays = function() {
            return modelService.plays;
        };

        $scope.getCategories = function () {
            return modelService.categories;
        };

        $scope.openPlay = function(file, title) {
            sharedService.filename = 'assets/plays/' + file;
            sharedService.title = title;
            logicService.navTo("/play");

        }

    })

    .controller('connectCtrl', function ($scope, logicService, apiService) {

        apiService.getData(function(response){
            var data = response.data;
            console.log(data);
        }, function(err) {
            console.log(err.status);
        });

    })

    .controller('playCtrl', function ($scope, logicService, apiService, sharedService, $sce) {

        $scope.title = sharedService.title;

        apiService.getHTML(function(response){
            $scope.play = response.data;
        }, function(err) {
            console.log(err.status);
        });


    })

