angular.module('shakespeareApp')

// The home controller handles the home.tmpl.htm page

    .controller('homeCtrl', function ($scope, logicService, modelService) {

        $scope.active_cat = -1;

        $scope.connect = function() {
                // var pathCategory = logicService.lowerCaseThis($scope.category);
                // $location.path("/results");
                console.log('button submitted');
                logicService.navTo("/connect");
        };

        $scope.getPlays = function() {
            return modelService.plays;
        };

        $scope.getCategories = function () {
            return modelService.categories;
        };

        $scope.selectCategory = function(e) {
            var el = e.target;
            // First fine the previously active li and remove active class
            var prev = $(".active", ".play_cat");
            $(prev).removeClass('active');
            $(el).addClass('active');
            $scope.active_cat = $("li.active").index();
        };

        $scope.searchCategories = function() {
            var selected_category = modelService.categories[$scope.active_cat];
            if (selected_category === "all") {
                return undefined;
            } else {
                return modelService.categories[$scope.active_cat];
            }
        };
    })

    .controller('connectCtrl', function ($scope, logicService, apiService) {
        console.log('here');

        apiService.getData(function(response){
            var data = response.data;
            console.log(data);
        }, function(err) {
            console.log(err.status);
        });

        // realmService.getRealms(function(response){
        //     // console.log('Get Realms API Call.');
        //     setCacheStatus("realms", response.data);
        //     // Store in local array
        //     realmMap = response.data;
        //     // Send broadcast to controller
        //     $rootScope.$broadcast('realms_update');
        //     // console.log('just sent update');
        //     if (getCacheStatus("realms")) {
        //         // console.log('realms are now defined.');
        //         // console.log('realms are cached: ');
        //     }
        // }, function(err) {
        //     console.log(err.status);
        // });


    })
