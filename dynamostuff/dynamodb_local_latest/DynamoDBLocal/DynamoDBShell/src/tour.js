(function() {
  var $;

  $ = jQuery;

  $.extend(REPLIT, {
    tour: function() {
      return hopscotch.startTour(this.tourContents);
    },
    tourContents: {
      id: "ShellTour",
      steps: [
        {
          target: "title",
          title: "Welcome to the DynamoDB JavaScript Shell!",
          content: "Hey there! This is a tour to go over all of the features within the shell.",
          placement: "bottom",
          arrowOffset: 60,
          xOffset: 20
        }, {
          target: "editor-widget",
          title: "Editor",
          content: "On the left is the editor where you will do most of your coding. This editor has code folding and syntax highlighting. <b>Ctrl + Space</b> Opens Auto-Complete.<br/>. You will be able to tab through code examples.",
          placement: "right",
          xOffset: -100
        }, {
          target: "console",
          title: "Console",
          content: "On the right is the console this is where you will see your program's output.",
          placement: "left",
          xOffset: 100
        }, {
          target: "editor-run",
          placement: "left",
          title: "Run Button",
          content: "Use this button to run your code from the editor in the console."
        }, {
          target: "editor-switch",
          placement: "left",
          title: "Switch Button",
          content: "Use this button to take code that you wrote from the console and insert it into the editor"
        }, {
          target: "#buttons .dropdown",
          placement: "bottom",
          title: "API Selector",
          content: "Use this drop-down to select future SDKs"
        }, {
          target: "#header > div > button:nth-child(2)",
          placement: "left",
          title: "API Templates",
          content: "Use this button to select API Templates from the DynamoDB developer's guide ."
        }, {
          target: "#header > div > button:nth-child(3)",
          placement: "left",
          title: "Save Button",
          content: "Save and load content from the editor. You can also load files by dragging them directly on top of the editor. To save files you can use CTL + S"
        }, {
          target: "#header > div > button:nth-child(4)",
          placement: "left",
          title: "Options Button",
          content: "Change your api access key name."
        }, {
          target: "#header > div > button:nth-child(5)",
          placement: "left",
          title: "Help section",
          content: "Open the shell's help section"
        }
      ],
      showPrevButton: true,
      scrollTopMargin: 100
    }
  });

}).call(this);
