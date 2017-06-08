angular.module('shakespeareApp')

// logic service is a shared service between controllers.  It's purpose is twofold.  It functions as the app's memory by storing scope variables between controllers.  If you notice,
// the controller's first retrieve the category, search term, and various other values.  It's second purpose is to contain commonly used functions (such as capitalize, etc).
    .service('logicService', function (myCache, $rootScope, $location, $route, $templateCache) {
        var self = this;

        var window_sizes = ['xs', 'xs+', 'sm', 'sm+', 'med', 'med+', 'lrg', 'lrg+', 'desk'];

        self.orientation = screen.orientation.angle;

        // function to get a cache item.
        var getCacheItem = function (item) {
            return myCache.get(item);
        };


        // function to set a cache item.
        var setCacheItem = function (cache, items) {
            myCache.put(cache, items);
        };

        var navigateTo = function (url) {
            if ($location.path() === url) {
                // console.log('sending route.reload');
                var currentPageTemplate = $route.current.templateUrl;
                $templateCache.remove(currentPageTemplate);
                $route.reload();
            } else {
                // console.log('path different. sending to new path');
                $location.path(url);
            }
        };

        // Listener for orientation changes on mobile devices.
        //
        // $(window).on("orientationchange", function () {
        //     // Announce the new orientation number
        //     self.orientation = screen.orientation.angle;
        //     // console.log(self.orientation);
        //     $rootScope.$broadcast('orientation_change');
        // });

        // This function is so that JS can store the media size.  This is necessary for future CSS calculations set by the JS code.
        var checkWindowSize = function () {
            if (window.matchMedia("(min-width : 769px)").matches) {
                return window_sizes[8];
            }
            if (window.matchMedia("(min-width : 768px)").matches) {
                // iPhone6P
                if (window.matchMedia("orientation : portrait").matches) {
                    return window_sizes[6];
                }
                else {
                    return window_sizes[7];
                }
            }
            else if (window.matchMedia("(min-width : 414px)").matches) {
                // iPhone6P
                if (window.matchMedia("orientation : portrait").matches) {
                    return window_sizes[4];
                }
                else {
                    return window_sizes[5];
                }

            }
            else if (window.matchMedia("(min-width : 375px)").matches) {
                // iPhone6
                if (window.matchMedia("orientation: portrait").matches) {
                    return window_sizes[2];
                }
                else {
                    return window_sizes[3];
                }

            }
            else if (window.matchMedia("(min-width: 320px)").matches) {
                // iPhone5
                if (window.matchMedia("orientation: portrait").matches) {
                    return window_sizes[0];
                }
                else {
                    return window_sizes[1];
                }
            }

        };

        // Public variables

        return {

            // Debug area

            getOrientation: function () {
                return screen.orientation.angle;
            },

            getWindowSize: function () {
                return checkWindowSize();
            },

            // End Debug area.

            // Public functions for set and get cache.

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
