angular.module('shakespeareApp')

    .filter('unsafe', ['$sce', function($sce){
        return function(val) {
            if (typeof(val) != 'string') {
                val = val.toString();
            }
            return $sce.trustAsHtml(val);
        };
    }]);