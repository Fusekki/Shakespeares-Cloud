(function () {
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
    $('.navbar-collapse ul li a').click(function () {
        if ($(this).attr('class') !== 'dropdown-toggle active' && $(this).attr('class') !== 'dropdown-toggle') {
            $('.navbar-toggle:visible').click();
        }
    });


    var shakespeareApp = angular.module('shakespeareApp', ['ui.bootstrap', 'ngRoute', 'ngResource', 'ngSanitize', 'angular.filter', 'angularSpinners']);
    shakespeareApp.run(function ($rootScope, $route, $window, $location, $routeParams, $anchorScroll) {

        $rootScope.$on('$routeChangeStart', function (event, next, current) {
            if (next.$$route.controller === "homeCtrl" || next.$$route.controller === undefined) {
                $location.path('/');
            } else if (!current) {
                $location.path('/error');
            }
        });
        $rootScope.$on('$routeChangeSuccess', function (newRoute, oldRoute) {
            $location.hash($routeParams.scrollTo);
            $anchorScroll();
        });
    });
})();
