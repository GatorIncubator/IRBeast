(function() {
  if (this.REPLIT == null) {
    this.REPLIT = exports;
  }

  this.REPLIT.Languages = {
    javascript: {
      name: 'DynamoDB JavaScript Shell',
      tagline: '',
      shortcut: '',
      about_link: 'http://docs.aws.amazon.com/amazondynamodb/latest/developerguide/Introduction.html',
      engine_link: 'http://docs.aws.amazon.com/AWSJavaScriptSDK/latest/frames.html',
      examples: {
        editor: 'langs/javascript/examples-editor.html',
        console: 'langs/javascript/examples-console.html'
      },
      ace_mode: {
        script: 'lib/ace/mode-javascript.js',
        module: 'ace/mode/javascript'
      },
      header: "<div>\n    <i class=\"service-icon s64 dynamodb\" aria-label=\"dynamodb\" role=\"img\"></i> <p style=\"text-align: center; font-size: 25px;\" >Welcome to the DynamoDB Web Shell</p> </br> <p>Get started with some API templates by clicking the <i class=\"icon-code\" role=\"img\"></i> button on the menu screen or start the tutorial by typing in 'tutorial.start()' </br>Or take a getting started tour: <button onclick=\"REPLIT.tour()\"><i class=\"icon-info-sign color-text-green icon-2x\" aria-label=\"info-sign\" role=\"img\"></i></button></p> </div> "
    }
  };

}).call(this);
