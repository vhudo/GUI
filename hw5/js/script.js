/*
File: script.js
 GUI Assignment5: Implementing a Bit of Scrabble with Drag-and-Drop
 Vu Ho, UMass Lowell Computer Science
 Copyright (c) 2021 by Vu. All rights reserved. May be freely copied or excerpted for educational purposes with credit to the author.
 updated by VH on Dec 15, 2021 at 11:34 PM
 
source:
 .validate() jQuery Plugin: https://jqueryvalidation.org/
 https://jqueryvalidation.org/documentation/
 http://yongcho.github.io/GUI-Programming-1/assignment9.html
 https://johnresig.com/blog/dictionary-lookups-in-javascript/
*/

var row_obj = [];
var curr_score = 0;
var curr_word = "";
var total_score = 0;
var multiply_word = 1;
var multiply_letter = 1;
var word = [];
var flag = false;
var dictionary = {};

var DEBUG = false;
var REMAINING_LETTERS = 7;

const NUM_TILES = 15;
const SCORING_VALUES = [
    {"letter":"A", "value":1, "amount":9},
    {"letter":"B", "value":3, "amount":2},
    {"letter":"C", "value":3, "amount":2},
    {"letter":"D", "value":2, "amount":4},
    {"letter":"E", "value":1, "amount":12},
    {"letter":"F", "value":4, "amount":2},
    {"letter":"G", "value":2, "amount":3},
    {"letter":"H", "value":4, "amount":2},
    {"letter":"I", "value":1, "amount":9},
    {"letter":"J", "value":8, "amount":1},
    {"letter":"K", "value":5, "amount":1},
    {"letter":"L", "value":1, "amount":4},
    {"letter":"M", "value":3, "amount":2},
    {"letter":"N", "value":1, "amount":5},
    {"letter":"O", "value":1, "amount":8},
    {"letter":"P", "value":3, "amount":2},
    {"letter":"Q", "value":10, "amount":1},
    {"letter":"R", "value":1, "amount":6},
    {"letter":"S", "value":1, "amount":4},
    {"letter":"T", "value":1, "amount":6},
    {"letter":"U", "value":1, "amount":4},
    {"letter":"V", "value":4, "amount":2},
    {"letter":"W", "value":4, "amount":2},
    {"letter":"X", "value":8, "amount":1},
    {"letter":"Y", "value":4, "amount":2},
    {"letter":"Z", "value":10, "amount":1},
    {"letter":"_", "value":0,  "amount":2}

]

function clear_letter_id() {
    for (var i = 0; i < row_obj.length; i++) {
        row_obj[i].letter_id = "";
    }
}

function reset_word() {
    clear_letter_id();
    $(".scrabble-rack").empty();
    total_score = 0;
    multiply_word = 1;
    document.getElementById('word').innerHTML = "Word: ";
    document.getElementById('score').innerHTML = "Score: 0";
    document.getElementById('total-score').innerHTML = "Total Score: 0";
    
    create_board_tiles();
    prepare_drop();
}

function print_arr(word) {
    var rval = "";

    for (var i = 0; i < word.length; i++) {
        rval += word[i];
    }

    return rval;
}

function prepare_drop() {
    /* Initialize the drag-and-drop mechanics of the tiles/rack/board.
     https://www.pureexample.com/jquery-ui/draggable-snap-to.html
     https://stackoverflow.com/questions/1133770/how-to-convert-a-string-to-an-integer-in-javascript
    */
    $(".board-tile").droppable({
        accept: '.tile',
        
        drop: function(event, ui) {
            var letter = $(ui.draggable).attr('id');
            var element_id = $(this).attr('id');
            if (element_id[1] == '-'){
                var row_index = element_id[0];
            }
            else{
                var row_index = Number(element_id[1]);
                row_index += 10;
            }
            
            //console.log(row_index);

            row_obj[row_index].letter_id = letter;
            
           
            curr_score = update_score_word();
            document.getElementById('score').innerHTML = "Score: " + curr_score;
        
           
        },

        out: function(event, ui) {
            var letter = ui.draggable.attr('id');
            var drop_id = $(this).attr('id');
            var row_index = drop_id[0];
           

            if (letter == row_obj[row_index].letter_id) {
                row_obj[row_index].letter_id = "";
            } else {
                if (DEBUG) {
                    console.log('The letter ' + letter + ' was dragged across existing tiles.');
                }

                return false;
            }

            curr_score = update_score_word();
            if(row_obj[row_index].type.includes('double-word')){
                multiply_word = 1;
                curr_score /= 2;
            }
            
           
            document.getElementById('score').innerHTML = "Score: " + curr_score;
        }
    });

    $(".scrabble-rack").droppable({
        accept: '.tile',

        drop: function(event, ui) {
            
            console.log('something was dropped back into the rack');
        },

        out: function(event, ui) {
            console.log('some was dragged out of the drop zone.');
        }
    });
    
   
    $(".tile").draggable({
        snap: ".board-tile,.scrabble-rack",
        snapMode: "inner",
        revert: "invalid"
    });
    
   
}

function create_board() {
    var board = document.getElementById('scrabble-board');

    for (var i = 0; i < NUM_TILES; i++) {
        var id;
        var src_file;
        var img = document.createElement('img');

        if (i == 2 || i == 12) {
            src_file = 'Scrabble_DoubleWordScore.png';
            id = 'double-word';
        }
        else if (i == 6 || i == 8){
            src_file = 'Scrabble_DoubleLetterScore.png';
            id = 'double-letter';
        }
        else {
            src_file = 'Scrabble_Tiles/Scrabble_Tile__.jpg';
            id = 'blank';
        }

        img.id = i + '-' + id;
        img.src = src_file;
        img.className = 'board-tile';

        row_obj[i] = {
            'type': id,
            'letter_id': '',
            'img_id': img.id
        }

        board.appendChild(img);
    }
}

function create_board_tiles() {
    /* Populate the tiles in the rack by generating a random number and indexing
       the scoring values dictionary. Append that associated letter png to the rack.
    */
    for (var i = 0; i < REMAINING_LETTERS; i++) {
        var rand_index = Math.floor(Math.random() * 27);
        var letter = SCORING_VALUES[rand_index].letter;

        if (DEBUG) {
            console.log('Letter chosen: ' + letter);
        }

        $(".scrabble-rack").append('<img class="tile" id="tile-' + letter + '"src="Scrabble_Tiles/Scrabble_Tile_' + letter + '.jpg">')
    }
}



function update_score_word() {
    /* Iterate through each letter in the word, checking if that letter is a valid. If true, add that value to the total score and word.
    */
    var score = 0;
    var letter_score = 0;
    
    curr_score = 0;
    curr_word = "";
    var word = [];
    
  
    for (var i = 0; i < row_obj.length; i++) {
        
         if (row_obj[i].type.includes('blank') ||
             row_obj[i].type.includes('double-letter') ||
             row_obj[i].type.includes('double-word')){
             curr_word += "\xB7";
         }
        
        for (var j = 0; j < SCORING_VALUES.length; j++) {
            if( (row_obj[i].letter_id[5] == SCORING_VALUES[j].letter)) {
                curr_word += row_obj[i].letter_id[5];
                console.log(curr_word);
                word.push(curr_word);
                console.log(word);
                
                if (row_obj[i].type.includes('double-letter')) {
                    multiply_letter = 2;
                } else if(row_obj[i].type.includes('double-word')){
                    multiply_word = 2;
                } else if(row_obj[i].type.includes('blank')){
                    multiply_letter = 1;
                }

                letter_score = (SCORING_VALUES[j].value * multiply_letter);
                score += letter_score;
            }
            curr_word = curr_word.replace(/^\xB7+/, "");
        }
    }
    
   
    
    curr_score += score
    if (multiply_word == 1){
        curr_score *= multiply_word
    } else if  (multiply_word == 2){
        curr_score *= multiply_word
    }
    //console.log(curr_score);
    
    //console.log(word.length);
    //console.log(word);
    
    word = (word[word.length - 1])
    console.log(word);
   
    if (word == ""){
        alert('You need to play at least two letters');
        return (curr_score - letter_score);
    } else{
        var rgxDisconnectedWord = new RegExp("[A-Z_]\xB7\xB7+[A-Z_]");
        if (rgxDisconnectedWord.test(word)) {
            alert('Except for the first letter, all sub-subsequent letters must be placed directly next to or below another letter with no space');
            flag = true;
            return (curr_score - letter_score);
        }
        
    }
    
    curr_word = "";
    var curr_word_length = find_word_length();
    
    if(curr_word_length == 0){
        word = curr_word
    }
    
    for (var i = 0; i < word.length; i++){
        curr_word += word[i].replace(/\xB7/, "")
    }
    
    
    
    console.log(curr_word);
    document.getElementById('word').innerHTML = "Word: " + curr_word;
    
    
   

    if (DEBUG) {
        console.log(row_obj);
    }
    
    
    return curr_score
}

function find_word_length() {
    /* find the length of a word from letter tiles in the board. */
    var length = 0;

    for (var i = 0; i < row_obj.length; i++) {
        if (row_obj[i].letter_id != "") {
            length++;
        }
    }

    return length;
}
function shuffle_word(){
    clear_letter_id()
    $(".scrabble-rack").empty();
    document.getElementById('word').innerHTML = "Word: ";
    document.getElementById('score').innerHTML = "Score: 0";
    create_board_tiles();
    prepare_drop()
}

function update_after_submit() {
    /* Simple helper function that updates head information about last word scoring */
    var curr_word_length = find_word_length();
    multiply_word = 0;
    total_score += curr_score

    if (flag == true) {
        alert('Please double check the title!!!');
        return false;
    }
    
    if (curr_word_length < 2) {
        alert('You need to play at least two letters in order to submit a valid word for scoring! You are current at ' + curr_word_length + ' letters.');
        return false;
    }

    
    

    clear_letter_id()
    $(".scrabble-rack").empty();
    document.getElementById('word').innerHTML = "Word: ";
    document.getElementById('score').innerHTML = "Score: 0";
    document.getElementById("total-score").innerHTML = "Total Score: " + total_score;
    create_board_tiles();
    prepare_drop()
}
/*
// Checks if a string is a valid dictionary word.
function isDictionaryWord(possibleWord) {
  if (possibleWord.length > 0 && isDictionaryWord.dict[possibleWord].toLowerCase()) {
    return true;
  }

  return false;
}
// The dictionary lookup object
isDictionaryWord.dict = {};
// Do an ajax request for the dictionary file.
$.ajax({
  url: "../hw5/dictionary.txt",
  success: function(result) {
    // Get an array of all the words.
    var words = result.split("\n");

    // Add them as properties to the dictionary lookup object.
    // This will allow for fast lookups later. All words are converted to capital letters
    // to make things simple since Scrabble is case insensitive.
    for (var i = 0; i < words.length; ++i) {
      isDictionaryWord.dict[words[i]] = true;
    }
  }
});
*/
$(document).ready(function () {
    create_board()
    create_board_tiles()
    prepare_drop()

    $("#reset-word").click(function () {
        reset_word()
    });

    $("#submit-word").click(function () {
        update_after_submit()
    });
    
    $("#shuffle-word").click(function(){
        shuffle_word()
    });

});
