angular.module('shakespeareApp')
    .factory('myCache', function ($cacheFactory) {
        return $cacheFactory('myCache');
    })