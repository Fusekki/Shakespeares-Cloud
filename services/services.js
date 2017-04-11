//SERVICES

angular.module('shakespeareApp')


// Assigning the cachFactory to 'myCache'.  Cache Factory stores results after each successful search to limit API calls.,
    .factory('myCache', function($cacheFactory) {
        return $cacheFactory('myCache');
    })

    .service('modelService', function() {

        var self = this;

        self.categories = [
            "all",
            "comedy",
            "history",
            "tragedy"
        ];

        self.plays = [
            {
                title: "All's Well That Ends Well",
                category: "comedy",
                img: "All_well_that_ends_well_218x218.jpg",
                file: "alls_well_that_ends_well_FF.htm"
            },
            {
                title: "Antony and Cleopatra",
                category: "tragedy",
                img: "Antony_and_Cleopatra218x218.jpg",
                file: "antony_cleopatra_FF.htm"
            },
            {
                title: "As You Like It",
                category: "comedy",
                img: "As_You_Like_It_218x218.jpg",
                file: "as_you_like_it_FF.htm"
            },
            {
                title: "Comedy of Errors",
                category: "comedy",
                img: "Comedy_of_Errors218x218.jpg",
                file: "comedy_of_errors_FF.htm"
            },
            {
                title: "Coriolanus",
                category: "tragedy",
                img: "Coriolanus218x218.jpg",
                file: "coriolanus_FF.htm"
            },
            {
                title: "Cymbeline",
                category: "comedy",
                img: "Cymbeline_218x218.jpg",
                file: "cymbeline_FF.htm"
            },
            {
                title: "Hamlet",
                category: "tragedy",
                img: "Hamlet_218x218.jpg",
                file: "hamlet_FF.htm"
            },
            {
                title: "Henry IV, Part I",
                category: "history",
                img: "Henry_IV_P1218x218.jpg",
                file: "henry_iv_pt1_FF.htm"
            },
            {
                title: "Henry IV, Part II",
                category: "history",
                img: "Henry_IV_P2218x218.jpg",
                file: "henry_iv_pt2_FF.htm"
            },
            {
                title: "Henry V",
                category: "history",
                img: "Henry_V218x218.jpg",
                file: "henry_v_FF.htm"
            },
            {
                title: "Henry VI, Part I",
                category: "history",
                img: "Henry_VI_P1218x218.jpg",
                file: "henry_vi_pt1_FF.htm"
            },
            {
                title: "Henry VI, Part II",
                category: "history",
                img: "Henry_VI_P2218x218.jpg",
                file: "henry_vi_pt2_FF.htm"
            },
            {
                title: "Henry VI, Part III",
                category: "history",
                img: "Henry_VI_P3218x218.jpg",
                file: "henry_vi_pt3_FF.htm"
            },
            {
                title: "Henry VIII",
                category: "history",
                img: "Henry_VIII_218x218.jpg",
                file: "henry_viii_FF.htm"
            },
            {
                title: "Julius Caesar",
                category: "tragedy",
                img: "Julius_Caesar_218x218.jpg",
                file: "julius_caesar_FF.htm"
            },
            {
                title: "King John",
                category: "history",
                img: "King_John_218x218.jpg",
                file: "king_john_FF.htm"
            },
            {
                title: "King Lear",
                category: "tragedy",
                img: "King_Lear218x218.jpg",
                file: "king_lear_FF.htm"
            },
            {
                title: "Love's Labour's Lost",
                category: "comedy",
                img: "Loves_Labours_Lost218x218.jpg",
                file: "loves_labours_lost_FF.htm"
            },
            {
                title: "Macbeth",
                category: "tragedy",
                img: "Macbeth218x218.jpg",
                file: "macbeth_FF.htm"
            },
            {
                title: "Measure for Measure",
                category: "comedy",
                img: "Measure_for_Measure218x218.jpg",
                file: "measure_for_measure_FF.htm"
            },
            {
                title: "The Merchant of Venice",
                category: "comedy",
                img: "Merchant_of_Venice218x218.jpg",
                file: "merchant_of_venice_FF.htm"
            },
            {
                title: "Merry Wives of Windsor",
                category: "comedy",
                img: "Merry_Wives_Of_Windsor218x218.jpg",
                file: "merry_wives_of_windsor_FF.htm"
            },
            {
                title: "A Midsummer Night's Dream",
                category: "comedy",
                img: "A_Midsummer218x218.jpg",
                file: "midsummer_nights_dream_FF.htm"
            },
            {
                title: "Much Ado about Nothing",
                category: "comedy",
                img: "Much_Ado_About_Nothing218x218.jpg",
                file: "much_ado_about_nothing_FF.htm"
            },
            {
                title: "Othello",
                category: "tragedy",
                img: "Othello_218x218.jpg",
                file: "othello_FF.htm"
            },
            {
                title: "Pericles",
                category: "comedy",
                img: "Pericles218x218.jpg",
                file: "pericles_F3.htm"
            },
            {
                title: "Richard II",
                category: "history",
                img: "Richard_II218x218.jpg",
                file: "king_richard_ii_FF.htm"
            },
            {
                title: "Richard III",
                category: "history",
                img: "Richard_III218x218.jpg",
                file: "richard_iii_FF.htm"
            },
            {
                title: "Romeo and Juliet",
                category: "tragedy",
                img: "Romeo_and_Juliet218x218.jpg",
                file: "romeo_and_juliet_FF.htm"
            },
            {
                title: "The Taming of the Shrew",
                category: "comedy",
                img: "Taming_of_the_Shrew218x218.jpg",
                file: "taming_of_the_shrew_FF.htm"
            },
            {
                title: "The Tempest",
                category: "comedy",
                img: "The_Tempest218x218.jpg",
                file: "tempest_FF.htm"
            },
            {
                title: "Timon of Athens",
                category: "tragedy",
                img: "Timon_of_Athens218x218.jpg",
                file: "timon_of_athens_FF.htm"
            },
            {
                title: "Titus Andronicus",
                category: "tragedy",
                img: "Titus_Andronicus218x218.jpg",
                file: "titus_andronicus_FF.htm"
            },
            {
                title: "Troilus and Cressida",
                category: "tragedy",
                img: "Troilus_and_Cressida218x218.jpg",
                file: "troilus_cressida_FF.htm"
            },
            {
                title: "Twelfth Night",
                category: "comedy",
                img: "Twelfth_Night218x218.jpg",
                file: "twelfth_night_FF.htm"
            },
            {
                title: "Two Gentlemen of Verona",
                category: "comedy",
                img: "Two_Gentlemen_of_Verona218x218.jpg",
                file: "two_gentlemen_of_verona_FF.htm"
            },
            {
                title: "The Winter's Tale",
                category: "comedy",
                img: "Winters_Tale218x218.jpg",
                file: "winters_tale_FF.htm"
            }
        ];

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

    .service('apiService', function($http, logicService, sharedService) {


        var self = this;

        // self.getItem = function(callback, err) {
        //     $http.jsonp('https://us.api.battle.net/wow/character/' + this.selectedRealm + '/' + this.name +  '?jsonp=JSON_CALLBACK',  {cache: true, params: {  locale: keys.region, apikey: keys.privateKey, fields: "items" } } )
        //         .then(callback,err);
        // }

        this.getPlay = function (callback, err) {
            $http.get('https://labs.jstor.org/shakespeare/' + self.play_slug, {
                cache: true,
                headers: {"Authorization": "JWT eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJleHAiOjE1MjI1OTAxNTcsInVzZXJuYW1lIjoiZ3JpbWFsIn0.VZFKQ24YsiIydk5PsjYoYK72iso5SBEt4_PgQKO9I8c"}
            })
                .then(callback, err)
        };


        // This is the wrapper for the API call when selected from the category from the home page.
        this.getData = function (callback, err) {
            $http.get('https://labs.jstor.org/api/shakespeare?facet=play', {
                cache: true,
                headers: {"Authorization": "JWT eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJleHAiOjE1MjI1OTAxNTcsInVzZXJuYW1lIjoiZ3JpbWFsIn0.VZFKQ24YsiIydk5PsjYoYK72iso5SBEt4_PgQKO9I8c"}
            })
                .then(callback, err)
            // .finally(function () {
            //         // This lowers the API count.  If it returns true then it sets the spinner to false.  True meaning the API count has reached 0.
            //         if (!logicService.decrementApiCount()) {
            //             // logicService.setSpinner(false);
            //         } else {
            //             console.log('API count is reached zero.  Trigger spinner to stop.');
            //             logicService.spinner = false;
            //             //  Add a timeout for setting the spinner to allow the parsing to finish before removing.
            //             $timeout(function () {
            //                 logicService.setSpinner(false);
            //             }, 1000);
            //         }
            //     }
        };

        this.getXML = function (callback, err) {
            $http.get(sharedService.filename,
                {
                    // transformResponse: function (cnv) {
                    //     var x2js = new X2JS();
                    //     // Convert XML to JSON
                    //     // var aftCnv = x2js.xml_str2json(cnv);
                    //     // Convert XML to String
                    //     var aftCnv = x2js.json2xml_str(cnv);
                    //     return aftCnv;
                    // }

                })
                .then(callback, err)
/*                .success(function (response) {
                    $scope.details = response.urlset.url;
                    console.log(response);
                });*/
        };
        // };
    })

    .service('sharedService', function (myCache, $rootScope, $location, $route, $templateCache) {

        var self = this;

        self.filename = null;

        var stripped_string = function(unparsed_string) {
            // console.log(unparsed_string);

            var start = unparsed_string.indexOf('<div id="header">');
            var end = unparsed_string.indexOf('<div id="separator">');

            return unparsed_string.slice(start, end);
        };

        // Public variables

        return {

            parseString: function(unparsed_string) {
                return stripped_string(unparsed_string);
            }

        };
    })


    .service('xmlService', function (x2js) {
        var xmlDoc = x2js.json2xml(
            {
                MyRoot : {
                    MyChild : 'my_child_value',
                    MyAnotherChild: 10,
                    MyArray : [ 'test', 'test2' ],
                    MyArrayRecords : [
                        {
                            ttt : 'vvvv'
                        },
                        {
                            ttt : 'vvvv2'
                        }
                    ]
                }
            }
        );
    });
