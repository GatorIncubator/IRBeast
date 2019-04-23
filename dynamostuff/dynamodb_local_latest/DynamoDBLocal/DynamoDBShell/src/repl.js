(function() {
  var $;

  $ = jQuery;

  $.extend(REPLIT, {
    Init: function() {
      this.jsrepl = new JSREPL({
        input: $.proxy(this.InputCallback, this),
        output: $.proxy(this.OutputCallback, this),
        result: $.proxy(this.ResultCallback, this),
        error: $.proxy(this.ErrorCallback, this),
        progress: $.proxy(this.OnProgress, this),
        outputHtml: $.proxy(this.OnOutputHtml, this),
        tutResult: $.proxy(this.OnTutResult, this),
        aceInjection: $.proxy(this.OnAceInjection, this),
        printJson: $.proxy(this.OnPrintJson, this),
        printWire: $.proxy(this.OnPrintWire, this),
        startNav: $.proxy(this.OnStartNav, this),
        timeout: {
          time: 12000,
          callback: (function(_this) {
            return function() {
              var a, code;
              if (a = confirm('The program is taking too long to finish. Do you want to stop it?')) {
                code = _this.editor.getSession().getValue();
                _this.LoadLanguage(_this.current_lang.system_name, function() {
                  return _this.editor.getSession().setValue(code);
                });
              }
              return a;
            };
          })(this)
        }
      });
      this.jqconsole = this.$consoleContainer.jqconsole('', '   ', '.. ');
      this.$console = this.$consoleContainer.find('.jqconsole');
      this.$editor = this.$editorContainer.find('#editor-widget');
      if (!this.ISMOBILE) {
        this.editor = ace.edit('editor-widget');
        this.editor.setTheme('ace/theme/textmate');
        this.editor.setShowPrintMargin(false);
        this.editor.renderer.setHScrollBarAlwaysVisible(false);
        ace.config.loadModule('ace/ext/language_tools', function() {
          var config, snippetManager;
          REPLIT.editor.setOptions({
            enableBasicAutocompletion: true,
            enableSnippets: true
          });
          snippetManager = ace.require("ace/snippets").snippetManager;
          config = ace.require("ace/config");
          return ace.config.loadModule("ace/snippets/javascript", function(m) {
            if (m) {
              snippetManager.files.javascript = m;
              m.snippets = snippetManager.parseSnippetFile(m.snippetText);
              m.snippets = REPLIT.setSnippets(m);
              return snippetManager.register(m.snippets, m.scope);
            }
          });
        });
        this.$run.click((function(_this) {
          return function() {
            var history;
            if (_this.jqconsole.state === 2) {
              _this.jqconsole.AbortPrompt();
              _this.Evaluate(REPLIT.editor.getSession().getValue());
              history = _this.jqconsole.GetHistory();
              history.push(REPLIT.editor.getSession().getValue());
              _this.jqconsole.SetHistory(history);
              return REPLIT.aceInConsole(REPLIT.editor.getSession().getValue());
            }
          };
        })(this));
        this.$switch.click((function(_this) {
          return function() {
            var position;
            position = REPLIT.editor.getCursorPosition();
            REPLIT.editor.getSession().insert(position, _this.jqconsole.GetPromptText());
            _this.jqconsole.ClearPromptText();
            return REPLIT.editor.focus();
          };
        })(this));
        this.$loadButton.on('change', (function(_this) {
          return function(e) {
            var file, input;
            file = e.originalEvent.srcElement.files[0];
            _this.putInAce(file);
            input = $('#button-load');
            input.replaceWith(input = input.clone(true));
            return $('#exitSave').click();
          };
        })(this));
        this.$saveButton.click((function(_this) {
          return function() {
            var blob, content, date;
            content = REPLIT.editor.getSession().getValue();
            if (!content) {
              return;
            }
            blob = new Blob([content], {
              type: 'text/plain'
            });
            date = new Date();
            saveAs(blob, 'session(' + date.getTime() + ").txt");
            return $('#exitSave').click();
          };
        })(this));
        this.$saveOptions.click((function(_this) {
          return function() {
            var $invalidOptionsAlert, accessKey, regex;
            regex = new RegExp('^[a-zA-Z1-9]+$');
            accessKey = _this.$accessKeyInput.val();
            if (regex.test(accessKey)) {
              _this.jsrepl.setUserName(accessKey);
              $('#exitOptions').click();
            } else {
              $invalidOptionsAlert = $("<div class=\"alert alert-error alert-icon\" role=\"alert\">\n  <a class=\"close\" data-dismiss=\"alert\" href=\"#\">×</a>\n  <h3>Invalid!</h3>\n  <p>The access key you put in '<strong>" + accessKey + "</strong>' is invalid. Please put in a single alpha numeric word without any spaces</p>\n</div>");
            }
            return _this.$optionsBody.prepend($invalidOptionsAlert);
          };
        })(this));
        this.$editorContainer.on('dragover', (function(_this) {
          return function(e) {
            return _this.stopEvent(e);
          };
        })(this));
        this.$editorContainer.on('drop', (function(_this) {
          return function(e) {
            _this.stopEvent(e);
            return _this.putInAce(e.originalEvent.dataTransfer.files[0]);
          };
        })(this));
        this.editor.commands.addCommand({
          name: 'run',
          bindKey: {
            win: 'Ctrl-Return',
            mac: 'Command-Return',
            sebder: 'editor'
          },
          exec: (function(_this) {
            return function() {
              _this.$run.click();
              return setTimeout((function() {
                return _this.editor.focus();
              }), 0);
            };
          })(this)
        });
        this.editor.commands.addCommand({
          name: 'save',
          bindKey: {
            win: 'Ctrl-S',
            mac: 'Command-S',
            sebder: 'editor'
          },
          exec: (function(_this) {
            return function() {
              return _this.$saveButton.click();
            };
          })(this)
        });
      }
      this.current_lang = null;
      this.current_lang_name = null;
      return this.inited = true;
    },
    stopEvent: function(e) {
      e.preventDefault();
      return e.stopPropagation();
    },
    putInAce: function(file) {
      var reader;
      reader = new FileReader();
      reader.onload = function(file) {
        var text;
        text = file.target.result;
        return REPLIT.editor.getSession().setValue(text);
      };
      return reader.readAsText(file);
    },
    LoadLanguage: function(lang_name, callback) {
      var EditSession, UndoManager, ace_mode, ace_mode_ajax, close, index, open, session, textMode, _i, _len, _ref, _ref1;
      if (callback == null) {
        callback = $.noop;
      }
      this.$this.trigger('language_loading', [lang_name]);
      this.current_lang = this.jsrepl.getLangConfig(lang_name.toLowerCase());
      this.current_lang.system_name = lang_name;
      if (!this.ISMOBILE) {
        EditSession = ace.require("ace/edit_session").EditSession;
        UndoManager = ace.require("ace/undomanager").UndoManager;
        session = new EditSession('');
        session.setUndoManager(new UndoManager);
        ace_mode = this.Languages[lang_name.toLowerCase()].ace_mode;
        if (ace_mode != null) {
          ace_mode_ajax = $.getScript(ace_mode.script, (function(_this) {
            return function() {
              var mode;
              mode = ace.require(ace_mode.module).Mode;
              session.setMode(new mode);
              session.setUseWrapMode(true);
              _this.editor.setSession(session);
              return callback();
            };
          })(this));
        } else {
          ace_mode_ajax = jQuery.Deferred().resolve();
          textMode = ace.require("ace/mode/text").Mode;
          session.setMode(new textMode);
          this.editor.setSession(session);
        }
      }
      this.jqconsole.Reset();
      _ref = this.current_lang.matchings;
      for (index = _i = 0, _len = _ref.length; _i < _len; index = ++_i) {
        _ref1 = _ref[index], open = _ref1[0], close = _ref1[1];
        this.jqconsole.RegisterMatching(open, close, 'matching-' + index);
      }
      this.jqconsole.RegisterShortcut('Z', (function(_this) {
        return function() {
          _this.jqconsole.AbortPrompt();
          return _this.StartPrompt();
        };
      })(this));
      this.jqconsole.RegisterShortcut('G', (function(_this) {
        return function() {
          return _this.OpenPage('examples');
        };
      })(this));
      this.jqconsole.RegisterShortcut('H', (function(_this) {
        return function() {
          return _this.OpenPage('help');
        };
      })(this));
      this.jqconsole.RegisterShortcut('S', (function(_this) {
        return function() {
          return _this.$saveButton.click();
        };
      })(this));
      this.jqconsole.RegisterShortcut('A', (function(_this) {
        return function() {
          return _this.jqconsole.MoveToStart();
        };
      })(this));
      this.jqconsole.RegisterShortcut('E', (function(_this) {
        return function() {
          return _this.jqconsole.MoveToEnd();
        };
      })(this));
      this.jqconsole.RegisterShortcut('K', (function(_this) {
        return function() {
          return _this.jqconsole.Clear();
        };
      })(this));
      return this.jsrepl.loadLanguage(lang_name.toLowerCase(), (function(_this) {
        return function() {
          return $.when(ace_mode_ajax).then(function() {
            _this.StartPrompt();
            _this.jqconsole.Write(_this.Languages[lang_name.toLowerCase()].header + '\n', "", "");
            _this.$this.trigger('language_loaded', [lang_name]);
            return callback();
          });
        };
      })(this));
    },
    ResultCallback: function(result) {
      if (result) {
        if (result === '[Object]') {
          result = '';
        }
        if (result[-1] !== '\n') {
          result = result + '\n';
        }
        this.jqconsole.Write('=> ' + result, 'result');
      }
      this.StartPrompt();
      return this.$this.trigger('result', [result]);
    },
    ErrorCallback: function(error) {
      if (typeof error === 'object') {
        error = error.message;
      }
      if (error[-1] !== '\n') {
        error = error + '\n';
      }
      this.jqconsole.Write(String(error), 'error');
      this.StartPrompt();
      return this.$this.trigger('error', [error]);
    },
    OutputCallback: function(output, cls) {
      if (output) {
        this.jqconsole.Write(output, cls, "");
        this.$this.trigger('output', [output]);
        return void 0;
      }
    },
    InputCallback: function(callback) {
      this.jqconsole.Input((function(_this) {
        return function(result) {
          var e;
          try {
            callback(result);
            return _this.$this.trigger('input', [result]);
          } catch (_error) {
            e = _error;
            return _this.ErrorCallback(e);
          }
        };
      })(this));
      this.$this.trigger('input_request', [callback]);
      return void 0;
    },
    OnAceInjection: function(content) {
      if (content) {
        this.editor.setValue(content);
        return void 0;
      }
    },
    OnOutputHtml: function(content) {
      if (content) {
        content += "</br>";
        this.jqconsole.Write(content, "", "");
        this.$this.trigger('output', [content]);
        return void 0;
      }
    },
    OnTutResult: function(content) {
      if (content) {
        this.$this.trigger('output', [content]);
        return void 0;
      }
      return this.$this.trigger('output', [content]);
    },
    Evaluate: function(command) {
      if (command) {
        this.jsrepl["eval"](command);
        return this.$this.trigger('eval', [command]);
      } else {
        return this.StartPrompt();
      }
    },
    OnPrintJson: function(content) {
      var $html;
      $html = jsonPrettyPrint(content, false);
      this.jqconsole.Write($html[0], "", "");
      return this.$this.trigger('output', [html]);
    },
    OnPrintWire: function(content) {
      var $html;
      $html = jsonPrettyPrint(content, true);
      this.jqconsole.Write($html[0], "", "");
      return this.$this.trigger('output', [html]);
    },
    OnStartNav: function(numberOfLessons) {
      REPLIT.openNav();
      return REPLIT.numOfSteps = numberOfLessons;
    },
    StartPrompt: function() {
      return this.jqconsole.Prompt(true, $.proxy(this.Evaluate, this), this.jsrepl.checkLineEnd, true);
    }
  });

  $(function() {
    return REPLIT.Init();
  });

}).call(this);
