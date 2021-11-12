/*
File: script.js
GUI Assignment4: Creating an Interactive Dynamic Table with jquery
Vu Ho, UMass Lowell Computer Science
Copyright (c) 2021 by Vu. All rights reserved. May be freely copied or excerpted for educational purposes with credit to the author.
updated by VH on Nov 11, 2021 at 11:34 PM
 
 source:
 .validate() jQuery Plugin: https://jqueryvalidation.org/
*/



function validate_form() {
    $.validator.addMethod("greaterThan", function (value, element, param) {
        /* Ensure that the user entered an upper bound value that's greater than the lower bound value. */
        var $min = $(param);
        return parseInt(value) > parseInt($min.val());
    }, "Upper bound must be greater than lower bound");
        
    $('#myform').validate({
        rules: {
          /* Ensure the form input values are correctly inputted */
          min_row: {
            required: true,
            number : true,
            min: -100,
            max: 100,
          },
          max_row: {
            required: true,
            number: true,
            min: -100,
            max: 100,
            greaterThan: "#min_row",
          },
          min_col: {
            required: true,
            number: true,
            min: -100,
            max: 100,
          },
          max_col: {
            required: true,
            number: true,
            greaterThan: "#min_col",
            min: -100,
            max: 100,
          }
        },
        
        /* Output a relevant message based on the type of incorrect field entry. */
        messages: {
          min_row: {
            required: "THIS IS A REQUIRED FIELD!",
            number: "YOUR INPUT IS INVALID.",
            min: "<br/>THE INPUT IS TOO SMALL.<br/>VALID INPUT IS BETWEEN -100 TO 100.",
            max: "<br/>THE INPUT IS TOO LARGE.<br/>VALID INPUT IS BETWEEN -100 TO 100.",
          },
          max_row: {
            required: "THIS IS A REQUIRED FIELD!",
            number: "YOUR INPUT IS INVALID.",
            min: "<br/>THE INPUT IS TOO SMALL.<br/>VALID INPUT IS BETWEEN -100 TO 100.",
            max: "<br/>THE INPUT IS TOO LARGE.<br/>VALID INPUT IS BETWEEN -100 TO 100.",

          },
          min_col: {
            required: "THIS IS A REQUIRED FIELD!",
            number: "YOUR INPUT IS INVALID.",
            min: "<br/>THE INPUT IS TOO SMALL.<br/>VALID INPUT IS BETWEEN -100 TO 100.",
            max: "<br/>THE INPUT IS TOO LARGE.<br/>VALID INPUT IS BETWEEN -100 TO 100.",
          },
          max_col: {
            required: "THIS IS A REQUIRED FIELD!",
            number: "YOUR INPUT IS INVALID.",
            min: "<br/>THE INPUT IS TOO SMALL.<br/>VALID INPUT IS BETWEEN -100 TO 100.",
            max: "<br/>THE INPUT IS TOO LARGE.<br/>VALID INPUT IS BETWEEN -100 TO 100.",
          }
        },
        
        invalidHandler: function(form) {
            $("#my_table").empty();
            $("#error").empty();
        },

        submitHandler: function (form) {
            create_table()
            return false
        }
    }); // end of form validation
}

$().ready(function () {
    validate_form()
});

var min_col, max_col, min_row, max_row
//function that create table
function create_table(){
    min_col = parseInt($('input[name=min_col]').val());
    max_col = parseInt($('input[name=max_col]').val());
    min_row = parseInt($('input[name=min_row]').val());
    max_row = parseInt($('input[name=max_row]').val());

    /*
     talbe format:
     <tr>
        <td> ... </td>
        .....
        <td> ... </td>
     </tr>
     */
    
    var output = ""
    output += "<table id = 'my_table'>"
        
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
    }
    output += "</table>";
    $("#my_table").html(output);// Outputing the table
    return false;
    
}
