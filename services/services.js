//SERVICES

angular.module('calibreApp')


// Assigning the cachFactory to 'myCache'.  Cache Factory stores results after each successful search to limit API calls.,
    .factory('myCache', function($cacheFactory) {
        return $cacheFactory('myCache');
    })

    // logic service is a shared service between controllers.  It's purpose is twofold.  It functions as the app's memory by storing scope variables between controllers.  If you notice,
    // the controller's first retrieve the category, search term, and various other values.  It's second purpose is to contain commonly used functions (such as capitalize, etc).
    .service('logicService', function (myCache, $rootScope, $location, $route, $templateCache) {
        var self = this;

        var window_sizes = ['xs', 'xs+', 'sm', 'sm+', 'med', 'med+', 'lrg', 'lrg+'];

        var spinner = null;

        self.orientation = screen.orientation.angle;

        var capitalize = function(word) {
            return word.charAt(0).toUpperCase() + word.slice(1);
        };

        var lowerCase = function(word) {
            return word.charAt(0).toLowerCase() + word.slice(1);
        };

        // function to convert date from european time to local with hour and minute.
        var convertToLocal = function(some_date) {
            return new Date(some_date).toLocaleString().replace(/(.*)\D\d+/, '$1');
        };

        // function to convert date from european time to local without hour and minute.  Used for film release date in the filmresult template.

        var convertToLocalDate = function(some_date) {
            return new Date(some_date).toLocaleDateString();
        };

        // function to convert european weight to american standard.
        var convertToLbs = function (mass) {
            var approx = mass/0.45359237;
            var lbs = Math.floor(approx);
            var oz = Math.floor((approx - lbs) * 16);
            return lbs + " lbs " + oz +  " oz";
        };

        // function to convert meters to feet and inches
        var convertToFeet = function (height) {
            var actualFeet = ((height * 0.393700) / 12);
            var feet = Math.floor(actualFeet);
            var inches = Math.round((actualFeet - feet) * 12);
            return feet + "'" + inches + '"';
        };

        // function to get a cache item.
        var getCacheItem = function (item) {
            return myCache.get(item);
        };

        // function to set a cache item.
        var setCacheItem = function (cache, items) {
            myCache.put(cache, items);
        };

        var navigateTo = function(url) {
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

        $(window).on("orientationchange",function(){
            // Announce the new orientation number
            self.orientation = screen.orientation.angle;
            // console.log(self.orientation);
            $rootScope.$broadcast('orientation_change');
        });

        // This function is so that JS can store the media size.  This is necessary for future CSS calculations set by the JS code.
        var checkWindowSize = function() {
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

            getOrientation: function() {
                return screen.orientation.angle;
            },

            getWindowSize: function() {
                return checkWindowSize();
            },

            // End Debug area.

            // get spinner state
            getSpinner: function() {
                return spinner;
            },
            // set spinner state.
            setSpinner: function(activate) {
                spinner = activate;
            },

            // returns the api count.  this is used to track the number of subsequent API calls needed to be made from the original JSON object.  Remember, the JOSN returned containes URLs for
            // some fields
            getApiCount: function() {
                return api_count;
            },

            // Sets the API count.
            // We ate going to use this variable to store the number of api calls.

            setApiCount: function(num) {
                api_count = num;
                return true;
            },

            // After each successful API call is initiated, this function is called to increase the API count.
            incrementApiCount: function() {
                api_count++;
                if (api_count === 1) {
                    spinner = true;
                }
                return true;
            },

            // After each successful API call is returned, this function is called to mark off an API call.
            decrementApiCount: function() {
                api_count--;
                if (!api_count) {
                    spinner = false;
                    return false;
                }
                return true;
            },

            // Public functions for set and get cache.

            setCacheItem: function(name, contents) {
                setCacheItem(name, contents);
            },

            getCacheItem: function(cacheName) {
                return getCacheItem(cacheName);
            },

            // Public function to get categories.
            getCategories: function() {
                return categories;
            },

            heightThis: function(height) {
                return convertToFeet(height);
            },

            capitalizeThis: function(word) {
                return capitalize(word);
            },

            lowerCaseThis: function(word) {
                return lowerCase(word);
            },

            localizeThis: function(some_date) {
                return convertToLocal(some_date);
            },

            localizeThisDate: function(some_date) {
                return convertToLocalDate(some_date);
            },

            navTo: function(url) {
                navigateTo(url);
            },

            weightThis: function(mass) {
                return convertToLbs(mass);
            },

            checkValue: function(returnedValue) {
                if (values_to_not_show.includes(returnedValue)) {
                    return false;
                }
                return true;
            }
        };
    })

    .service('apiService', function($http, logicService) {

        var self = this;

        // These variables wire the values from the logic service to the API service.
        self.category = logicService.lowerCaseThis(logicService.category);
        self.search_term = logicService.search_term;

        // This is the wrapper for the API call when selected from the category from the home page.
        this.getData = function (callback, err) {
            // This increments the API count which in return sets the spinner to true if not already.
            if (logicService.incrementApiCount()) {
                // console.log('succesfully increased API count.');
                // console.log('API total is now at ' + logicService.getApiCount() );
            }
            $http.get('https://swapi.co/api/' + self.category + '/?search=' + self.search_term)
                .then(callback, err)
                .finally(function () {
                        // This lowers the API count.  If it returns true then it sets the spinner to false.  True meaning the API count has reached 0.
                        if (!logicService.decrementApiCount()) {
                            // logicService.setSpinner(false);
                        } else {
                            // console.log('API count is reached zero.  Trigger spinner to stop.');
                            // logicService.spinner = false;
                            //  Add a timeout for setting the spinner to allow the parsing to finish before removing.
                            $timeout(function () {
                                logicService.setSpinner(false);
                            }, 1000);
                        }
                    }
                );
        };
    })
