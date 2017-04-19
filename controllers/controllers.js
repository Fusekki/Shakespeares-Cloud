angular.module('shakespeareApp')

// The home controller handles the home.tmpl.htm page


    .controller('homeCtrl', function ($scope, logicService, modelService, apiService, sharedService) {

        // $scope.active_cat = -1;

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
            // console.log(file);
            logicService.navTo("/play");

        }

    })

    .controller('connectCtrl', function ($scope, logicService, apiService) {
        // console.log('here');

        apiService.getData(function(response){
            var data = response.data;
            console.log(data);
        }, function(err) {
            console.log(err.status);
        });

    })

    .controller('playCtrl', function ($scope, logicService, apiService, sharedService, $sce) {
        // console.log('here');

        $scope.title = sharedService.title;



        apiService.getHTML(function(response){
            // $scope.play = sharedService.buildIndex(response);
            $scope.play = response.data;

            // $scope.play = [
            //     {text : response.data } ]
            // $scope.$broadcast('LOADED');
        }, function(err) {
            console.log(err.status);
        });

        $scope.myHilitor = new Hilitor("content");

        $scope.myHilitor.apply("highlight words");



    })

