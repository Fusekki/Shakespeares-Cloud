angular.module('shakespeareApp')

// The home controller handles the home.tmpl.htm page
    .controller('homeCtrl', function ($scope, logicService, modelService, apiService, sharedService) {

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

    .controller('playCtrl', function ($scope, logicService, apiService) {

        $scope.text="Sentence";
        $scope.sel_word = "Word";

        $scope.isActive = false;

        // Sets the right dictionary area to opacity 1 on true; 0 when false
        $scope.rt_Active = false;
        $scope.rm_Active = false;
        $scope.rb_Active = false;
        $scope.th_Active = false;
        $scope.i_done = false;

        var text;

        // $scope.title = sharedService.title;
        //
        apiService.getHTML(function(response){
            $scope.play = response.data;
        }, function(err) {
            console.log(err.status);
        });

        // This is triggered on a hover over a line in the play
        $scope.grabText = function($event) {
            console.log($event);
            $scope.th_Active = !$scope.th_Active;
            $scope.isActive = !$scope.isActive;
            $scope.i_done = !$scope.i_done;

            console.log($scope.th_Active);
            console.log($scope.isActive);
            text = $event.target.innerText;
            var split_text = text.toString().split(" ");
            var new_text = "";
            var new_word;
            for (var x = 0; x < split_text.length; x++) {
                // Here we are stripping punctuation-like characters out of the word
                new_word = split_text[x].replace(/([.,!?\\-])/,"");
                new_text += '<span class="word" ng-click="chooseWord($event)">' + new_word + '</span> ';
            }
            $scope.text = new_text;
        };

        console.log($scope.trustedHtml);
        $scope.lookupDefinition = function() {
            console.log('going to look up ' + $scope.text);
        };


        apiService.getDef(function (response) {
            // console.log(response);
            // console.log(response.data);
            var x2js = new X2JS();
            var xmlText = response.data;
            var jsonObj = x2js.xml_str2json( xmlText );
            console.log(jsonObj.entry_list);

            // console.log(jsonObj.entry_list.entry[0].def[2]);
        });

        // This triggers when the word is clicked in the sentence field.
        $scope.chooseWord = function($event) {
            console.log('choose word');
            $scope.sel_word = $event.target.innerHTML;
            // $scope.isActive = !$scope.isActive;
            // $scope.rt_Active = !$scope.rt_Active;
            if (!$scope.rt_Active) {
                $scope.rt_Active = !$scope.rt_Active;
            }
            // Check if rm and rb are open. If so, close them.
            // if ($scope.rm_Active) {
            //     $scope.rm_Active = !$scope.rm_Active;
            // }
            // if ($scope.rb_Active) {
            //     $scope.rb_Active = !$scope.rb_Active;
            // }
            if ($scope.def_cards) {
                $scope.def_cards.length = 0;
            }
            if ($scope.definition) {
                $scope.definition= "";
            }
        };

        // This triggers when the word is clicked when by itself.  It prompts the following API call.
        $scope.lookupWord = function($event) {
            if (!$scope.rm_Active) {
                $scope.rm_Active = !$scope.rm_Active;
            }

            // $scope.rm_Active = !$scope.rm_Active;
            var def_list = [];
            console.log('Lookup word: ' + $event.target.innerHTML);
            // Set the word
            apiService.word = $event.target.innerHTML;
            apiService.getDef(function (response) {
                var x2js = new X2JS();
                var xmlText = response.data;
                var jsonObj = x2js.xml_str2json( xmlText );
                var entries = jsonObj.entry_list;
                console.log(entries);
                console.log(entries.entry);
                // Here we cycle through the results and push the relevant information to the object array.
                // t = transitive verb / i = intransitive verb
                if ('entry' in entries) {
                    console.log('here');
                    console.log(entries.entry.length);
                    if (entries.entry.length) {
                        console.log('here now');
                        for(var x = 0; x < entries.entry.length; x++) {
                            console.log(x);
                            var def = entries.entry[x].def;
                            console.log(def);
                            // console.log(typeof(def.dt));
                            if (typeof(def.dt) == 'object') {
                                for (var i = 0; i < def.dt.length + 1; i++ ) {
                                    console.log(i);
                                    console.log(def.dt[i]);
                                    if (typeof(def.dt[i]) == 'string' && def.dt[i].length > 1) {
                                        def_list.push(def.dt[i].replace(/^:/, ""));

                                    } else if (typeof(def.dt[i]) == 'object' && def.dt[i].length > 1) {
                                        def_list.push(def.dt.__text.replace(/^:/, ""));
                                    }
                                }
                            } else if (def.dt.__text)  {
                                def_list.push(def.dt.__text.replace(/^:/, ""));
                                // def_list.push(def.dt.replace(/^:/, ""));

                            } else {
                                console.log(def.dt);
                            }
                        }
                    } else {
                        console.log('in else');
                        console.log(entries.entry.def.dt);
                        def_list.push(entries.entry.def.dt.replace(/^:/, ""));
                    }

                    $scope.def_cards = def_list;

                }

            }, function (err) {
                console.log(err.status);
            });

        }
        // This is triggered when a def_card is clicked.
        $scope.displayDef = function(def) {
            console.log('display def.');
            if (!$scope.rb_Active) {
                $scope.rb_Active = !$scope.rb_Active;
            }
            // $scope.rb_Active = !$scope.rb_Active;
            $scope.definition = def;
        }

    });

