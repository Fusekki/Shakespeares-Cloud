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
        // $scope.title = sharedService.title;
        //
        // apiService.getHTML(function(response){
        //     $scope.play = response.data;
        // }, function(err) {
        //     console.log(err.status);
        // });
        var innerText;

        // $scope.$watch('text', function() {
        //    $scope.text = innerText;
        // });

        // $scope.$watch('text', function() {
        //    $scope.text = $sce.trustAsHtml($scope.grabText);
        // });
        // $scope.grabText = function($event) {
        //     console.log($event.target.innerHTML);
        //     console.log(typeof($event.target.innerText));
        //     var text = $sce.trustAsHtml($event.target.innerText);
        //     // console.log($scope.text);
        //     text = text.toString().split(" ");
        //     console.log(text);
        //     var new_text = "";
        //     for (var x = 0; x < text.length; x++) {
        //         console.log(text[x]);
        //         new_text += '<span class="word" ng-mouseover="chooseWord($event)">' + text[x] + '</span> ';
        //     }
        //
        //     $scope.text =  $sce.trustAsHtml('<button ng-click="testAlert()">Submit</button>');
        //     console.log($scope.text);
        //     // $scope.text = text;
        // }

        $scope.trustedHtml = $sce.trustAsHtml('<button ng-click="testAlert()">Submit</button>');

        $scope.lookupDefinition = function() {
            console.log('going to look up ' + $scope.text);
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

        // $scope.chooseWord = function($event) {
        //     console.log('here');
        //     console.log($event.target.innerHTML);
        //     console.log(typeof($event.target.innerText));
        //
        // }
        // var xmlDoc = loadXMLDoc("assets/plays/F-aww.xml");
        // var x2js = new X2JS();
        // var jsonObj = x2js.xml2json(xmlDoc);

        // $scope.htmlTooltip = $sce.trustAsHtml('I\'ve been made <b>bold</b>!');


        // $scope.textToShow = $scope.grabText();


    })

