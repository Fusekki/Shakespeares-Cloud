angular.module('shakespeareApp')

// The home controller handles the home.tmpl.htm page
    .controller('homeCtrl', function ($scope, logicService, modelService, apiService, sharedService, $log) {

        $('.play_cards').mixItUp({
            load: {
                filter: 'all'
            }
        });

        $scope.submit = function () {
            console.log($scope.search_term);
            var file = modelService.searchModel($scope.search_term);
            sharedService.filename = 'assets/plays/' + file;
            logicService.navTo("/play");
        };

        $scope.getPlays = function () {
            return modelService.plays;
        };

        $scope.getCategories = function () {
            return modelService.categories;
        };

        $scope.openPlay = function (file, title) {
            sharedService.filename = 'assets/plays/' + file;
            sharedService.title = title;
            logicService.navTo("/play");

        }
        // var window_sizes = ['xs', 'xs+', 'sm', 'sm+', 'med', 'med+', 'lrg', 'lrg+'];
        // var size = logicService.getWindowSize();
        //
        //
        // $scope.getGaps = function () {
        //     if (size == 'lrg+') {
        //         return [1 , 2];
        //     }
        //     else if (size == 'lrg') {
        //         return [1];
        //     } else
        //         return 0;
        // }
        //
        // $log.log($scope.getGaps());

        // $scope.number = 2;


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

