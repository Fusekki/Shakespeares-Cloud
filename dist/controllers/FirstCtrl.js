angular.module('shakespeareApp')

    .controller('homeCtrl', function ($scope, logicService, modelService, apiService, sharedService) {

        var size = logicService.getWindowSize();

        $('.play_cards').mixItUp({
            load: {
                filter: 'all'
            }
        });

        $scope.submit = function (title) {
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

    });