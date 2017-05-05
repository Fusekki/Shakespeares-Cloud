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

    .controller('playCtrl', function($scope, logicService, apiService) {

        $scope.text = "Sentence";
        $scope.sel_word = "Word";

        $scope.isActive = false;

        // Sets the right dictionary area to opacity 1 on true; 0 when false
        $scope.rt_Active = false;
        $scope.rm_Active = false;
        $scope.rb_Active = false;
        $scope.so_Active = false;
        $scope.st_Active = false;
        $scope.i_done = false;
        $scope.t_done = false;
        // $scope.sth_Active = false;
        $scope.button_clicked = false;

        var toolTipActive = false;

        var text;
        var hasClicked = false;

        // $scope.title = sharedService.title;
        //
        apiService.getHTML(function(response) {
            $scope.play = response.data;
        }, function(err) {
            console.log(err.status);
        });

        $scope.doThis = function($event) {
            console.log('line is clicked.  We should change the color  of it');
            console.log($event);
            var target = $event.target.classList;
            // if (target.className == "fuckyou") {
            //     target.className -= "fuckyou"
            // }
            // target.className += "fuckyou";
            if (target.contains ("fuckyou")) {
                console.log("does contain class");
                target.remove('fuckyou');
            } else {
                console.log("does not contain class");
                var ele = document.getElementsByClassName('fuckyou');
                // if (ele) {
                //     ele.remove('fuckyou');
                // }
                target.add('fuckyou');
            }

            if (!toolTipActive) {
                toolTipActive = !toolTipActive;
                var currentToolTip = document.getElementsByClassName('tooltipClass');
                console.log(currentToolTip);
                currentToolTip[0].setAttribute('id', 'tooltip-active');
            } else {
                toolTipActive = !toolTipActive;
                var prevToolTip = document.getElementById('tooltip-active');
                console.log(prevToolTip);
                prevToolTip.remove();
                var currentToolTip = document.getElementsByClassName('tooltipClass');
                console.log(currentToolTip);
                currentToolTip[0].setAttribute('id', 'tooltip-active');
            }

        }



        // This is triggered on a hover over a line in the play
        $scope.grabText = function($event) {
            console.log($event);
            if (hasClicked) {
                hasClicked = !hasClicked;
            }

            text = $event.target.innerText;
            var split_text = text.toString().split(" ");
            var new_text = "";
            var new_word;
            for (var x = 0; x < split_text.length; x++) {
                // Here we are stripping punctuation-like characters out of the word
                new_word = split_text[x].replace(/([.,!?\\-])/, "");
                new_text += '<span class="word" ng-click="chooseWord($event)">' + new_word + '</span> ';
            }
            $scope.text = new_text;
        };

        // This triggers when the Examine button is clicked in the tooltip.
        $scope.lookupDefinition = function($event) {
            console.log('going to look up sentence');

            console.log($event);

            // if (!$scope.i_done) {
            //     $scope.i_done = !$scope.i_done;
            // }
            // if ($scope.s_done) {
            //     $scope.s_done = !$scope.s_done;
            // }

            // if (!$scope.rt_Active) {
            //     $scope.rt_Active = !scope.rt_Active;
            // }
            $scope.examinedText = $scope.text;



            if (!$scope.so_Active) {
                $scope.so_Active = !$scope.so_Active;
            }
            if (!$scope.isActive) {
                $scope.isActive = !$scope.isActive;
            }

            if ($scope.rt_Active) {
                $scope.rt_Active = !$scope.rt_Active;
            }

            if ($scope.rm_Active) {
                $scope.rm_Active = !$scope.rm_Active;
            }

            if ($scope.rb_Active) {
                $scope.rb_Active = !$scope.rb_Active;
            }

            if (!$scope.i_done) {
                $scope.i_done = !$scope.i_done;
            }

            if ($scope.s_done) {
                $scope.s_done = !$scope.s_done;
            }
            if ($scope.t_done) {
                $scope.t_done = !$scope.t_done;
            }

            // $scope.i_done = !$scope.i_done;


            console.log($scope.so_Active);
            console.log($scope.isActive);
        };


        apiService.getDef(function(response) {
            var x2js = new X2JS();
            var xmlText = response.data;
            var jsonObj = x2js.xml_str2json(xmlText);
            console.log(jsonObj.entry_list);
        });

        // This triggers when the word is clicked in the sentence field.
        $scope.chooseWord = function($event) {

            console.log('choose word');
            // Grab the text from the element
            $scope.sel_word = $event.target.innerHTML;
            // Toggle the second line strike-through

            // If this is the first time selecting a word after a sentence is chosen to be examined,
            // toggle the s_done and t_done so that they appear.
            // If this is not the first time, if the t_done is marked, unmark it.
            if (!hasClicked) {
                hasClicked = true;
                $scope.s_done = !$scope.s_done;
            } else if ($scope.t_done) {
                $scope.t_done = !$scope.t_done;
            }

            // Show the rt if hidden
            if (!$scope.rt_Active) {
                $scope.rt_Active = !$scope.rt_Active;
            }
            // Show the st if hidden
            if (!$scope.st_Active) {
                $scope.st_Active = !$scope.st_Active;
            }
            // Hide the rm and rb if they are showing.
            if ($scope.rm_Active) {
                $scope.rm_Active = !$scope.rm_Active;
            }
            if ($scope.rb_Active) {
                $scope.rb_Active = !$scope.rb_Active;
            }
            // // Hide the third step if displaying.
            // if ($scope.st_Active) {
            //     $scope.st_Active = !$scope.st_Active;
            // }
            // // Remove the strike-through on the third step if present from previous call.
            // if ($scope.t_done) {
            //     $scope.t_done = !$scope.t_done;
            // }

            // Clear the def_cards of any previous values.
            if ($scope.def_cards) {
                $scope.def_cards.length = 0;
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

            $scope.t_done = !$scope.t_done;
            // $scope.sth_Active = !$scope.sth_Active;
            if (!$scope.rm_Active) {
                $scope.rm_Active = !$scope.rm_Active;
            }
            // Clear out the def_cards if there are any.
            console.log($scope.def_cards);
            console.log(def_list);
            if ($scope.def_cards) {
                $scope.def_cards.length = 0;
            }
            // $scope.rm_Active = !$scope.rm_Active;
            var def_list = [];
            var sug_list = [];
            console.log('Lookup word: ' + $scope.sel_word);
            // Set the word
            apiService.word = $scope.sel_word;
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
                        $scope.rb_Active = true;
                        var sug = entries.suggestion;
                        console.log('sugestions found');
                        if (typeof(sug) == 'object') {
                            console.log('There are multiple suggestions.');
                            for (var s = 0; s < sug.length; s++) {
                                console.log(sug[s]);
                                sug_list.push(sug[s]);
                            }

                        } else if (typeof(sug) == 'string') {
                            console.log('There is only one suggestion.');
                            console.log(sug);
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
            if (!$scope.rb_Active) {
                $scope.rb_Active = !$scope.rb_Active;
            }
            $scope.definition = def;
        }

    });