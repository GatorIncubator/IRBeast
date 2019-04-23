(function() {
  var $;

  $ = jQuery;

  $.extend(REPLIT, {
    numOfSteps: 0,
    initNavBar: function() {
      var $jqConsole, $navBar;
      $navBar = $("<div id=\"tutNavBar\" class=\"alert hideNavBar\">\n  <button type=\"button\" id=\"closeNav\" class=\"close\">&times;</button>\n  <div id=\"navButtons\">\n    <button data-tooltip=\"\" data-title=\"Go to the previous step\" href=\"#\" id=\"prevButton\" class =\"btn\">\n      <i class=\"icon-arrow-left color-text-grey\" aria-label=\"arrow-left\" role=\"img\"></i>\n    </button>\n    <button data-tooltip=\"\" data-title=\"Go to the next step\" href=\"#\" id=\"nextButton\" class =\"btn\">\n      <i class=\"icon-arrow-right color-text-grey\" aria-label=\"arrow-right\" role=\"img\"></i>\n    </button>\n    <button data-tooltip=\"\" data-title=\"Tutorial help\" class='right-buttons' id=\"tutorialHelp\">\n      <i class=\"icon-question\" aria-label=\"question\" role=\"img\"></i>\n    </button>\n    <button data-tooltip=\"\" data-title=\"Table of contents\" class='right-buttons' id=\"tableOfContentsButton\">\n      <i class=\"icon-list\" aria-label=\"list\" role=\"img\"></i>\n    </button>\n  </div>\n</div>");
      $navBar.find("#tableOfContentsButton").click((function(_this) {
        return function(e) {
          return REPLIT.jsrepl["eval"]('tutorial.steps()');
        };
      })(this));
      $navBar.find("#nextButton").click((function(_this) {
        return function(e) {
          return REPLIT.jsrepl["eval"]('tutorial.next()');
        };
      })(this));
      $navBar.find("#prevButton").click((function(_this) {
        return function(e) {
          return REPLIT.jsrepl["eval"]('tutorial.prev()');
        };
      })(this));
      $navBar.find("#tutorialHelp").click((function(_this) {
        return function(e) {
          return REPLIT.jsrepl["eval"]('tutorial.help()');
        };
      })(this));
      $navBar.find("#closeNav").click((function(_this) {
        return function(e) {
          return REPLIT.closeNav();
        };
      })(this));
      $jqConsole = $('.jqconsole');
      return $jqConsole.parent().append($navBar);
    },
    closeNav: function() {
      $('#tutNavBar').css({
        "display": "none"
      });
      return $(".jqconsole").css({
        "min-height": "100%"
      });
    },
    openNav: function() {
      this.navCounter = 0;
      $(".jqconsole").css({
        "min-height": "90%"
      });
      return $('#tutNavBar').css({
        "display": "block"
      });
    }
  });

}).call(this);
