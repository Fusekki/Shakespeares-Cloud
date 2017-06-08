angular.module('shakespeareApp')

// Assigning the cacheFactory to 'myCache'.  Cache Factory stores results after each successful search to limit API calls.,
    .factory('myCache', function ($cacheFactory) {
        return $cacheFactory('myCache');
    })