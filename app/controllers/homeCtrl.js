angular.module('shakespeareApp')

    // The home controller handles the home.tmpl.htm page
    .controller('homeCtrl', function ($scope, logicService, modelService, apiService, parseService) {

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
                parseService.showDictionary = true;
                parseService.filename = 'assets/plays/large/' + file;

            } else {
                parseService.showDictionary = false;
                parseService.filename = 'assets/plays/small/' + file;
            }
            parseService.title = title;
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
                parseService.showDictionary = true;
                parseService.filename = 'assets/plays/large/' + file;

            } else {
                parseService.showDictionary = false;
                parseService.filename = 'assets/plays/small/' + file;
            }
            parseService.title = title;
            logicService.navTo("/play");
        };

        $scope.clickBody = function () {
            parseService.prevLine = !parseService.prevLine;
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