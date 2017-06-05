//SERVICES

angular.module('shakespeareApp')

    .service('modelService', function() {

        var self = this;

        self.categories = [
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

        self.searchModel = function (value) {
            for (var key in self.plays) {
                if (self.plays[key].title === value) {
                    return self.plays[key].file;
                }
            }
        };

    })