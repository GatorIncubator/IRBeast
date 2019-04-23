var config = {endpoint: location.href.substring(0, location.href.indexOf('/',8))};

(function(){
    if(window.console && console.log){
        var old = console.log;
        console.log = function(){
            if(typeof arguments[0] == "object"){
                try{
                    arguments[0] = JSON.stringify(arguments[0]);
                }catch (ex)
                {
                    old.apply(this,arguments);
                }
                old.apply(this,arguments);
            }
            else{
                old.apply(this,arguments);
            }
        }
    }
})();

var ppJson = function(content){
    if(!(content instanceof Object)){
        try {
            var content = JSON.parse(content);
        } catch (e) {
            console.log(content);
        }
    }
    this.Sandboss.outputJson(content);
}

var ppDynamo = function(content){
    if(!(content instanceof Object)){
        try {
            var content = JSON.parse(content);
        } catch (e) {
            console.log(content);
        }
    }
    this.Sandboss.outputWire(content);
}

var test = function(){
    console.log("hello");
}

AWS.config.update(
  {
      accessKeyId: 'cUniqueSessionID',
      secretAccessKey: 'secretAccessaey',
      maxRetries: 0
  }
);

AWS.config.region = 'us-west-2';

var dynamodb = new AWS.DynamoDB({
    endpoint:new AWS.Endpoint(config.endpoint)
});

var docClient = new AWS.DynamoDB.DocumentClient({
    service: dynamodb
});
