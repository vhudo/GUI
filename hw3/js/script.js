/*
File: script.js
GUI Assignment3: Creating an Interactive Dynamic Table
Vu Ho, UMass Lowell Computer Science
Copyright (c) 2021 by Vu. All rights reserved. May be freely copied or excerpted for educational purposes with credit to the author.
updated by VH on Oct 26, 2021 at 6:07 PM
*/

var  min_col, max_col, min_row, max_row

var min_num = -100 // the minimum of number which can handle
var max_num = 100 // the maximun of number which can handle

//general purpose function to validate input and return boolean
function validateInput(min_col, max_col, min_row, max_row){
    if (min_col == "" || max_col == "" || min_row == "" || max_row == ""){
        document.getElementById("error").innerHTML = "<h3> One of boxes is empty.<br>Please try again!";
        return false;
    }
    else if (min_row < min_num || max_row > max_num || min_col < min_num || max_col > max_num){
        document.getElementById("error").innerHTML = "<h3> Numbers shoule be smaller.<br>Please try again!</h3>";
        return false;
    }
    else if(min_row % 1 != 0 || max_row % 1 != 0 || min_col % 1 != 0 || max_col % 1 != 0 ){
            document.getElementById("error").innerHTML = "<h3> Number MUST be a integer.<br>Please try again!</h3>";
            return false;
        }
    else if(Number(min_row) > Number(max_row) || Number(min_col) > Number(max_col)){
            document.getElementById("error").innerHTML = "<h3>Upper bound MUST be greater than Lower bound..<br>Please try again!</h3>";
            return false;
        }
    else{
        return true;
    }
}

//function that create table
function createTable(){
    // Get value of the element that has an id of minCol
    min_col = document.getElementById("minCol").value;
    // Get value of the element that has an id of maxCol
    max_col = document.getElementById("maxCol").value;
    // Get value of the element that has an id of minRow
    min_row = document.getElementById("minRow").value;
    // Get value of the element that has an id of maxRow
    max_row = document.getElementById("maxRow").value;
    
    /*
     talbe format:
     <tr>
        <td> ... </td>
        .....
        <td> ... </td>
     </tr>
     */
    
    var output = ""
    output += "<table id = 'myTable' />"
    if (validateInput(min_col, max_col, min_row, max_row)){
        
        // convert to integer
        min_col = Number(min_col)
        max_col = Number(max_col)
        min_row = Number(min_row)
        max_row = Number(max_row)
        
        for (var row = 0; row <= (max_row - min_row + 1); row++){
            output += "<tr>";
            for (var col = 0; col <= (max_col - min_col + 1); col++){
                if (row == 0){
                    //get the top row
                    if (col == 0){
                        output += "<td class = 'top_row'" + "" + "</td>";
                    }
                    else {
                        output += "<td class = 'top_row'>" + (col + min_col - 1) + "</td>";
                    }
                }
                //get the first column
                else if ( col == 0){
                    output += "<td class = 'first_col'>" + (row + min_row - 1) + "</td>";
                }
                //get the value of others
                else {
                    output += "<td class = 'child_table'>" + (row + min_row -1) * (col + min_col - 1) + "</td>";
                }
            }
            output += "</tr>";
            document.getElementById('myTable').innerHTML = output;
        }
        
        //reset error
        document.getElementById("error").innerHTML = "";
        
    }
    else {
        //reset table
        document.getElementById("myTable").innerHTML = "";
        
        //clear input field
        document.getElementById("minCol").value = "";
        document.getElementById("maxCol").value = "";
        document.getElementById("minRow").value = "";
        document.getElementById("maxRow").value = "";
    }
    
}
