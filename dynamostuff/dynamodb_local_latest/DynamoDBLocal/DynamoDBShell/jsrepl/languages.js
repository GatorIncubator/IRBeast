(function() {
  this.JSREPL.prototype.Languages.prototype.javascript = {
    system_name: 'javascript',
    name: 'JavaScript',
    extension: 'js',
    matchings: [['(', ')'], ['[', ']'], ['{', '}']],
    scripts: ['util/console.js', 'extern/javascript/aws-sdk.min.js', 'extern/javascript/custom.js', 'extern/javascript/tutorial.js'],
    includes: [],
    engine: 'langs/javascript/jsrepl_js.js',
    minifier: 'closure'
  };

}).call(this);
