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

        // $scope.selectCategory = function(e) {
        //     var str = e.target.innerText.toLowerCase();
        //     console.log(str);
        //     var el = e.target;
        //     console.log(el);
        //     // First fine the previously active li and remove active class
        //     var prev = $(".active", ".play_cat");
        //     $(prev).removeClass('active');
        //     $(el).addClass('active');
        //     $scope.active_cat = $("li.active").index();
        // };

        // $scope.searchCategories = function() {
        //     var selected_category = modelService.categories[$scope.active_cat];
        //     if (selected_category === "all") {
        //         return undefined;
        //     } else {
        //         return modelService.categories[$scope.active_cat];
        //     }
        // };

        $scope.openPlay = function(file) {
            sharedService.filename = 'assets/plays/' + file;
            // console.log(file);
            logicService.navTo("/play");

        }

        // $scope.getClass = function(category) {
        //     console.log('here');
        //     console.log(category);
        //     switch(category) {
        //         case 'comedy':
        //             return 'mix-category-1';
        //         case 'tragedy':
        //             return 'mix-category-3';
        //         case 'history':
        //             return 'mix-category-2';
        //     }
        //
        // }

        // $scope.applyFilter = function(index) {
        //     switch (index) {
        //         case 1:
        //             return "all"
        //         case 2:
        //             return 'shit';
        //         case 3:
        //             return 'fuck';
        //
        //     }
        // }
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



        apiService.getXML(function(response){
            $scope.play = response.data.toString();
        }, function(err) {
            console.log(err.status);
        });

        $scope.parseLine = function(line_of_text) {
            if (typeof(line_of_text) == 'string') {
                console.log(line_of_text);
                console.log(line_of_text.search('%s'));
                if (line_of_text.search('%s') !== -1) {
                    console.log('string found');
                    // var start = line_of_text.toString();
                    var start = line_of_text.replace("%s", "");
                    var finish = start.replace("%e", "").italics();
                    var html = $(finish);
                    console.log(html);
                    return html;
                } else {
                    console.log('string is text but characters not found');
                }
            } else
                console.log(typeof(line_of_text));

        };

    })

