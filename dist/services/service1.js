angular.module('shakespeareApp')
    .service('logicService', function (myCache, $rootScope, $location, $route, $templateCache) {
        var self = this;

        var window_sizes = ['xs', 'xs+', 'sm', 'sm+', 'med', 'med+', 'lrg', 'lrg+', 'desk'];

        var getCacheItem = function (item) {
            return myCache.get(item);
        };
        var setCacheItem = function (cache, items) {
            myCache.put(cache, items);
        };

        var navigateTo = function (url) {
            if ($location.path() === url) {
                var currentPageTemplate = $route.current.templateUrl;
                $templateCache.remove(currentPageTemplate);
                $route.reload();
            } else {
                $location.path(url);
            }
        };
        var checkWindowSize = function () {
            if (window.matchMedia("(min-width : 769px)").matches) {
                return window_sizes[8];
            }
            if (window.matchMedia("(min-width : 768px)").matches) {
                if (window.matchMedia("orientation : portrait").matches) {
                    return window_sizes[6];
                }
                else {
                    return window_sizes[7];
                }
            }
            else if (window.matchMedia("(min-width : 414px)").matches) {
                if (window.matchMedia("orientation : portrait").matches) {
                    return window_sizes[4];
                }
                else {
                    return window_sizes[5];
                }

            }
            else if (window.matchMedia("(min-width : 375px)").matches) {
                if (window.matchMedia("orientation: portrait").matches) {
                    return window_sizes[2];
                }
                else {
                    return window_sizes[3];
                }

            }
            else if (window.matchMedia("(min-width: 320px)").matches) {
                if (window.matchMedia("orientation: portrait").matches) {
                    return window_sizes[0];
                }
                else {
                    return window_sizes[1];
                }
            }

        };

        return {

            getOrientation: function () {
                return screen.orientation.angle;
            },

            getWindowSize: function () {
                return checkWindowSize();
            },

            setCacheItem: function (name, contents) {
                setCacheItem(name, contents);
            },

            getCacheItem: function (cacheName) {
                return getCacheItem(cacheName);
            },

            navTo: function (url) {
                navigateTo(url);
            }

        };
    });
