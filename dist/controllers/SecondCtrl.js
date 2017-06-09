angular.module('shakespeareApp')
    .controller('playCtrl', function ($scope, logicService, apiService, sharedService) {
        var hasClicked = false;
        $scope.loading = true;
        $scope.btnClicked = false;
        $scope.debug = false;
        $scope.showDictionary = sharedService.showDictionary;
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
        $scope.lookupDefinition = function ($event) {
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
        $scope.chooseWord = function ($event) {
            $scope.dictionary.sel_word = $event.target.innerHTML;
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
            if ($scope.def_word) {
                $scope.def_word.length = 0;
            }
            if ($scope.sug_word) {
                $scope.sug_word.length = 0;
            }
            $scope.button_clicked = false;
        };
        $scope.lookupWord = function ($event) {
            var results;
            sharedService.idx = 0;
            $scope.button_clicked = true;

            $scope.instructions.block_three_line_through = !$scope.instructions.block_three_line_through;
            if (!$scope.dictionary.block_no_results_visible) {
                $scope.dictionary.block_no_results_visible = !$scope.dictionary.block_no_results_visible;
            }
            if ($scope.def_word) {
                $scope.def_word.length = 0;
            }
            var inputText;
            if ($event.currentTarget.nextElementSibling) {
                inputText = $event.currentTarget.nextElementSibling.value;
            } else if ($event.currentTarget.lastElementChild) {
                inputText = $event.currentTarget.lastElementChild.value;
            }
            inputText = $event.currentTarget.nextElementSibling.children[0].value;
            apiService.word = inputText;
            self.cacheResults = logicService.getCacheItem(inputText);
            if (!self.cacheResults) {
                apiService.getDef(function (response) {
                    var x2js = new X2JS();
                    var xmlText = response.data;
                    var jsonObj = x2js.xml_str2json(xmlText);
                    var entries = jsonObj.entry_list;
                    logicService.setCacheItem(inputText, entries);
                    results = sharedService.parseEntries(inputText, entries);
                    processResults(results);
                }, function (err) {
                    console.log(err.status);
                });
            } else {
                results = sharedService.parseEntries(inputText, self.cacheResults);
                processResults(results);
            }
        };
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