/*
File: script.js
GUI Assignment5: Implementing a Bit of Scrabble with Drag-and-Drop
Vu Ho, UMass Lowell Computer Science
Copyright (c) 2021 by Vu. All rights reserved. May be freely copied or excerpted for educational purposes with credit to the author.
updated by VH on Dec 15, 2021 at 11:34 PM
 
source:
 .validate() jQuery Plugin: https://jqueryvalidation.org/
 https://jqueryvalidation.org/documentation/
*/

function Board(){
    var table = ""; // initialized table variable
    $("#scrabbleBoard").html(table);
    table += '<table id="singleLine">';
    
    table += '<td class="regular"></td>';
    table += '<td class="regular"></td>';
    table += '<tr><td class="wDouble regular">DOUBLE<br>WORD<br>SCORE</td>';
    table += '<td class="regular"></td>';
    table += '<td class="regular"></td>';
    table += '<td class="regular"></td>';
    table += '<td class="lDouble regular">DOUBLE<br>LETTER<br>SCORE</td>';
    table += '<td class="regular"></td>';
    table += '<td class="lDouble regular">DOUBLE<br>LETTER<br>SCORE</td>';
    table += '<td class="regular"></td>';
    table += '<td class="regular"></td>';
    table += '<td class="regular"></td>';
    table += '<tr><td class="wDouble regular">DOUBLE<br>WORD<br>SCORE</td>';
    table += '<td class="regular"></td>';
    table += '<td class="regular"></td>';
  
    table += '</table>';
    $("#scrabbleBoard").html(table);
    table= "";
  
}
