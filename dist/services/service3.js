angular.module('shakespeareApp')

    .service('sharedService', function () {
        var def_list = [];
        var sug_list = [];
        var self = this;
        self.idx = null;
        self.showDictionary = null;
        self.filename = null;
        var defObj = function (date, def) {
            return {
                'date': date,
                'def': def
            }
        };
        self.parseEntries = function (word, entries) {
            var newWord = null;
            var def = null;
            if ('entry' in entries) {
                if (entries.entry.length) {
                    for (var x = 0; x < entries.entry.length; x++) {
                        if ('def' in entries.entry[x]) {
                            def = entries.entry[x].def;
                            if (typeof(def.dt) === 'object') {
                                if ('__text' in def.dt && def.dt.__text.length > 1) {
                                    if (def.dt.ew === word.toLowerCase()) {
                                        newWord = def.dt.__text.replace(/^:/, "");
                                        def_list.push(defObj(def.date, newWord));
                                    }
                                } else {
                                    processDT(def, x, newWord);
                                }
                            }
                        }
                    }
                } else {
                    def = entries.entry.def;
                    if (def) {
                        if ('dt' in def) {
                            processDT(def, x, newWord);
                        }
                    }
                }
                return {
                    'deflist': def_list,
                    'suglist': null
                }
            } else {
                if ('suggestion' in entries) {
                    var sug = entries.suggestion;
                    if (typeof(sug) === 'object') {
                        for (var s = 0; s < sug.length; s++) {
                            sug_list.push(sug[s]);
                        }
                    } else {
                        sug_list.push(sug);
                    }
                    return {
                        'deflist': null,
                        'suglist': sug_list
                    }
                }
            }
        };
        var processDT = function (def, x, newWord) {
            for (var i = 0; i < def.dt.length; i++) {
                self.idx++;
                if (typeof(def.dt[i]) === 'string' && def.dt[i].length > 1) {
                    newWord = def.dt[i].replace(/^:/, "");
                    def_list.push(defObj(def.date, newWord));
                } else {
                    if (def.dt[i].__text && def.dt[i].__text.length > 1) {
                        newWord = def.dt[i].__text.replace(/^:/, "");
                        def_list.push(defObj(def.date, newWord));
                    }
                }
            }
        }
    });