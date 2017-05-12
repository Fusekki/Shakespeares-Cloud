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
                                $el.removeClass('dark');
                                    $scope.dictionary.btnText = 'Examine';
                                    $scope.btnClicked = false;
                                    $scope.dictionary.dict_right_bottom_visible = false;
                            } else {
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
                                var prevText = $el[0].previousElementSibling.innerText;
                                console.log(prevText);
                                // console.log(text);
                                var split_text = text.toString().split(" ");
                                var new_text = "";
                                var new_word;
                                for (var x = 0; x < split_text.length; x++) {
                                    // Here we are stripping punctuation-like characters out of the word
                                    // new_word = split_text[x].replace(/([.,!?\\-])/, "");
                                    new_word = split_text[x].replace(/([.,!?\\])/, "");
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