angular.module('shakespeareApp')

.controller('playCtrl', function($scope, logicService, apiService, sharedService) {

    // This is just used once for the chooseWord function when run for the first time.
    var hasClicked = false;
    $scope.loading = true;

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
        $scope.loading = false;
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
        sharedService.idx = 0;
        console.log($event);

        // var defObj = function(date, def) {
        //     return {
        //         'date': date,
        //         'def': def
        //     }
        // };

        $scope.button_clicked = true;

        $scope.dictionary.step_three_done = !$scope.dictionary.step_three_done;
        if (!$scope.dictionary.dict_right_middle_visible) {
            $scope.dictionary.dict_right_middle_visible = !$scope.dictionary.dict_right_middle_visible;
        }
        // Clear out the def_cards if there are any.
        console.log($scope.def_cards);
        // console.log(def_list);
        if ($scope.def_cards) {
            $scope.def_cards.length = 0;
        }
        // $scope.dict_right_middle_visible = !$scope.dict_right_middle_visible;
        // var def_list = [];
        // var sug_list = [];
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
        // Check for cached entry
        self.cacheResults = logicService.getCacheItem(inputText);
        if (!self.cacheResults) {
            console.log('cache does not contain. making api call.');
            // make API call
            apiService.getDef(function(response) {
                var x2js = new X2JS();
                var xmlText = response.data;
                var jsonObj = x2js.xml_str2json(xmlText);
                var entries = jsonObj.entry_list;
                console.log(entries);
                // Set cache item
                console.log('setting cache item');
                logicService.setCacheItem(inputText, entries);
                // Here we cycle through the results and push the relevant information to the object array.
                results = sharedService.parseEntries(entries);
                processResults(results);

            }, function(err) {
                console.log(err.status);
            });
        } else {
            console.log('rertieving item from cache.');

            results = sharedService.parseEntries(self.cacheResults);
            processResults(results);
        }


    }
    // This is triggered when a def_card is clicked.
    $scope.displayDef = function(def) {
        console.log('display def.');
        if (!$scope.dictionary.dict_right_bottom_visible) {
            $scope.dictionary.dict_right_bottom_visible = !$scope.dictionary.dict_right_bottom_visible;
        }
        $scope.dictionary.definition = def;
    }

    var processResults = function(results) {
        console.log(results);
        if (results.deflist) {
            console.log('dicationary elements found');
            $scope.def_cards = results.deflist;
        }
        if (results.suglist) {
            console.log('suggestion elements found');
            $scope.dictionary.dict_right_bottom_visible = true;
            $scope.sug_cards = results.suglist;
        }
    }

});