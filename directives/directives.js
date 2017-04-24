//DIRECTIVES

angular.module('shakespeareApp')

    .directive('nop1', function(){
        return {
            link: function(scope, element, attr){
                console.log(scope);
                console.log(element);
                // console.log(typeof(element));
                var test = element[0];
                // console.log(typeof(test));
                console.log(test);
                console.log(angular.element(test));
                var here = angular.element(test);
                console.log(here);



                console.log(angular.element(element).find('.play_container'));

                var children =element[0].children;

                console.log(children);

                var some = children.find('div');

                console.log(some);


                // elm.css('color', 'red');
                // var myEl = angular.element( '.play' );
                // console.log(myEl);
                // myEl.addClass('alpha');
                // console.log(element[0].querySelector('.speech'));
                // console.log(angular.element(test).find('div'));
                // element[0].contents

                // var elems = angular.element.find('div.play_container').contents(); //returns all the div's in the $elements
                // console.log(elems);
                // angular.forEach(elems,function(v,k){
                //     if(angular.element(v).hasClass('act')){
                //         console.log(angular.element(v));
                //     }})
            }
        }
    })


        .directive('scrollTo', ['ScrollTo', function(ScrollTo){
            return {
                restrict : "AC",
                compile : function(){

                    return function(scope, element, attr) {
                        element.bind("click", function(event){
                            ScrollTo.idOrName(attr.scrollTo, attr.offset);
                        });
                    };
                }
            };
        }])



    .directive('nop', function ($compile) {
        return {
            restrict: 'E',
            scope: {
                items: "="
            },

            // Whether you define it this way or not, this is the order of
            // operation (execution) behind every AngularJS directive.
            // When you use the more simple syntax, Angular actually generates this
            // structure for you (this is done by the $compile service):

            compile: function CompilingFunction($templateElement, $templateAttributes, transcludeFn) {

                // The compile function hooks you up into the DOM before any scope is
                // applied onto the template. It allows you to read attributes from
                // the directive expression (i.e. tag name, attribute, class name or
                // comment) and manipulate the DOM (and only the DOM) as you wish.

                // When you let Angular generate this portion for you, it basically
                // appends your template into the DOM, and then some ("some" includes
                // the transclude operation, but that's out of the $scope of my answer ;) )

                return function LinkingFunction($scope, $element, $attrs) {

                    // The link function is usually what we become familiar with when
                    // starting to learn how to use directives. It gets fired after
                    // the template has been compiled, providing you a space to
                    // manipulate the directive's scope as well as DOM elements.

                    var html ='<div ng-repeat="item in items">I should not be red</div>';
                    var e = $compile(html)($scope);
                    $element.replaceWith(e);
                };
            }
        };
    })



