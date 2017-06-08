angular.module('shakespeareApp')

// The home controller handles the home.tmpl.htm page
    .controller('homeCtrl', function ($scope, logicService, modelService, apiService, sharedService) {

        var size = logicService.getWindowSize();

        $('.play_cards').mixItUp({
            load: {
                filter: 'all'
            }
        });

        $scope.submit = function (title) {
            // console.log($scope.search_term);
            var file = modelService.searchModel($scope.search_term);

            if (size === 'desk') {
                sharedService.showDictionary = true;
                sharedService.filename = 'assets/plays/large/' + file;

            } else {
                sharedService.showDictionary = false;
                sharedService.filename = 'assets/plays/small/' + file;
            }
            sharedService.title = title;
            logicService.navTo("/play");
        };

        $scope.getPlays = function () {
            return modelService.plays;
        };

        $scope.getCategories = function () {
            return modelService.categories;
        };

        $scope.openPlay = function (file, title) {
            if (size === 'desk') {
                sharedService.showDictionary = true;
                sharedService.filename = 'assets/plays/large/' + file;

            } else {
                sharedService.showDictionary = false;
                sharedService.filename = 'assets/plays/small/' + file;
            }
            sharedService.title = title;
            logicService.navTo("/play");
        };

        $scope.clickBody = function () {
            sharedService.prevLine = !sharedService.prevLine;
        }

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

    });