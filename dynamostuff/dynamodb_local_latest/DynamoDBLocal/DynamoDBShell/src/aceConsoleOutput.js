(function() {
  var $, number;

  $ = jQuery;

  $.extend(REPLIT, number = 0, {
    aceInConsole: function(content) {
      var editor;
      if (content !== "") {
        content = "<div class=\"aceConsoleDiv\"> <div class=\"aceConsoleButtons\"> <button data-tooltip=\"\" data-title=\"Expand code\" onclick='REPLIT.expand(" + number + ")'><i class=\"icon-plus icon-2x\" aria-label=\"plus\" role=\"img\"></i></button> <button data-tooltip=\"\" data-title=\"Collapse code\" onclick='REPLIT.collapse(" + number + ")'><i class=\"icon-minus icon-2x\" aria-label=\"minus\" role=\"img\"></i></button> <button data-tooltip=\"\" data-title=\"Replay code\" onclick='REPLIT.replay(" + number + ")'><i class=\"icon-retweet icon-2x\" aria-label=\"retweet\" role=\"img\"></i></button> <button data-tooltip=\"\" data-title=\"Replace in editor\" onclick='REPLIT.transfer(" + number + ")'><i class=\"icon-arrow-left icon-2x\" aria-label=\"arrow-left\" role=\"img\"></i></button> <button data-tooltip=\"\" data-title=\"Append to editor\" onclick='REPLIT.append(" + number + ")'><i class=\"icon-double-angle-left icon-2x\" aria-label=\"double-angle-left\" role=\"img\"></i></button> </div> <div class=\"aceConsole\" id=editor" + number + ">" + content + "</div> </div> ";
        this.OnOutputHtml(content);
        editor = ace.edit("editor" + number);
        editor.getSession().setMode("ace/mode/javascript");
        editor.setReadOnly(true);
        editor.setShowPrintMargin(false);
        editor.getSession().foldAll();
        return number++;
      }
    },
    expand: function(number) {
      var editor;
      editor = ace.edit('editor' + number);
      return editor.getSession().unfold();
    },
    collapse: function(number) {
      var editor;
      editor = ace.edit('editor' + number);
      return editor.getSession().foldAll();
    },
    replay: function(number) {
      var editor;
      editor = ace.edit('editor' + number);
      this.jqconsole.AbortPrompt();
      return this.Evaluate(editor.getSession().getValue());
    },
    transfer: function(number) {
      var editor;
      editor = ace.edit('editor' + number);
      REPLIT.editor.getSession().doc.setValue(editor.getSession().getValue());
      return REPLIT.editor.focus();
    },
    append: function(number) {
      var editor, position;
      editor = ace.edit('editor' + number);
      position = REPLIT.editor.getCursorPosition();
      REPLIT.editor.getSession().insert(position, editor.getSession().getValue());
      return REPLIT.editor.focus();
    }
  });

}).call(this);
