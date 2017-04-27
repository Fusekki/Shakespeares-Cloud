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

        $scope.text="Sentence";
        $scope.sel_word = "Word";

        $scope.isActive = false;
        // $scope.title = sharedService.title;
        //
        // apiService.getHTML(function(response){
        //     $scope.play = response.data;
        // }, function(err) {
        //     console.log(err.status);
        // });
        var innerText;


        $scope.grabText = function($event) {
            var text = $event.target.innerText;
            text = text.toString().split(" ");
            var new_text = "";
            for (var x = 0; x < text.length; x++) {
                new_text += '<span class="word" ng-click="chooseWord($event)">' + text[x] + '</span> ';
            }
            $scope.text = new_text;
        }

        console.log($scope.trustedHtml);
        $scope.lookupDefinition = function() {
            console.log('going to look up ' + $scope.text);
        }

        $scope.testAlert = function() {
            console.log('test alert!!');
        }

        apiService.getDef(function (response) {
            // console.log(response);
            // console.log(response.data);
            var x2js = new X2JS();
            var xmlText = response.data;
            var jsonObj = x2js.xml_str2json( xmlText );
            console.log(jsonObj.entry_list);

            // console.log(jsonObj.entry_list.entry[0].def[2]);
        })

        $scope.chooseWord = function($event) {
            console.log($event.target.parentElement);

            $scope.sel_word = $event.target.innerHTML;
            $scope.isActive = !$scope.isActive;

            // console.log(typeof($event.target.innerText));
        }

        $scope.lookupWord = function($event) {
            console.log('Lookup word: ' + $event.target.innerHTML);
        }



    })

