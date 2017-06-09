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
                                if ($el[0].previousElementSibling) {
                                    var previousElement = $el[0].previousElementSibling;
                                    if (previousElement.className === 'tooltip ng-scope ng-isolate-scope top tooltipClass fade in') {
                                        if (previousElement.previousElementSibling && 'innerText' in previousElement.previousElementSibling) {
                                            previousElement = previousElement.previousElementSibling;
                                        }
                                    }
                                    if ('innerText' in previousElement && previousElement.className === 'line') {
                                        var prevText = previousElement.innerText;
                                        prevText = prevText.toString().split(" ");
                                        var lastCharacter = prevText[prevText.length - 1].slice(-1);
                                        if (lastCharacter === "-") {
                                            firstHalf = prevText[prevText.length - 1].slice(0, prevText.length - 1);
                                        }
                                    }
                                }
                                var split_text = text.toString().split(" ");
                                var new_text = "";
                                var new_word;
                                for (var x = 0; x < split_text.length; x++) {
                                    new_word = split_text[x].replace(/([.,!?\\])/, "");
                                    if (firstHalf && x === 0) {
                                        firstHalf = firstHalf.slice(0, firstHalf.length - 1);
                                    }
                                    var n = new_word.slice(-1);
                                    if (n === "-") {
                                        new_word = new_word.slice(0, new_word.length - 1);
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