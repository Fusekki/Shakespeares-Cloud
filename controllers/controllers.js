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
            var str = e.target.innerText.toLowerCase();
            console.log(str);
            var el = e.target;
            console.log(el);
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

        $scope.openPlay = function(file) {
            sharedService.filename = 'assets/plays/' + file;
            // console.log(file);
            logicService.navTo("/play");

        }

        $scope.getCategory = function(category) {
            switch(category) {
                case 'comedy':
                    return '';
                case 'tragedy':
                    return '';
                case 'history':
                    return '';
            }

        }

        $scope.applyFilter = function(index) {
            switch (index) {
                case 1:
                    return "all"
                case 2:
                    return 'shit';
                case 3:
                    return 'fuck';

            }
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

    .controller('playCtrl', function ($scope, logicService, apiService, sharedService, $sce) {
        console.log('here');

        // sharedService.parseString(sharedService.unsafestring);

        // $scope.unsafeString = sharedService.unsafestring;

        // $scope.play = function(src) {
        //     return $sce.trustAsResourceUrl(src);
        // }


        apiService.getXML(function(response){
            $scope.play = response.data.toString();
            // console.log($scope.play);
            // console.log(typeof(response));
            // $scope.play = response.data.play;
            // console.log(response.data.play);
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

