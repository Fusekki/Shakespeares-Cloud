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

    .directive("mydir", function () {
        return {
            link: function (scope, ele, attrs) {
                console.log("Inside link function");
                console.log(ele);
                scope.$watch(ele, function(newValue, oldValue) {
                    console.log(oldValue);
                        if (newValue !== oldValue) {
                            console.log(newValue);

                        }
                });
                // console.log(ele.nextElementSibling.previousElementSibling);?

                // function () { return ele[0].childNodes.length; },
                // function (newValue, oldValue) {
                //     if (newValue !== oldValue) {
                //         // code goes here
                //     }
                }
                // console.log(ele);
                //
                // console.log(ele.nextSibling);
                //
                // // var movable = ele.find('.tooltip');
                // if (ele.nextSibling) {
                //     ele.addClass('dark')
                }
                // console.log(movable);
                // scope.$watch("model.input", function (value) {
                //     if(value === "password") {
                //         element.children(1).toggleClass("alert-box alert");
                //     }
                // });
            // }
        }
    )
