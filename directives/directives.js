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
                                    // if ($scope.i_done) {
                                    //     $scope.i_done = !$scope.i_done;
                                    // }
                                    // if ($scope.so_Active) {
                                    //     $scope.so_Active = !$scope.so_Active;
                                    // }
                                    // if ($scope.st_Active) {
                                    //     $scope.st_Active = !$scope.st_Active;
                                    // }
                                    // if ($scope.isActive) {
                                    //     $scope.isActive = !$scope.isActive;
                                    // }
                                    if ($scope.btnText != 'Examine')
                                        $scope.btnText = 'Examine';

                                    if ($scope.btnClicked) {
                                        $scope.btnClicked = !$scope.btnClicked;
                                    }
                                } else {
                                    $el.addClass('dark');
                                    if (!$scope.i_done) {
                                        $scope.i_done = !$scope.i_done;
                                    }
                                    if ($scope.so_Active) {
                                        $scope.so_Active = !$scope.so_Active;
                                    }

                                    if ($scope.s_done) {
                                        $scope.s_done = !$scope.s_done;
                                    }

                                    if ($scope.i_done) {
                                        $scope.i_done = !$scope.i_done;
                                    }


                                    if ($scope.t_done) {
                                        $scope.t_done = !$scope.t_done;
                                    }


                                    if ($scope.isActive) {
                                        $scope.isActive = !$scope.isActive;
                                    }

                                    if ($scope.rt_Active) {
                                        $scope.rt_Active = !$scope.rt_Active;
                                    }

                                    if ($scope.st_Active) {
                                        $scope.st_Active = !$scope.st_Active;
                                    }

                                    if ($scope.rm_Active) {
                                        $scope.rm_Active = !$scope.rm_Active;
                                    }



                                    console.log('going to grab text of line');
                                    // grabText($el[0].innerHTML);
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
                                    $scope.text = new_text;
                                    // if (!$scope.isActive) {
                                    //     $scope.isActive = !$scope.isActive;
                                    // }
                                }
                                console.log(oldValue);
                                console.log(newValue);
                            }
                        }
                    );
                }
            };
        });