//SERVICES

angular.module('shakespeareApp')

.service('sharedService', function () {

    var def_list = [];
    var sug_list = [];
    var self = this;
    self.idx;

    self.filename = null;

    var defObj = function(date, def) {
        return {
            'date': date,
            'def': def
        }
    };

    self.parseEntries = function(entries) {
        if ('entry' in entries) {
            // There is 1 or more entries.
            console.log('beginning entry');
            // Check if entry length is above 1
            if (entries.entry.length) {
                console.log('entry is length of 1 or more');
                // Cycle through each of the entries
                for (var x = 0; x < entries.entry.length; x++) {
                    // if def is in current entry
                    if ('def' in entries.entry[x]) {
                        var def = entries.entry[x].def;
                        console.log('entry: ' + x);
                        console.log(def);
                        // This should always be an object returned
                        console.log(typeof(def));
                        // What type of object is dt? if object do the following
                        if (typeof(def.dt) == 'object') {
                            console.log('OBJECT ' + ' entry: ' + x);
                            var newWord;
                            // If __text exists, only push it if it has a greater length of 1...meaning it will be a word and not just a character
                            if ('__text' in def.dt && def.dt.__text.length > 1) {
                                // console.log('WE SHOULD NEVER GET HERE');
                                console.log('push ' + self.idx + '-----------------');
                                newWord = def.dt.__text.replace(/^:/, "")
                                // console.log('--------------NOT GOING TO PUSH-------------');
                                def_list.push(defObj(def.date, newWord));
                            } else {
                                // Item is still an object just doesn't contain __text
                                for (var i = 0; i < def.dt.length; i++) {
                                    console.log(def.dt.length);
                                    self.idx++;
                                    console.log(def.dt[i]);
                                    // console.log(typeof(def.dt[i]));
                                    if (typeof(def.dt[i]) == 'string' && def.dt[i].length > 1) {
                                        // console.log('WE SHOULD NEVER GET HERE');
                                        console.log('type is string' + ' entry: ' + x + ' dt: ' + i);
                                        // is item longer than a single character
                                        console.log('push ' + self.idx + '-----------------');
                                        console.log(typeof(def.dt[i]));
                                        newWord = def.dt[i].replace(/^:/, "");
                                        def_list.push(defObj(def.date, newWord));
                                    } else  {
                                        // type of dt[i] is object
                                        // console.log('WE SHOULD NEVER GET HERE');
                                        console.log('type is object' + ' entry: ' + x + ' dt: ' + i);
                                        if (def.dt[i].__text && def.dt[i].__text.length > 1) {
                                            console.log('push ' + self.idx + '-----------------' + ' entry: ' + x + ' dt: ' + i);
                                            newWord = def.dt[i].__text.replace(/^:/, "");
                                            def_list.push(defObj(def.date, newWord));
                                            // def_list.push(def.dt.replace(/^:/, ""));
                                        } else {
                                            console.log('unable to parse this entry: ' + x + ' dt: ' + i);
                                            console.log(def.dt[i]);
                                        }
                                    }
                                }
                            }
                        } else  {
                            // These seme to fall under people (like a thesaurus search).
                            console.log('STRING' + ' entry: ' + x + ' dt: 0');
                            console.log('push ' + self.idx + '-----------------' + ' entry: ' + x + ' dt: 0');
                            newWord = def.dt.replace(/^:/, "");
                            console.log('--------------NOT GOING TO PUSH-------------');
                            // def_list.push(defObj(def.date, newWord));
                        }
                    }
                }
            } else {
                // Only one entry exists but it may contain multiple dts
                var def = entries.entry.def;
                console.log(def);
                console.log(def.length);
                if (typeof(def.def) == 'string') {
                    console.log('push ' + self.idx + '-----------------');
                    newWord = def.def.replace(/^:/, "")
                    def_list.push(defObj(def.date, newWord));
                } else {
                    console.log('unable to parse entry.');
                }
            }
            console.log('COMPILE-----------------');
            console.log(def_list);
            // $scope.def_cards = def_list;
            return {
                'deflist': def_list,
                'suglist': null
            }

        } else {
            // No entries returned.
            console.log('no entries returned.');
            // Are there suggestions?
            if ('suggestion' in entries) {
                // $scope.dictionary.dict_right_bottom_visible = true;
                // $scope.dictionary.dict_right_middle_visible = false;
                var sug = entries.suggestion;
                console.log('sugestions found');
                if (typeof(sug) == 'object') {
                    console.log(sug);
                    console.log('There are multiple suggestions.');
                    for (var s = 0; s < sug.length; s++) {
                        sug_list.push(sug[s]);
                    }
                } else {
                    // type is string
                    console.log('There is only one suggestion.');
                    // console.log(sug);
                    sug_list.push(sug);
                }
                // $scope.sug_cards = sug_list;
                return {
                    'deflist': null,
                    'suglist': sug_list
                }
            }
        }
    }
})