//DIRECTIVES

angular.module('shakespeareApp')

    .directive('changeOnTooltip', function($compile) {
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
                            // console.log('change');
                            console.log($el);
                            if ($el.hasClass('dark')) {
                                console.log('has dark');
                                $el.removeClass('dark');
                                    $scope.dictionary.btnText = 'Examine';
                                    $scope.btnClicked = false;
                                    $scope.dictionary.dict_right_bottom_visible = false;
                            } else {
                                console.log('does not have dark');
                                $el.addClass('dark');
                                $scope.dictionary.step_one_done = true;
                                $scope.dictionary.step_two_visible = false;
                                $scope.dictionary.step_two_done = false;
                                $scope.dictionary.step_one_done = false;
                                $scope.dictionary.step_three_done = false;
                                $scope.dictionary.dict_visible = false;
                                $scope.dictionary.dict_right_top_visible = false;
                                $scope.dictionary.step_three_visible = false;
                                $scope.dictionary.dict_right_middle_visible = false;
                                $scope.dictionary.dict_right_bottom_visible = false;
                                // console.log('going to grab text of line');
                                text = $el[0].innerText;
                                var firstHalf;
                                if ($el[0].previousElementSibling) {
                                    var previousElement = $el[0].previousElementSibling;
                                    console.log(previousElement);
                                    if (previousElement.className == 'tooltip ng-scope ng-isolate-scope top tooltipClass fade in') {
                                        console.log('previous element is a tooltip.  Grabbing item before');
                                        if (previousElement.previousElementSibling && 'innerText' in previousElement.previousElementSibling) {
                                            previousElement = previousElement.previousElementSibling;
                                            if (!'innerText' in previousElement) {
                                                console.log('previousSibling inner text is not there.');
                                            }
                                        } else {
                                            console.log('previousSibling inner text is not there.');
                                        }
                                    }
                                    if ('innerText'  in previousElement) {
                                        var prevText = previousElement.innerText;
                                        console.log(prevText);
                                        prevText = prevText.toString().split(" ");
                                        console.log(prevText.length);
                                        var lastCharacter = prevText[prevText.length - 1].slice(-1);
                                        if (lastCharacter == "-") {
                                            firstHalf = prevText[prevText.length - 1].slice(0, prevText.length - 1);
                                        } else {
                                            console.log('lastCharacter is not a hyphen. Not joining.');
                                        }
                                    }
                                } else {
                                    console.log('previousSibling inner text is not there.');
                                }

                                // console.log(text);
                                var split_text = text.toString().split(" ");
                                var new_text = "";
                                var new_word;

                                for (var x = 0; x < split_text.length; x++) {
                                    // Here we are stripping punctuation-like characters out of the word
                                    // new_word = split_text[x].replace(/([.,!?\\-])/, "");
                                    new_word = split_text[x].replace(/([.,!?\\])/, "");
                                    if (firstHalf && x == 0) {
                                        // combine the first and second half.
                                        console.log('need to combine words');
                                        console.log(firstHalf);
                                        firstHalf = firstHalf.slice(0, firstHalf.length - 1);
                                        console.log(firstHalf);

                                    }
                                    var n = new_word.slice(-1);
                                    if (n == "-") {
                                        new_word = new_word.slice(0, new_word.length - 1);
                                        // Need to grab split word from original line
                                        // console.log('split word detected');
                                        // Grab the next line
                                        nextLine = $el[0].nextSibling.nextElementSibling.innerText;
                                        // console.log(nextLine);
                                        var splitWord = nextLine.match(/^([^\s]+)/);
                                        // console.log(splitWord[1]);
                                        var fullWord = new_word + splitWord[1];
                                        // console.log(fullWord);
                                        new_word = fullWord;
                                    }

                                    if (firstHalf) {
                                        console.log('combining words');
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