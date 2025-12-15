angular.module('shakespeareApp')

    .controller('playCtrl', function ($scope, logicService, apiService, parseService) {

        // This is just used once for the chooseWord function when run for the first time.
        var hasClicked = false;
        $scope.loading = true;
        $scope.btnClicked = false;
        $scope.debug = false;
        $scope.showDictionary = parseService.showDictionary;

        $scope.instructions = {
            block_one_visible: false,
            block_two_visible: false,
            block_three_visible: false,
            block_one_line_through: false,
            block_two_line_through: false,
            block_three_line_through: false
        };

        $scope.dictionary = {
            block_text_visible: false,
            dict_right_bottom_visible: false,
            block_no_results_visible: false,
            sug_visible: false,
            text: "Sentence",
            sel_word: "Word",
            btnText: "Examine"
        };

        apiService.getHTML(function (response) {
            $scope.play = response.data;
            $scope.loading = false;
        }, function (err) {
            console.log(err.status);
        });

        // This triggers when the Examine button is clicked in the tooltip.
        $scope.lookupDefinition = function ($event) {
            // Change the appearance of the button
            $scope.btnClicked = !$scope.btnClicked;
            if ($scope.btnClicked) {
                $scope.dictionary.btnText = "Un-examine";
                $scope.examinedText = $scope.dictionary.text;
                $scope.instructions.block_two_visible = true;
                $scope.dictionary.block_text_visible = true;
                $scope.dictionary.block_one_visible = false;
                $scope.dictionary.block_no_results_visible = false;
                $scope.dictionary.dict_right_bottom_visible = false;
                $scope.instructions.block_one_line_through = true;
                $scope.dictionary.block_two_linethrough = false;
                $scope.instructions.block_three_line_through = false;
            } else {
                $scope.dictionary.btnText = 'Examine';
                $scope.examineText = "";
                $scope.instructions.block_two_visible = false;
                $scope.dictionary.block_text_visible = false;
                $scope.dictionary.block_two_linethrough = false;
                $scope.instructions.block_one_line_through = false;
            }
        };

        $scope.toggleButton = function () {
            $scope.button_clicked = false;
        };


        // This triggers when the word is clicked in the sentence field.
        $scope.chooseWord = function ($event) {
            // Grab the text from the element
            $scope.dictionary.sel_word = $event.target.innerHTML;

            // If this is the first time selecting a word after a sentence is chosen to be examined,
            // toggle the step_two_done and step_three_done so that they appear.
            // If this is not the first time, if the step_three_done is marked, un-mark it.
            if (!hasClicked) {
                hasClicked = true;
                $scope.instructions.block_two_line_through = !$scope.instructions.block_two_line_through;
            }
            $scope.instructions.block_three_line_through = false;
            $scope.instructions.block_one_visible = true;
            $scope.instructions.block_three_visible = true;
            $scope.dictionary.block_no_results_visible = false;
            $scope.dictionary.dict_right_bottom_visible = false;
            $scope.dictionary.sug_visible = false;
            // Clear the def_word of any previous values.
            if ($scope.def_word) {
                $scope.def_word.length = 0;
            }
            // Clear out sug_word of any previous values.
            if ($scope.sug_word) {
                $scope.sug_word.length = 0;
            }
            $scope.button_clicked = false;
        };

        //  This is triggered when the define button is clicked. It prompts the following API call.
        $scope.lookupWord = function ($event) {
            var results;
            parseService.idx = 0;
            $scope.button_clicked = true;

            $scope.instructions.block_three_line_through = !$scope.instructions.block_three_line_through;
            if (!$scope.dictionary.block_no_results_visible) {
                $scope.dictionary.block_no_results_visible = !$scope.dictionary.block_no_results_visible;
            }
            // Clear out the def_word if there are any.
            if ($scope.def_word) {
                $scope.def_word.length = 0;
            }
            var inputText;
            // Based on whether they pressed enter or clicked the button, grab the appropriate text of the input field. We can determine whether it was the button of the enter key based on checking
            // the $event.currentTarget container.
            if ($event.currentTarget.nextElementSibling) {
                inputText = $event.currentTarget.nextElementSibling.value;
            } else if ($event.currentTarget.lastElementChild) {
                inputText = $event.currentTarget.lastElementChild.value;
            }
            inputText = $event.currentTarget.nextElementSibling.children[0].value;
            console.log('Lookup word: ' + inputText);
            // Set the word
            apiService.word = inputText;
            // Check for cached entry
            self.cacheResults = logicService.getCacheItem(inputText);
            if (!self.cacheResults) {
                // make API call
                apiService.getDef(function (response) {
                    var x2js = new X2JS();
                    var xmlText = response.data;
                    console.log('response', response);
                    // var jsonObj = x2js.xml_str2json(xmlText);
                    // var entries = jsonObj.entry_list;
                    var entries = response.data;
                    // Set cache item
                    logicService.setCacheItem(inputText, entries);
                    // Here we cycle through the results and push the relevant information to the object array.
                    results = parseService.parseEntries(inputText, entries);
                    processResults(results);

                }, function (err) {
                    console.log(err.status);
                });
            } else {
                results = parseService.parseEntries(inputText, self.cacheResults);
                processResults(results);
            }
        };
        // This is triggered when a def_card is clicked.
        $scope.displayDef = function (def) {
            if (!$scope.dictionary.dict_right_bottom_visible) {
                $scope.dictionary.dict_right_bottom_visible = !$scope.dictionary.dict_right_bottom_visible;
            }
            $scope.dictionary.definition = def;
        };

        var processResults = function (results) {
            if (results) {
                if (results.deflist) {
                    $scope.def_word = results.deflist;
                }
                if (results.suglist) {
                    $scope.dictionary.block_no_results_visible = true;
                    $scope.dictionary.dict_right_bottom_visible = true;
                    $scope.dictionary.sug_visible = true;
                    $scope.sug_word = results.suglist;
                }
            }
        };
    });