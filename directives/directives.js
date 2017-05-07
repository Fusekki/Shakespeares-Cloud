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

    .directive('shithead', ['$timeout', function($timeout) {
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
                                } else {
                                    $el.addClass('dark');
                                }
                                console.log(oldValue);
                                console.log(newValue);
                            }
                        }
                    );
                }
            };
        }]);