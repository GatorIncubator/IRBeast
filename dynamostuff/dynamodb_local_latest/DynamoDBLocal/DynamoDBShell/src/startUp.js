/**
 * Created by goldwate on 2/25/14.
 */

$(document).ready(function () {
    REPLIT.LoadLanguage("JavaScript");
    REPLIT.OpenPage('workspace');
    REPLIT.initNavBar();

});

$(document).on('mousedown mouseup click dblclick keydown keypress keyup', '.ppOutput', function(e){
    e.preventDefault();
    REPLIT.jqconsole.Disable();
});

$(document).on('mousedown mouseup click dblclick keydown keypress keyup', '.aceConsoleDiv', function(e){
    e.preventDefault();
    REPLIT.jqconsole.Disable();
});

$(document).on('mousedown mouseup click dblclick keydown keypress keyup', '.tutorial', function(e){
    e.preventDefault();
    REPLIT.jqconsole.Disable();
});

$(document).on('mousedown mouseup click dblclick keydown keypress keyup', 'div.jqconsole', function(e){
    e.preventDefault();
    REPLIT.jqconsole.Disable();
});

$(document).on('select mousedown mouseup dblclick focus','.jqconsole', function(e){
    if (e.target.className === "ppOutput" || e.target.className === "aceConsoleDiv" || e.target.className === "tutorial") {
        return;
    }
    REPLIT.jqconsole.Enable();
});

$(document).keydown(function(e){
   if(e.keyCode == 27){
       REPLIT.OpenPage('workspace');
   }
});

