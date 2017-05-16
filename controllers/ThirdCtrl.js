angular.module('shakespeareApp')

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
            $scope.examinedText = $scope.dictionary.text;
            $scope.dictionary.step_two_visible = true;
            $scope.dictionary.dict_visible = true;
            $scope.dictionary.dict_right_top_visible = false;
            $scope.dictionary.dict_right_middle_visible = false;
            $scope.dictionary.dict_right_bottom_visible = false;
            $scope.dictionary.step_one_done = true;
            $scope.dictionary.step_two_done = false;
            $scope.dictionary.step_three_done = false;
        } else {
            $scope.dictionary.btnText = 'Examine';
            $scope.examineText = "";
            $scope.dictionary.dict_visible = false;
            $scope.dictionary.step_two_done = false;
            $scope.dictionary.step_two_visible = false
            $scope.dictionary.step_one_done = false;
        }
    };

    $scope.toggleButton = function() {
        console.log('here');
        $scope.button_clicked = false;
    };

    apiService.getDef(function(response) {
        var x2js = new X2JS();
        var xmlText = response.data;
        var jsonObj = x2js.xml_str2json(xmlText);
        // console.log(jsonObj.entry_list);
    });

    // This triggers when the word is clicked in the sentence field.
    $scope.chooseWord = function($event) {
        // Grab the text from the element
        $scope.dictionary.sel_word = $event.target.innerHTML;

        // If this is the first time selecting a word after a sentence is chosen to be examined,
        // toggle the step_two_done and step_three_done so that they appear.
        // If this is not the first time, if the step_three_done is marked, unmark it.
        if (!hasClicked) {
            hasClicked = true;
            $scope.dictionary.step_two_done = !$scope.dictionary.step_two_done;
        }
        $scope.dictionary.step_three_done = false
        $scope.dictionary.dict_right_top_visible = true;
        $scope.dictionary.step_three_visible = true;
        $scope.dictionary.dict_right_middle_visible = false;
        $scope.dictionary.dict_right_bottom_visible = false;
        // Clear the def_cards of any previous values.
        if ($scope.def_cards) {
            $scope.def_cards.length = 0;
        }
        // Clear out sug_cards of any previous values.
        if ($scope.sug_cards) {
            $scope.sug_cards.length = 0;
        }
        $scope.definition = "";
        $scope.button_clicked = false;
    };

    //  This is triggered when the define button is clicked. It prompts the following API call.
    $scope.lookupWord = function($event) {
        var idx = 0;
        console.log($event);

        var defObj = function(date, def) {
            return {
                'date': date,
                'def': def
            }
        };

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
        console.log($event);
        var inputText;
        // Based on whether they pressed enter or clicked the button, grab the appropriate text of the input field. We can determine whether it was the button of the enter key based on checking
        // the $event.currentTarget container.
        if ($event.currentTarget.nextElementSibling) {
            inputText = $event.currentTarget.nextElementSibling.value;
        } else if ($event.currentTarget.lastElementChild) {
            inputText = $event.currentTarget.lastElementChild.value;
        }

        if ($event.type = 'click') {
            console.log('it is a click!');

        } else {
            inputText = $event.currentTarget.nextElementSibling.value;
        }


        console.log('Lookup word: ' + inputText);
        // Set the word
        // apiService.word = $scope.dictionary.sel_word;
        apiService.word = inputText;
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
                    // Cycle through each of the entries
                    for (var x = 0; x < entries.entry.length; x++) {
                        // if def is in current entry
                        if ('def' in entries.entry[x]) {
                            var def = entries.entry[x].def;
                            console.log('entry: ' + x);
                            console.log(def);
                            // This should always be an object returned
                            console.log(typeof(def));
                            // What type of object is dt? if object do the following
                            if (typeof(def.dt) == 'object') {
                                console.log('OBJECT ' + ' entry: ' + x);
                                var newWord;
                                // If __text exists, only push it if it has a greater length of 1...meaning it will be a word and not just a character
                                if ('__text' in def.dt && def.dt.__text.length > 1) {
                                    // console.log('WE SHOULD NEVER GET HERE');
                                    console.log('push ' + idx + '-----------------');
                                    newWord = def.dt.__text.replace(/^:/, "")
                                    console.log('--------------NOT GOING TO PUSH-------------');
                                    // def_list.push(defObj(def.date, newWord));
                                } else {
                                    // Item is still an object just doesn't contain __text
                                    for (var i = 0; i < def.dt.length; i++) {
                                        console.log(def.dt.length);
                                        idx++;
                                        console.log(def.dt[i]);
                                        // console.log(typeof(def.dt[i]));
                                        if (typeof(def.dt[i]) == 'string' && def.dt[i].length > 1) {
                                            // console.log('WE SHOULD NEVER GET HERE');
                                            console.log('type is string' + ' entry: ' + x + ' dt: ' + i);
                                            // is item longer than a single character
                                            console.log('push ' + idx + '-----------------');
                                            console.log(typeof(def.dt[i]));
                                            newWord = def.dt[i].replace(/^:/, "");
                                            def_list.push(defObj(def.date, newWord));
                                        } else  {
                                            // type of dt[i] is object
                                            // console.log('WE SHOULD NEVER GET HERE');
                                            console.log('type is object' + ' entry: ' + x + ' dt: ' + i);
                                            if (def.dt[i].__text && def.dt[i].__text.length > 1) {
                                                    console.log('push ' + idx + '-----------------' + ' entry: ' + x + ' dt: ' + i);
                                                    newWord = def.dt[i].__text.replace(/^:/, "");
                                                    def_list.push(defObj(def.date, newWord));
                                                    // def_list.push(def.dt.replace(/^:/, ""));
                                            } else {
                                                console.log('unable to parse this entry: ' + x + ' dt: ' + i);
                                                console.log(def.dt[i]);
                                            }
                                        }
                                    }
                                }
                            } else  {
                                // These seme to fall under people (like a thesaurus search).
                                console.log('STRING' + ' entry: ' + x + ' dt: 0');
                                console.log('push ' + idx + '-----------------' + ' entry: ' + x + ' dt: 0');
                                newWord = def.dt.replace(/^:/, "");
                                console.log('--------------NOT GOING TO PUSH-------------');
                                // def_list.push(defObj(def.date, newWord));
                            }
                        }
                    }
                } else {
                    // Only one entry exists but it may contain multiple dts
                    var def = entries.entry.def;
                    console.log(def);
                    console.log(def.length);
                    if (typeof(def.def) == 'string') {
                        console.log('push ' + idx + '-----------------');
                        newWord = def.def.replace(/^:/, "")
                        def_list.push(defObj(def.date, newWord));
                    } else {
                        console.log('unable to parse entry.');
                    }
                }
                console.log('COMPILE-----------------');
                console.log(def_list);
                $scope.def_cards = def_list;

            } else {
                // No entries returned.
                console.log('no entries returned.');
                // Are there suggestions?
                if ('suggestion' in entries) {
                    $scope.dictionary.dict_right_bottom_visible = true;
                    // $scope.dictionary.dict_right_middle_visible = false;
                    var sug = entries.suggestion;
                    console.log('sugestions found');
                    if (typeof(sug) == 'object') {
                        console.log('There are multiple suggestions.');
                        for (var s = 0; s < sug.length; s++) {
                            sug_list.push(sug[s]);
                        }
                    } else {
                        // type is string
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