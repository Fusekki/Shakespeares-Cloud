angular.module('shakespeareApp')

// The home controller handles the home.tmpl.htm page

    .controller('homeCtrl', function ($scope, logicService, modelService, apiService, sharedService) {

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

        // $scope.openPlay = function(slug) {
        //     console.log('opening play: ' + slug);
        //     apiService.play_slug = slug;
        //     apiService.getPlay(function(response){
        //         logicService.setCacheItem(slug, response.data);
        //         sharedService.unsafestring = response.data;
        //         logicService.navTo("/play");
        //         console.log(response.data);
        //     }, function(err) {
        //         console.log(err.status);
        //     });
        //
        // }

        $scope.openPlay = function(slug) {
            // console.log('opening play: ' + slug);
            // apiService.play_slug = slug;
            // apiService.getPlay(function(response){
            //     logicService.setCacheItem(slug, response.data);
            //     sharedService.unsafestring = response.data;
            //     logicService.navTo("/play");
            //     console.log(response.data);
            // }, function(err) {
            //     console.log(err.status);
            // });
            logicService.navTo("/play");

        }
    })

    .controller('connectCtrl', function ($scope, logicService, apiService) {
        console.log('here');

        apiService.getData(function(response){
            var data = response.data;
            console.log(data);
        }, function(err) {
            console.log(err.status);
        });

    })

    .controller('playCtrl', function ($scope, logicService, apiService, sharedService) {
        console.log('here');

        // sharedService.parseString(sharedService.unsafestring);

        $scope.unsafeString = sharedService.unsafestring;

        apiService.getXML(function(response){
            $scope.play = response.data.play;
            console.log(response.data.play);
        }, function(err) {
            console.log(err.status);
        });

        // $scope.unsafeString = sharedService.parseString(sharedService.unsafestring);
        // console.log($scope.unsafeString);
        //
        // function loadXMLDoc(dname) {
        //     // if (window.XMLHttpRequest) {
        //     //     console.log('here');
        //     //     xhttp=new XMLHttpRequest();
        //     // }
        //     // else {
        //     //     xhttp=new ActiveXObject("Microsoft.XMLHTTP");
        //     // }
        //     xhttp=new XMLHttpRequest();
        //     xhttp.open("GET",dname,false);
        //     xhttp.send();
        //     return xhttp.responseXML;
        // }

        //
        // var xmlDoc = loadXMLDoc("assets/plays/F-aww.xml");
        // var x2js = new X2JS();
        // var jsonObj = x2js.xml2json(xmlDoc);


    })
