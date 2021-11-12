/*
File: script.js
GUI Assignment4: Creating an Interactive Dynamic Table
Vu Ho, UMass Lowell Computer Science
Copyright (c) 2021 by Vu. All rights reserved. May be freely copied or excerpted for educational purposes with credit to the author.
updated by VH on Nov 11, 2021 at 11:37 PM
 
source:
 .validate() jQuery Plugin: https://jqueryvalidation.org/
 https://jqueryvalidation.org/documentation/
*/

function create_sliders(){
    $("#min_col_slider").slider({
        range: [-100, 100],
        min: -100,
        max: 100,
        values: 0,
        slide: function(event, ui) {
            $("#min_col").val(ui.value);
            $("#submit").prop("disabled", false);
            submit_on_valid_change();
        }
    });
    
    $("#min_col").change(function () {
        var input_val = $(this).val();
        if (!isNaN(input_val) && input_val <= 100 && input_val >= -100) {
            $("#min_col_slider").slider("value", input_val);
            $("#submit").prop("disabled", false);
            submit_on_valid_change();
        }
    });
    // Maximum Column Slider
    $("#max_col_slider").slider({
        range: [-100, 100],
        min: -100,
        max: 100,
        values: 1,
        slide: function(event, ui) {
            $("#max_col").val(ui.value);
            $("#submit").prop("disabled", false);
            submit_on_valid_change();
        }
    });
    
    $("#max_col").change(function () {
        var input_val = $(this).val();

        if (!isNaN(input_val) && input_val <= 100 && input_val >= -100) {
            $("#max_col_slider").slider("value", input_val);
            $("#submit").prop("disabled", false);
            submit_on_valid_change();
        }
    });
    // Minimum Row Slider
    $("#min_row_slider").slider({
        range: [-100, 100],
        min: -100,
        max: 100,
        values: 0,
        slide: function(event, ui) {
            $("#min_row").val(ui.value);
            $("#submit").prop("disabled", false);
            submit_on_valid_change();
        }
    });
    
    $("#min_row").change(function () {
        var input_val = $(this).val();

        if (!isNaN(input_val) && input_val <= 100 && input_val >= -100) {
            $("#min_row_slider").slider("value", input_val);
            $("#submit").prop("disabled", false);
            submit_on_valid_change();
        }
    });
    // Maximum Row Slider
    $("#max_row_slider").slider({
        range: [-100, 100],
        min: -100,
        max: 100,
        values: 1,
        slide: function(event, ui) {
            $("#max_row").val(ui.value);
            $("#submit").prop("disabled", false);
            submit_on_valid_change();
        }
    });
    $("#max_row").change(function () {
        var input_val = $(this).val();

        if (!isNaN(input_val) && input_val <= 100 && input_val >= -100) {
            $("#max_row_slider").slider("value", input_val);
            $("#submit").prop("disabled", false);
            submit_on_valid_change();
        }
    });
}

function submit_on_valid_change() {
    var form_valid = $("form#myform").valid();

    if (form_valid) {
        $("form#myform").submit();
    }
    return false;
}

function validate_form() {
    $.validator.addMethod("greaterThan", function (value, element, param) {
        /* Ensure that the user entered an upper bound value that's greater than the lower bound value. */
        var $min = $(param);
        
        /* Ensure that the user cannot save table if the error occurred */
        if (this.settings.onfocusout) {
            $("#submit").prop("disabled", "disabled");
        }
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
    
    create_table();
}

//function that create table
function create_table(){
    var min_col = parseInt($('input[name=min_col]').val());
    var max_col = parseInt($('input[name=max_col]').val());
    var min_row = parseInt($('input[name=min_row]').val());
    var max_row = parseInt($('input[name=max_row]').val());

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
    $("#submit").prop("disabled", false);
    return false;
}

var numOfTabs = 1;
function create_tab() {
    var num_tabs = $("#tabs li").length + 1;
    
    if (num_tabs > 15) {
        alert("Sorry, but the tabs can not be store more than 10 tabs. Please remove at least tab to store the current table.");
        return false;
    }
    
    $("#tabs").tabs();
    
    var min_col = Number(document.getElementById('min_col').value);
    var max_col = Number(document.getElementById('max_col').value);
    var min_row = Number(document.getElementById('min_row').value);
    var max_row = Number(document.getElementById('max_row').value);
    
    numOfTabs++;

    $("div#tabs ul").append("<li class='tab'><a href='#tab-" + numOfTabs + "'>Tab #" + num_tabs + "</a>" + "<span class='ui-icon ui-icon-close' role='presentation'></span>" + "</li>");

    // create the current table
    $("div#tabs").append('<div id="tab-' + numOfTabs + '">' + $(".container").html() + '</div>');
    // refresh the tabs div to allow the new tab displays
    $("#tabs").tabs("refresh");
    // make the new active
     $("#tabs").tabs("option", "active", -1);
    
    // Remove tab
    $("#tabs").delegate("span.ui-icon-close", "click", function(){
        var panelID = $(this).closest("li").remove().attr("aria-controls");
        $("#" + panelID).remove();
    
        // refresh the tab to make the tab is removed
        try{
            $("#tabs").tabs("refresh");
        }
        catch (error){}
    
        // if tab is 0, remove the tab of table div
        if($('ul li.tab').length == 0){
            try{
                $("#tabs").tabs("destroy");
            }
            catch (error){}
            // this will go back the default
            return false;
        }
    });
}

function remove_all(){
    // get the number of all tabs
    var totalTabs = $("#tabs li").length;
    while(totalTabs > 0){
        var panelID = $("#tabs li").last().remove().attr("aria-controls");
        $("#" + panelID).remove();
        totalTabs = $("#tabs li").length;
    }
    // reset the number of tab to 1
    numOfTabs = 1;
    $("#tabs").tabs("refresh");
}

$().ready(function () {
    $("input").on("blur keup", function() {
        if($("#myform").valid()) {
            $("#submit").prop("disabled", false);
        }else{
            $("#submit").prop("disabled", "disabled");
        }
    });

    $("#tabs").tabs()

    create_sliders()

    $("#submit").on("click", function () {
        create_tab()
    });
    
    $("#removeAllTabs").on("click", function() {
        remove_all()
    });

    if (validate_form()) {
        create_table()
    }
});
