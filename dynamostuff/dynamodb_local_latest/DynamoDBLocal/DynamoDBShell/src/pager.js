(function() {
  var $, ALLOWED_IN_MODAL, ANIMATION_DURATION, FIRST_LOAD, KEY_ESCAPE, PAGES,
    __indexOf = [].indexOf || function(item) { for (var i = 0, l = this.length; i < l; i++) { if (i in this && this[i] === item) return i; } return -1; };

  $ = jQuery;

  ANIMATION_DURATION = 300;

  KEY_ESCAPE = 27;

  FIRST_LOAD = true;

  PAGES = {
    workspace: {
      id: 'content-workspace',
      min_width: 500,
      width: 1000,
      max_width: 3000,
      path: '/'
    },
    languages: {
      id: 'content-languages',
      min_width: 1080,
      width: 1080,
      max_width: 1400,
      path: '/languages'
    },
    examples: {
      id: 'content-examples',
      min_width: 1000,
      width: 1000,
      max_width: 1400,
      path: '/examples'
    },
    help: {
      id: 'content-help',
      min_width: 1000,
      width: 1000,
      max_width: 1400,
      path: '/help'
    },
    about: {
      id: 'content-about',
      min_width: 600,
      max_width: 600,
      width: 600,
      path: '/about'
    },
    DEFAULT: 'workspace'
  };

  ALLOWED_IN_MODAL = ['help', 'about', 'languages'];

  $.extend(REPLIT, {
    PAGES: PAGES,
    modal: false,
    Modal: function(modal) {
      this.modal = modal;
    },
    LoadExamples: function(file, container, callback) {
      var $example_element_header, $examples_container, api, code, counter, editor, example_element, i, links, name, sdk, total, _i, _len, _ref, _results;
      total = this.exampleContent.length;
      counter = 0;
      $examples_container = $('#examples-' + container);
      $('.example-group').remove();
      _ref = this.exampleContent;
      _results = [];
      for (_i = 0, _len = _ref.length; _i < _len; _i++) {
        i = _ref[_i];
        name = i["name"];
        code = i["code"];
        sdk = i["sdkLink"];
        api = i["apiLink"];
        links = "";
        if (sdk !== "") {
          links += " <a target='_blank' href=\"" + sdk + "\">SDK Docs</a>";
        }
        if (api !== "") {
          links += " <a target='_blank' href=\"" + api + "\">API Docs</a>";
        }
        example_element = $("<div class=\"example-group example-" + total + "\">\n  <div class=\"example-group-header\"><span class=\"example-title\">" + name + "</span></div>\n  <div class=\"exampleEditorContainer hideCode\">\n    <button onclick='REPLIT.ReplaceExample(" + counter + ")'><i class=\"icon-arrow-left icon-2x\" aria-label=\"arrow-left\" role=\"img\"></i></button>\n    <button onclick='REPLIT.AppendExample(" + counter + ")'><i class=\"icon-double-angle-left icon-2x\" aria-label=\"double-angle-left\" role=\"img\"></i></button>\n    " + links + "\n    <div class=\"exampleEditor\" id=\"example-editor-" + counter + "\">" + code + "</div>\n  </div>\n</div>");
        $examples_container.append(example_element);
        $example_element_header = example_element.find(".example-group-header");
        $example_element_header.click(function() {
          return $(this).parent().find(".exampleEditorContainer").toggle();
        });
        editor = ace.edit("example-editor-" + counter);
        editor.getSession().setMode("ace/mode/javascript");
        editor.setReadOnly(true);
        editor.setShowPrintMargin(false);
        _results.push(counter++);
      }
      return _results;
    },
    ResetExamples: function() {
      var $ex, ex, examples, _i, _len, _results;
      examples = $('.example-group');
      _results = [];
      for (_i = 0, _len = examples.length; _i < _len; _i++) {
        ex = examples[_i];
        $ex = $(ex);
        _results.push($ex.find(".exampleEditorContainer").css({
          "display": "none"
        }));
      }
      return _results;
    },
    page_stack: [],
    changing_page: false,
    OpenPage: function(page_name, callback) {
      var current_page, done, index, lang_name, new_title, outerWidth, page;
      if (callback == null) {
        callback = $.noop;
      }
      if (page_name === "examples") {
        this.ResetExamples();
      }
      if (this.modal && __indexOf.call(ALLOWED_IN_MODAL, page_name) < 0) {
        return;
      }
      page = PAGES[page_name];
      current_page = this.page_stack[this.page_stack.length - 1];
      if (!page || current_page === page_name) {
        this.changing_page = false;
        if (current_page !== 'workspace') {
          return this.OpenPage('workspace');
        }
      } else if (this.changing_page) {
        $('.page').stop(true, true);
        this.$container.stop(true, true);
        this.changing_page = false;
        return this.OpenPage(page_name);
      } else {
        this.changing_page = true;
        lang_name = this.current_lang_name ? this.Languages[this.current_lang_name.toLowerCase()].name : '';
        if (page_name !== 'workspace') {
          new_title = page.$elem.find('.content-title').hide().text();
          REPLIT.changeTitle(new_title);
        } else {
          REPLIT.changeTitle(this.Languages[REPLIT.current_lang.name.toLowerCase()].name);
        }
        this.min_content_width = this.ISMOBILE ? document.documentElement.clientWidth - 2 * this.RESIZER_WIDTH : page.min_width;
        this.max_content_width = page.max_width;
        if (FIRST_LOAD && page_name === 'workspace') {
          FIRST_LOAD = false;
          page.width = document.documentElement.clientWidth - this.DEFAULT_CONTENT_PADDING;
        }
        this.content_padding = document.documentElement.clientWidth - page.width;
        index = this.page_stack.indexOf(page_name);
        if (index > -1) {
          this.page_stack.splice(index, 1);
        }
        this.page_stack.push(page_name);
        outerWidth = page.width;
        if (page_name !== 'workspace') {
          outerWidth += 2 * this.RESIZER_WIDTH;
        }
        done = (function(_this) {
          return function() {
            _this.changing_page = false;
            page.$elem.focus();
            return callback();
          };
        })(this);
        if (current_page) {
          PAGES[current_page].width = $('.page:visible').width();
          if (current_page === 'workspace') {
            PAGES[current_page].width += 2 * this.RESIZER_WIDTH;
          }
          return PAGES[current_page].$elem.fadeOut(ANIMATION_DURATION, (function(_this) {
            return function() {
              return _this.$container.animate({
                width: outerWidth
              }, ANIMATION_DURATION, function() {
                page.$elem.css({
                  width: page.width,
                  display: 'block',
                  opacity: 0
                });
                _this.OnResize();
                return page.$elem.animate({
                  opacity: 1
                }, ANIMATION_DURATION, done);
              });
            };
          })(this));
        } else {
          this.$container.css({
            width: outerWidth
          });
          page.$elem.css({
            width: page.width,
            display: 'block'
          });
          this.OnResize();
          return done();
        }
      }
    },
    CloseLastPage: function() {
      var closed_page;
      if (this.changing_page) {

      } else {
        closed_page = this.page_stack[this.page_stack.length - 1];
        return this.page_stack.splice(this.page_stack.indexOf(closed_page), 1);
      }
    },
    ReplaceExample: function(number) {
      var editor;
      editor = ace.edit('example-editor-' + number);
      REPLIT.editor.getSession().doc.setValue(editor.getSession().getValue());
      return REPLIT.OpenPage('workspace', function() {
        return REPLIT.editor.focus();
      });
    },
    AppendExample: function(number) {
      var editor, position;
      editor = ace.edit('example-editor-' + number);
      position = REPLIT.editor.getCursorPosition();
      REPLIT.editor.getSession().insert(position, editor.getSession().getValue());
      return REPLIT.OpenPage('workspace', function() {
        return REPLIT.editor.focus();
      });
    }
  });

  $(function() {
    var $body, name, settings;
    REPLIT.$this.bind('language_loading', function(_, system_name) {
      var examples;
      examples = REPLIT.Languages[system_name.toLowerCase()].examples;
      if (!REPLIT.ISMOBILE) {
        return REPLIT.LoadExamples(examples.editor, 'editor');
      }
    });
    for (name in PAGES) {
      settings = PAGES[name];
      settings.$elem = $("#" + settings.id);
      if (REPLIT.ISMOBILE && name !== 'workspace') {
        settings.width = 0;
      }
    }
    $body = $('body');
    return $body.delegate('.page-close', 'click', function() {
      return REPLIT.CloseLastPage();
    });
  });

}).call(this);
