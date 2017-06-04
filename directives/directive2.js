//DIRECTIVES

angular.module('shakespeareApp')

    .directive('changeOnTooltip', function() {
        return {
            priority: 0,
            link: function ($scope, $el, $attrs) {
                // console.log("Inside link function");
                // var par = ele.parentElement;
                // console.log($attrs);
                // console.log($scope);
                $scope.$watch(
                    function () { return $el[0].nextElementSibling; },
                    function (newValue, oldValue) {
                        var nextLine;
                        if (newValue !== oldValue) {

                            if ($scope.def_cards) {
                                $scope.def_cards.length =0;
                            }
                            if ($scope.sug_cards) {
                                $scope.sug_cards.length =0;
                            }
                            // console.log('change');
                            // console.log($el);

                            $scope.dictionary.sug_visible = false;
                            if ($el.hasClass('dark')) {
                                // console.log('has dark');
                                $el.removeClass('dark');
                                $scope.dictionary.btnText = 'Examine';
                                $scope.btnClicked = false;
                                $scope.dictionary.dict_right_bottom_visible = false;
                            } else {
                                // console.log('does not have dark');
                                var text;
                                $el.addClass('dark');
                                $scope.instructions.block_two_visible = true;
                                $scope.instructions.block_one_line_through = true;
                                $scope.dictionary.tblock_two_line_through = false;
                                $scope.instructions.block_three_line_through = false;
                                $scope.dictionary.block_text_visible = false;
                                $scope.dictionary.block_one_visible = false;
                                $scope.dictionary.step_three_visible = false;
                                $scope.dictionary.block_no_results_visible = false;
                                $scope.dictionary.dict_right_bottom_visible = false;
                                $scope.dictionary.sug_visible = false;
                                // console.log('going to grab text of line');
                                text = $el[0].innerText;
                                var firstHalf;
                                // First check to see if there is a hyphenated word in the previous line
                                if ($el[0].previousElementSibling) {
                                    var previousElement = $el[0].previousElementSibling;
                                    // console.log(previousElement);
                                    // Check to see if the previous Element is the tooltip.  If so, grab the element before that.
                                    if (previousElement.className == 'tooltip ng-scope ng-isolate-scope top tooltipClass fade in') {
                                        // console.log('previous element is a tooltip.  Grabbing item before');
                                        if (previousElement.previousElementSibling && 'innerText' in previousElement.previousElementSibling) {
                                            previousElement = previousElement.previousElementSibling;
                                            if (!'innerText' in previousElement) {
                                                // console.log('previousSibling inner text is not there.');
                                            }
                                        } else {
                                            // console.log('previousSibling inner text is not there.');
                                        }
                                    }
                                    // console.log(previousElement);
                                    // console.log(previousElement.className);
                                    // Check if innnerText is a part of previousElement (otherwise will receive an error).  Also, check if previousElement's class is 'line'. We are only
                                    // concerned with div.line elements for broken text.
                                    if ('innerText' in previousElement && previousElement.className == 'line') {
                                        // console.log('prev element is a line');
                                        var prevText = previousElement.innerText;
                                        // console.log(prevText);
                                        prevText = prevText.toString().split(" ");
                                        // console.log(prevText.length);
                                        var lastCharacter = prevText[prevText.length - 1].slice(-1);
                                        if (lastCharacter == "-") {
                                            firstHalf = prevText[prevText.length - 1].slice(0, prevText.length - 1);
                                        } else {
                                            // console.log('lastCharacter is not a hyphen. Not joining.');
                                        }
                                    }
                                } else {
                                    // console.log('previousSibling inner text is not there.');
                                }

                                // Let's split up the words of the sentence
                                var split_text = text.toString().split(" ");
                                var new_text = "";
                                var new_word;
                                // Let's replace each word minus any grammatical characters like comma or apostrophe
                                for (var x = 0; x < split_text.length; x++) {
                                    // Here we are stripping punctuation-like characters out of the word
                                    // new_word = split_text[x].replace(/([.,!?\\-])/, "");
                                    new_word = split_text[x].replace(/([.,!?\\])/, "");
                                    // If firstHalf is defined, there is a split word from the previous div.  Only add firstHalf
                                    // if it exists and the word is the first of the line.
                                    if (firstHalf && x == 0) {
                                        // combine the first and second half.
                                        // console.log('need to combine words');
                                        // console.log(firstHalf);
                                        firstHalf = firstHalf.slice(0, firstHalf.length - 1);
                                        // console.log(firstHalf);
                                    }
                                    var n = new_word.slice(-1);
                                    // Check if that word has a hyphen.
                                    if (n == "-") {
                                        //  If it has a hyphen, remove it and grab the first word of the next line and combine.
                                        new_word = new_word.slice(0, new_word.length - 1);
                                        // console.log('split word detected');
                                        // Grab the next line
                                        nextLine = $el[0].nextSibling.nextElementSibling.innerText;
                                        var splitWord = nextLine.match(/^([^\s]+)/);
                                        var fullWord = new_word + splitWord[1];
                                        new_word = fullWord;
                                    }

                                    if (firstHalf) {
                                        // console.log('combining words');
                                        new_word = firstHalf + new_word;
                                        firstHalf = null;
                                    }
                                    // console.log(n);
                                    // console.log(new_word);
                                    new_text += '<span class="word" ng-click="chooseWord($event)">' + new_word + '</span> ';
                                }
                                // console.log(new_text);
                                $scope.dictionary.text = new_text;
                            }
                            // console.log(oldValue);
                            // console.log(newValue);
                        }
                    }
                );
            }
        };
    })