//SERVICES

angular.module('shakespeareApp')

    .service('parseService', function () {
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
            var date = null;
            var lala = null;
            if (entries.length) {
                // There is 1 or more entries.
                console.log('beginning entry');
                // Check if entry length is above 1
                if (entries.length >= 1) {
                    console.log('entry is length of 1 or more');
                    // Cycle through each of the entries
                    for (var x = 0; x < entries.length; x++) {
                        date = entries[x].date;
                        // if def is in current entry
                        if ('shortdef' in entries[x]) {
                            console.log('checking if word is same');
                            var temp = entries[x].meta.id.replace(/[^a-zA-Z]/g, "")
                            if (word.toLowerCase().includes(temp.toLowerCase())) {
                                newWord = entries[x].meta.id.replace(/[^a-zA-Z]/g, "");
                                def_list.push(defObj(date, newWord));

                            array.forEach((element, index, array) => {
                                    // Code to execute for each element
                            });
                            def = entries[x].shortdef;
                            // console.log('entry: ' + x);
                            // console.log(def);
                            // This should always be an array returned
                            // console.log(typeof (def));
                            // What type of object is dt? if object do the following
                            if (Array.isArray(def)) {
                                for (var y = 0; y < def.length; y++) {
                                    // def_list.push(defObj(def[y], newWord));
                                    processDt(def[y], x, newWord);
                                    console.log('array ' + ' entry: ' + x);
                                // If __text exists, only push it if it has a greater length of 1...meaning it will be a word and not just a character
                                // if ('__text' in def.dt && def.dt.__text.length > 1) {
                                // if ('shortdef' in def && def.shortdef.length > 1)

                                    }
                                }
                                else {
                                    processDt(def[y], x, newWord);
                                }
                            }
                                /* else {
                                    // Item is still an object just doesn't contain __text
                                    processDT(def, x, newWord);
                                } */
                            } else {
                                // These seem to fall under people (like a thesaurus search).
                            }
                        }

                } else {
                    // Only one entry exists but it may contain multiple dts
                    def = entries.entry.def;
                    console.log(def);
                    // console.log(def.length);
                    // console.log(typeof(def));
                    if (def) {
                        if ('dt' in def) {
                            console.log('dt in def');
                            processDT(def, x, newWord);
                        } else {
                            console.log('unable to parse entry.');
                        }
                    }
                }
                console.log('COMPILE-----------------');
                console.log(def_list);
                return {
                    'deflist': def_list,
                    'suglist': null
                }
            } else {
                // No entries returned.
                console.log('no entries returned.');
                // Are there suggestions?
                if ('suggestion' in entries) {
                    var sug = entries.suggestion;
                    console.log('suggestions found');
                    if (typeof (sug) === 'object') {
                        console.log(sug);
                        console.log('There are multiple suggestions.');
                        for (var s = 0; s < sug.length; s++) {
                            sug_list.push(sug[s]);
                        }
                    } else {
                        // type is string
                        console.log('There is only one suggestion.');
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
                console.log(def.dt.length);
                self.idx++;
                console.log(def.dt[i]);
                if (typeof (def.dt[i]) === 'string' && def.dt[i].length > 1) {
                    console.log('type is string' + ' entry: ' + x + ' dt: ' + i);
                    // is item longer than a single character
                    console.log('push ' + self.idx + '-----------------');
                    console.log(typeof (def.dt[i]));
                    newWord = def.dt[i].replace(/^:/, "");
                    def_list.push(defObj(def.date, newWord));
                } else {
                    // type of dt[i] is object
                    console.log('type is object' + ' entry: ' + x + ' dt: ' + i);
                    if (def.dt[i].__text && def.dt[i].__text.length > 1) {
                        console.log('push ' + self.idx + '-----------------' + ' entry: ' + x + ' dt: ' + i);
                        newWord = def.dt[i].__text.replace(/^:/, "");
                        console.log(newWord);
                        def_list.push(defObj(def.date, newWord));
                    } else {
                        console.log('unable to parse this entry: ' + x + ' dt: ' + i);
                        console.log(def.dt[i]);
                    }
                }
            }
        }
    });