//DIRECTIVES

angular.module('shakespeareApp')

    .directive('dynamic', function ($compile) {
        return {
            restrict: 'A',
            replace: true,
            link: function (scope, ele, attrs) {
                scope.$watch(attrs.dynamic, function(html) {
                    ele.html(html);
                    $compile(ele.contents())(scope);
                });
            }
        };
    })

    .directive('changeOnTooltip', function($compile) {
            return {
                priority: 0,
                link: function ($scope, $el, $attrs) {
                    console.log("Inside link function");
                    console.log($el);
                    // var par = ele.parentElement;
                    console.log($attrs);
                    console.log($scope);
                    $scope.$watch(
                        function () { return $el[0].nextElementSibling; },
                        function (newValue, oldValue) {
                            if (newValue !== oldValue) {
                                console.log('change');
                                if ($el.hasClass('dark')) {
                                    $el.removeClass('dark');
                                    if ($scope.dictionary.btnText != 'Examine')
                                        $scope.dictionary.btnText = 'Examine';

                                    if ($scope.btnClicked) {
                                        $scope.btnClicked = !$scope.btnClicked;
                                    }

                                    if ($scope.dictionary.dict_right_bottom_visible) {
                                        $scope.dictionary.dict_right_bottom_visible = !$scope.definition.dict_right_bottom_visible;
                                    }
                                } else {
                                    $el.addClass('dark');
                                    if (!$scope.dictionary.step_one_done) {
                                        $scope.dictionary.step_one_done = !$scope.dictionary.step_one_done;
                                    }
                                    if ($scope.dictionary.step_two_visible) {
                                        $scope.dictionary.step_two_visible = !$scope.dictionary.step_two_visible;
                                    }

                                    if ($scope.dictionary.step_two_done) {
                                        $scope.dictionary.step_two_done = !$scope.dictionary.step_two_done;
                                    }

                                    if ($scope.dictionary.step_one_done) {
                                        $scope.dictionary.step_one_done = !$scope.dictionary.step_one_done;
                                    }

                                    if ($scope.dictionary.step_three_done) {
                                        $scope.dictionary.step_three_done = !$scope.dictionary.step_three_done;
                                    }

                                    if ($scope.dictionary.dict_visible) {
                                        $scope.dictionary.dict_visible = !$scope.dictionary.dict_visible;
                                    }

                                    if ($scope.dictionary.dict_right_top_visible) {
                                        $scope.dictionary.dict_right_top_visible = !$scope.dictionary.dict_right_top_visible;
                                    }

                                    if ($scope.dictionary.step_three_visible) {
                                        $scope.dictionary.step_three_visible = !$scope.dictionary.step_three_visible;
                                    }

                                    if ($scope.dictionary.dict_right_middle_visible) {
                                        $scope.dictionary.dict_right_middle_visible = !$scope.dictionary.dict_right_middle_visible;
                                    }

                                    console.log('going to grab text of line');
                                    text = $el[0].innerText;
                                    console.log(text);
                                    var split_text = text.toString().split(" ");
                                    var new_text = "";
                                    var new_word;
                                    for (var x = 0; x < split_text.length; x++) {
                                        // Here we are stripping punctuation-like characters out of the word
                                        new_word = split_text[x].replace(/([.,!?\\-])/, "");
                                        new_text += '<span class="word" ng-click="chooseWord($event)">' + new_word + '</span> ';
                                    }
                                    console.log(new_text);
                                    $scope.dictionary.text = new_text;

                                }
                                console.log(oldValue);
                                console.log(newValue);
                            }
                        }
                    );
                }
            };
        })

        .directive('scrolly', function () {
            return {
                restrict: 'A',
                link: function (scope, element, attrs) {
                    var raw = element[0];
                    console.log('loading directive');

                    element.bind('scroll', function () {
                        console.log('in scroll');
                        console.log(raw.scrollTop + raw.offsetHeight);
                        console.log(raw.scrollHeight);
                        if (raw.scrollTop + raw.offsetHeight > raw.scrollHeight) {
                            console.log("I am at the bottom");
                            scope.$apply(attrs.scrolly);
                        }
                    });
                }
            };
        });