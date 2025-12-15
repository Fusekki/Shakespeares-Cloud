angular.module('shakespeareApp')

    .service('apiService', function ($http, logicService, parseService, $sce) {
        var self = this;
        self.key = 'ac46cd34-fb0b-47ed-a7f8-56b5ff24cc65';
        // self.url = 'http://www.dictionaryapi.com/api/v1/references/collegiate/xml/';
        self.url = 'https://www.dictionaryapi.com/api/v3/references/collegiate/json/'

        $sce.trustAsResourceUrl(self.url);

        this.getHTML = function (callback, err) {
            $http.get(parseService.filename)
                .then(callback, err)
        };

        self.getDef = function (callback, err) {
            $http({
                method: "GET",
                url: self.url + self.word + '?key=' + self.key
            }).then(callback, err);
        }
    });
