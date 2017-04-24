//MODULE

(function() {
    // using the function form of use-strict...
    // "use strict";
    // jQuery to collapse the navbar on scroll
    function collapseNavbar() {
        if ($(".navbar").offset().top > 50) {
            $(".navbar-fixed-top").addClass("top-nav-collapse");
        } else {
            $(".navbar-fixed-top").removeClass("top-nav-collapse");
        }
    }

    $(window).scroll(collapseNavbar);
    $(document).ready(collapseNavbar);

    // Closes the Responsive Menu on Menu Item Click
    $('.navbar-collapse ul li a').click(function() {
        if ($(this).attr('class') != 'dropdown-toggle active' && $(this).attr('class') != 'dropdown-toggle') {
            $('.navbar-toggle:visible').click();
        }
    });


    var shakespeareApp = angular.module('shakespeareApp', ['ui.bootstrap', 'ngRoute', 'ngResource', 'angularSpinners', 'ngSanitize']);
    // console.log('here');


    shakespeareApp.run(function ($rootScope, $route, $window, $location, $routeParams, $anchorScroll) {
        // console.log('here');

        $rootScope.$on('$routeChangeStart', function (event, next, current) {
            // console.log(event);

            // console.log('here');
            if (next.$$route.controller == "homeCtrl" || next.$$route.controller == undefined) {
                // console.log('here');
                // console.log(next);
                // console.log(event);
                // console.log(current);
                $location.path('/');
            } else if (!current) {
                $location.path('/error');
            }
        });

        $rootScope.$on('$routeChangeSuccess', function(newRoute, oldRoute) {
            $location.hash($routeParams.scrollTo);
            $anchorScroll();
        });


    });

    shakespeareApp.filter('unsafe', ['$sce', function($sce){
        return function(val) {
            if (typeof(val) != 'string') {
                val = val.toString();
            }
            return $sce.trustAsHtml(val);
        };
    }]);

    // shakespeareApp.filter('unsafe', function($sce) {
    //     return $sce.trustAsHtml;
    // });


})();





