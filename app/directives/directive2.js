angular.module('shakespeareApp')

    .directive('changeOnTooltip', function () {
        return {
            priority: 0,
            link: function ($scope, $el, $attrs) {
                $scope.$watch(
                    function () {
                        return $el[0].nextElementSibling;
                    },
                    function (newValue, oldValue) {
                        var nextLine;
                        if (newValue !== oldValue) {

                            if ($scope.def_word) {
                                $scope.def_word.length = 0;
                            }
                            if ($scope.sug_word) {
                                $scope.sug_word.length = 0;
                            }

                            $scope.dictionary.sug_visible = false;
                            if ($el.hasClass('dark')) {
                                $el.removeClass('dark');
                                $scope.dictionary.btnText = 'Examine';
                                $scope.btnClicked = false;
                                $scope.dictionary.dict_right_bottom_visible = false;
                            } else {
                                var text;
                                $el.addClass('dark');
                                $scope.instructions.block_two_visible = true;
                                $scope.instructions.block_one_line_through = true;
                                $scope.instructions.block_two_line_through = false;
                                $scope.instructions.block_three_line_through = false;
                                $scope.dictionary.block_text_visible = false;
                                $scope.instructions.block_one_visible = false;
                                $scope.instructions.step_three_visible = false;
                                $scope.dictionary.block_no_results_visible = false;
                                $scope.dictionary.dict_right_bottom_visible = false;
                                $scope.dictionary.sug_visible = false;
                                text = $el[0].innerText;
                                var firstHalf;
                                // First check to see if there is a hyphenated word in the previous line
                                if ($el[0].previousElementSibling) {
                                    var previousElement = $el[0].previousElementSibling;
                                    // Check to see if the previous Element is the tooltip.  If so, grab the element before that.
                                    if (previousElement.className === 'tooltip ng-scope ng-isolate-scope top tooltipClass fade in') {
                                        if (previousElement.previousElementSibling && 'innerText' in previousElement.previousElementSibling) {
                                            previousElement = previousElement.previousElementSibling;
                                        }
                                    }
                                    // Check if innerText is a part of previousElement (otherwise will receive an error).  Also, check if previousElement's class is 'line'. We are only
                                    // concerned with div.line elements for broken text.
                                    if ('innerText' in previousElement && previousElement.className === 'line') {
                                        var prevText = previousElement.innerText;
                                        prevText = prevText.toString().split(" ");
                                        var lastCharacter = prevText[prevText.length - 1].slice(-1);
                                        if (lastCharacter === "-") {
                                            firstHalf = prevText[prevText.length - 1].slice(0, prevText.length - 1);
                                        }
                                    }
                                }
                                // Let's split up the words of the sentence
                                var split_text = text.toString().split(" ");
                                var new_text = "";
                                var new_word;
                                // Let's replace each word minus any grammatical characters like comma or apostrophe
                                for (var x = 0; x < split_text.length; x++) {
                                    // Here we are stripping punctuation-like characters out of the word
                                    new_word = split_text[x].replace(/([.,!?\\])/, "");
                                    // If firstHalf is defined, there is a split word from the previous div.  Only add firstHalf
                                    // if it exists and the word is the first of the line.
                                    if (firstHalf && x === 0) {
                                        // combine the first and second half.
                                        firstHalf = firstHalf.slice(0, firstHalf.length - 1);
                                    }
                                    var n = new_word.slice(-1);
                                    // Check if that word has a hyphen.
                                    if (n === "-") {
                                        //  If it has a hyphen, remove it and grab the first word of the next line and combine.
                                        new_word = new_word.slice(0, new_word.length - 1);
                                        // Grab the next line
                                        nextLine = $el[0].nextSibling.nextElementSibling.innerText;
                                        var splitWord = nextLine.match(/^([^\s]+)/);
                                        new_word += splitWord[1];
                                    }
                                    if (firstHalf) {
                                        new_word = firstHalf + new_word;
                                        firstHalf = null;
                                    }
                                    new_text += '<span class="word" ng-click="chooseWord($event)">' + new_word + '</span> ';
                                }
                                $scope.dictionary.text = new_text;
                            }
                        }
                    }
                );
            }
        };
    });