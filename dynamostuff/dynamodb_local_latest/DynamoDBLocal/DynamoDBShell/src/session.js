(function() {
  var $, SHARE_TEMPLATE, WAIT_BETWEEN_SAVES, reset_state;

  $ = jQuery;

  WAIT_BETWEEN_SAVES = 2000;

  SHARE_TEMPLATE = {
    twitter: function() {
      var related, text, uri, url;
      text = 'Check out my REPL session - ';
      related = 'replit';
      url = window.location.href;
      uri = $.param({
        text: text,
        url: url,
        related: related
      });
      return "<a href=\"https://twitter.com/share?" + uri + "\" target=\"_blank\"></a>";
    },
    facebook: function() {
      return "<a href=\"javascript:var d=document,f='http://www.facebook.com/share',l=d.location,e=encodeURIComponent,p='.php?src=bm&v=4&i=1315186262&u='+e(l.href)+'&t='+e(d.title);1;try{if (!/^(.*\.)?facebook\.[^.]*$/.test(l.host))throw(0);share_internal_bookmarklet(p)}catch(z) {a=function() {if (!window.open(f+'r'+p,'sharer','toolbar=0,status=0,resizable=1,width=626,height=436'))l.href=f+p};if (/Firefox/.test(navigator.userAgent))setTimeout(a,0);else{a()}}void(0)\"></a>";
    },
    gplus: function() {
      var text;
      text = 'Check out my REPL session - ' + window.location.href;
      text = encodeURI(text);
      return "<a href=\"https://m.google.com/app/plus/x/bggo8s9j8yqo/?v=compose&content=" + text + "&login=1&pli=1&hideloc=1\" target=\"_blank\"></a>";
    }
  };

  $.extend(REPLIT, {
    session: {
      eval_history: []
    }
  });

  reset_state = function(e, lang_name) {
    localStorage.setItem('lang_name', lang_name);
    $('#replay-button').hide();
    this.session = {};
    this.session.eval_history = [];
    return Router.change_base('/');
  };

  $(function() {
    var lang_name;
    if (typeof REPLIT_DATA !== "undefined" && REPLIT_DATA !== null) {
      REPLIT.current_lang_name = REPLIT_DATA.language;
      REPLIT.LoadLanguage(REPLIT_DATA.language, function() {
        if (!REPLIT.ISMOBILE) {
          REPLIT.editor.getSession().setValue(REPLIT_DATA.editor_text);
        }
        REPLIT.session.id = REPLIT_DATA.session_id;
        REPLIT.session.rid = REPLIT_DATA.revision_id;
        REPLIT.session.saved_eval_history = REPLIT_DATA.eval_history;
        $('#replay-button').show();
        delete window['REPLIT_DATA'];
        return REPLIT.$this.bind('language_loaded', reset_state);
      });
    } else if (!REPLIT.url_language) {
      REPLIT.$this.bind('language_loaded', reset_state);
      lang_name = localStorage.getItem('lang_name');
      if (lang_name != null) {
        REPLIT.loading_saved_lang = true;
        REPLIT.current_lang_name = lang_name;
        $(function() {});
      } else {
        $('#languages-back').bind('click.language_modal', function(e) {
          e.stopImmediatePropagation();
          return false;
        });
        $('#content-languages .language-group li').bind('click.language_modal', function(e) {
          return REPLIT.Modal(false);
        });
        REPLIT.$this.bind('language_loaded.language_modal', function(e) {
          return $('#languages-back').unbind('click.language_modal');
        });
        Router.navigate('/languages');
        REPLIT.Modal(true);
      }
    }
    return $('#replay-button').click(function(e) {
      var handler, history, index, input_lock, input_unlock, locked, locked_queue;
      history = REPLIT.session.saved_eval_history;
      locked = false;
      locked_queue = [];
      index = -1;
      handler = function() {
        var _multiline;
        if (!locked) {
          index++;
          if (history[index] != null) {
            REPLIT.jqconsole.SetPromptText(history[index]);
            _multiline = REPLIT.jqconsole.multiline_callback;
            REPLIT.jqconsole.multiline_callback = void 0;
            REPLIT.jqconsole._HandleEnter();
            return REPLIT.jqconsole.multiline_callback = _multiline;
          } else {
            REPLIT.$this.unbind('result', handler);
            REPLIT.$this.unbind('error', handler);
            return delete REPLIT.session['saved_eval_history'];
          }
        } else {
          return locked_queue.push(handler);
        }
      };
      input_lock = function() {
        return locked = true;
      };
      input_unlock = function() {
        var fn;
        locked = false;
        fn = locked_queue.shift();
        if (fn != null) {
          return setTimeout(fn, 100);
        }
      };
      REPLIT.$this.bind('result', handler);
      REPLIT.$this.bind('error', handler);
      REPLIT.$this.bind('input', input_unlock);
      REPLIT.$this.bind('input_request', input_lock);
      handler();
      return $(this).hide();
    });
  });

}).call(this);
