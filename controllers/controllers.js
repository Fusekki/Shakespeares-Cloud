angular.module('shakespeareApp')

// The home controller handles the home.tmpl.htm page
    .controller('homeCtrl', function($scope, logicService, modelService, apiService, sharedService) {

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

        $scope.getCategories = function() {
            return modelService.categories;
        };

        $scope.openPlay = function(file, title) {
            sharedService.filename = 'assets/plays/' + file;
            sharedService.title = title;
            logicService.navTo("/play");

        }

        $scope.clickBody = function() {
            sharedService.prevLine = !sharedService.prevLine;
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

    .controller('connectCtrl', function($scope, logicService, apiService) {

        apiService.getData(function(response) {
            var data = response.data;
            console.log(data);
        }, function(err) {
            console.log(err.status);
        });

    })

    .controller('playCtrl', function($scope, logicService, apiService, sharedService) {

        // This is just used once for the chooseWord function when run for the first time.
        var hasClicked = false;

        $scope.dictionary = {
            dict_visible: false,
            dict_right_top_visible: false,
            dict_right_middle_visible: false,
            dict_right_bottom_visible: false,
            step_two_visible: false,
            step_three_visible: false,
            step_one_done: false,
            step_three_done: false,
            text: "Sentence",
            sel_word: "Word",
            btnText: "Examine"
        }



        apiService.getHTML(function(response) {
            $scope.play = response.data;
        }, function(err) {
            console.log(err.status);
        });

        // This triggers when the Examine button is clicked in the tooltip.
        $scope.lookupDefinition = function($event) {

            // Change the appearance of the button

            $scope.btnClicked = !$scope.btnClicked;

            if ($scope.btnClicked) {
                $scope.dictionary.btnText = "Unexamine";
                console.log('going to look up sentence');
                console.log($event);
                $scope.examinedText = $scope.dictionary.text;

                if (!$scope.dictionary.step_two_visible) {
                    $scope.dictionary.step_two_visible = !$scope.dictionary.step_two_visible;
                }
                if (!$scope.dictionary.dict_visible) {
                    $scope.dictionary.dict_visible = !$scope.dictionary.dict_visible;
                }

                if ($scope.dictionary.dict_right_top_visible) {
                    $scope.dictionary.dict_right_top_visible = !$scope.dictionary.dict_right_top_visible;
                }

                if ($scope.dictionary.dict_right_middle_visible) {
                    $scope.dictionary.dict_right_middle_visible = !$scope.dictionary.dict_right_middle_visible;
                }

                if ($scope.dictionary.dict_right_bottom_visible) {
                    $scope.dictionary.dict_right_bottom_visible = !$scope.dictionary.dict_right_bottom_visible;
                }

                if (!$scope.dictionary.step_one_done) {
                    $scope.dictionary.step_one_done = !$scope.dictionary.step_one_done;
                }

                if ($scope.dictionary.step_two_done) {
                    $scope.dictionary.step_two_done = !$scope.dictionary.step_two_done;
                }
                if ($scope.dictionary.step_three_done) {
                    $scope.dictionary.step_three_done = !$scope.dictionary.step_three_done;
                }

                console.log($scope.dictionary.step_two_visible);
                console.log($scope.dictionary.dict_visible);
            } else {
                $scope.dictionary.btnText = 'Examine';
                $scope.examineText = "";

                if ($scope.dictionary.dict_visible) {
                    $scope.dictionary.dict_visible = !$scope.dictionary.dict_visible;
                }

                if ($scope.dictionary.step_two_done) {
                    $scope.dictionary.step_two_done = !$scope.dictionary.step_two_done;
                }

                if ($scope.dictionary.step_two_visible) {
                    $scope.dictionary.step_two_visible = !$scope.dictionary.step_two_visible;
                }

                if ($scope.dictionary.step_one_done) {
                    $scope.dictionary.step_one_done = !$scope.dictionary.step_one_done;
                }
            }
        };


        apiService.getDef(function(response) {
            var x2js = new X2JS();
            var xmlText = response.data;
            var jsonObj = x2js.xml_str2json(xmlText);
            // console.log(jsonObj.entry_list);
        });

        // This triggers when the word is clicked in the sentence field.
        $scope.chooseWord = function($event) {

            console.log('choose word');
            // Grab the text from the element
            $scope.dictionary.sel_word = $event.target.innerHTML;

            // If this is the first time selecting a word after a sentence is chosen to be examined,
            // toggle the step_two_done and step_three_done so that they appear.
            // If this is not the first time, if the step_three_done is marked, unmark it.
            if (!hasClicked) {
                hasClicked = !hasClicked;
                $scope.dictionary.step_two_done = !$scope.dictionary.step_two_done;
            } else if ($scope.dictionary.step_three_done) {
                $scope.dictionary.step_three_done = !$scope.dictionary.step_three_done;
            }

            // Show the rt if hidden
            if (!$scope.dictionary.dict_right_top_visible) {
                $scope.dictionary.dict_right_top_visible = !$scope.dictionary.dict_right_top_visible;
            }
            // Show the st if hidden
            if (!$scope.dictionary.step_three_visible) {
                $scope.dictionary.step_three_visible = !$scope.dictionary.step_three_visible;
            }
            // Hide the rm and rb if they are showing.
            if ($scope.dictionary.dict_right_middle_visible) {
                $scope.dictionary.dict_right_middle_visible = !$scope.dictionary.dict_right_middle_visible;
            }
            if ($scope.dictionary.dict_right_bottom_visible) {
                $scope.dictionary.dict_right_bottom_visible = !$scope.dictionary.dict_right_bottom_visible;
            }

            // Clear the def_cards of any previous values.
            if ($scope.def_cards) {
                $scope.def_cards.length = 0;
            }
            // Clear out sug_cards of any previous values.
            if ($scope.sug_cards) {
                $scope.sug_cards.length = 0;
            }
            if ($scope.definition) {
                $scope.definition = "";
            }
            // Reenable the define button if a new word is clicked and if the button was disabled from a previous press.
            if ($scope.button_clicked) {
                $scope.button_clicked = !$scope.button_clicked;
            }


        };

        //  This is triggered when the define button is clicked. It prompts the following API call.
        $scope.lookupWord = function($event) {
            var idx = 0;

            $scope.button_clicked = true;

            $scope.dictionary.step_three_done = !$scope.dictionary.step_three_done;
            if (!$scope.dictionary.dict_right_middle_visible) {
                $scope.dictionary.dict_right_middle_visible = !$scope.dictionary.dict_right_middle_visible;
            }
            // Clear out the def_cards if there are any.
            console.log($scope.def_cards);
            console.log(def_list);
            if ($scope.def_cards) {
                $scope.def_cards.length = 0;
            }
            // $scope.dict_right_middle_visible = !$scope.dict_right_middle_visible;
            var def_list = [];
            var sug_list = [];
            console.log('Lookup word: ' + $scope.dictionary.sel_word);
            // Set the word
            apiService.word = $scope.dictionary.sel_word;
            apiService.getDef(function(response) {
                var x2js = new X2JS();
                var xmlText = response.data;
                var jsonObj = x2js.xml_str2json(xmlText);
                var entries = jsonObj.entry_list;
                console.log(entries);
                // Here we cycle through the results and push the relevant information to the object array.
                if ('entry' in entries) {
                    // There is 1 or more entries.
                    console.log('beginning entry');
                    // Check if entry length is above 1
                    if (entries.entry.length) {
                        console.log('entry is length of 1 or more');
                        for (var x = 0; x < entries.entry.length; x++) {
                            // console.log(x);
                            if ('def' in entries.entry[x]) {
                                var def = entries.entry[x].def;
                                console.log('entry: ' + x);
                                console.log(def);
                                // This should always be an object returned
                                console.log(typeof(def));
                                if (typeof(def.dt) == 'object') {
                                    console.log('OBJECT ' + ' entry: ' + x);
                                    // If __text exists, only push it if it has a greater length of 1...meaning it will be a word and not just a character
                                    if ('__text' in def.dt && def.dt.__text.length > 1) {
                                        console.log('push ' + idx + '-----------------');
                                        def_list.push(def.dt.__text.replace(/^:/, ""));
                                    } else {
                                        for (var i = 0; i < def.dt.length + 1; i++) {
                                            idx++;
                                            console.log(def.dt[i]);
                                            // console.log(typeof(def.dt[i]));
                                            if (typeof(def.dt[i]) == 'string') {
                                                console.log('type is string' + ' entry: ' + x + ' dt: ' + i);
                                                if (def.dt[i].length > 1) {
                                                    console.log('push ' + idx + '-----------------');
                                                    def_list.push(def.dt[i].replace(/^:/, ""));
                                                }
                                            } else if (typeof(def.dt[i]) == 'object') {
                                                console.log('type is object' + ' entry: ' + x + ' dt: ' + i);
                                                if (def.dt[i].__text) {
                                                    if (def.dt[i].__text.length > 1) {
                                                        console.log('push ' + idx + '-----------------' + ' entry: ' + x + ' dt: ' + i);
                                                        def_list.push(def.dt[i].__text.replace(/^:/, ""));
                                                        // def_list.push(def.dt.replace(/^:/, ""));
                                                    }
                                                } else {
                                                    console.log('unable to parse this entry: ' + x + ' dt: ' + i);
                                                    console.log(def.dt[i]);
                                                }
                                            }
                                        }
                                    }
                                } else if (typeof(def.dt) == 'string') {
                                    console.log('STRING' + ' entry: ' + x + ' dt: 0');
                                    console.log('push ' + idx + '-----------------' + ' entry: ' + x + ' dt: 0');
                                    def_list.push(def.dt.replace(/^:/, ""));
                                }
                            }
                        }
                    } else {
                        // Only one entry exists but it may contain multiple dts
                        var def = entries.entry.def;
                        console.log(def);
                        console.log(def.dt.length);
                        if (typeof(def.dt) == 'string') {
                            console.log('push ' + idx + '-----------------');
                            def_list.push(def.dt.replace(/^:/, ""));
                        } else {
                            for (var i = 0; i < def.dt.length + 1; i++) {
                                console.log(i);
                                console.log(def.dt[i]);
                                if (typeof(def.dt[i]) == 'string' && def.dt[i].length > 1) {
                                    console.log('push ' + idx + '-----------------' + ' entry: ' + x + ' dt: ' + i);

                                    def_list.push(def.dt[i].replace(/^:/, ""));

                                } else if (typeof(def.dt[i]) == 'object' && def.dt[i].__text.length > 1) {
                                    console.log('push ' + idx + '-----------------' + ' entry: ' + x + ' dt: ' + i);

                                    def_list.push(def.dt[i].__text.replace(/^:/, ""));
                                } else if (def.dt.__text) {
                                    console(def.dt.__text.length);
                                    console.log('push ' + idx + '-----------------' + ' entry: ' + x + ' dt: ' + i);

                                    def_list.push(def.dt.__text.replace(/^:/, ""));
                                    // def_list.push(def.dt.replace(/^:/, ""));
                                } else {
                                    console.log(def.dt);
                                    console.log(' entry: ' + x + ' dt: ' + i);
                                }
                            }
                        }
                        console.log(def_list);
                    }
                    console.log('COMPILE-----------------');

                    $scope.def_cards = def_list;

                } else {
                    console.log('no entries returned.');
                    if ('suggestion' in entries) {
                        $scope.dictionary.dict_right_bottom_visible = true;
                        // $scope.dictionary.dict_right_middle_visible = false;
                        var sug = entries.suggestion;
                        console.log('sugestions found');
                        if (typeof(sug) == 'object') {
                            console.log('There are multiple suggestions.');
                            for (var s = 0; s < sug.length; s++) {
                                // console.log(sug[s]);
                                sug_list.push(sug[s]);
                            }

                        } else if (typeof(sug) == 'string') {
                            console.log('There is only one suggestion.');
                            // console.log(sug);
                            sug_list.push(sug);
                        }
                        $scope.sug_cards = sug_list;
                    }
                }
            }, function(err) {
                console.log(err.status);
            });

        }
        // This is triggered when a def_card is clicked.
        $scope.displayDef = function(def) {
            console.log('display def.');
            if (!$scope.dictionary.dict_right_bottom_visible) {
                $scope.dictionary.dict_right_bottom_visible = !$scope.dictionary.dict_right_bottom_visible;
            }
            $scope.dictionary.definition = def;
        }

    });