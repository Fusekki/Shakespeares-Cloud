//DIRECTIVES

angular.module('shakespeareApp')

    .directive('dynamic', function ($compile) {
        console.log('here');
        return {
            restrict: 'A',
            replace: true,
            link: function (scope, ele, attrs) {
                console.log(scope);
                console.log(ele);
                console.log(attrs);
                scope.$watch(attrs.dynamic, function(html) {
                    ele.html(html);
                    $compile(ele.contents())(scope);
                });
            }
        };
    })
