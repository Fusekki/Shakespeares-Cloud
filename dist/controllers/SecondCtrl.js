angular.module('shakespeareApp')

    .controller('connectCtrl', function($scope, logicService, apiService) {

        apiService.getData(function(response) {
            var data = response.data;
            console.log(data);
        }, function(err) {
            console.log(err.status);
        });

    })