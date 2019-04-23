tutorial=
    number: -1
    start: ->
        @number = -1
        @next()
        Sandboss.outputAce ""
        Sandboss.startNavBar @content.length
    next: ->
        if @number == @content.length - 1
            @output "You have reached the end of the tutorial", "<p></p>", false, false, false
        else
            @number++
            lessonObj = @content[@number]
            isFirst = (@number == 0)
            isLast = (@number == (@content.length - 1))
            @output lessonObj.title,lessonObj.console, true, isFirst, isLast
            if lessonObj.editor != ""
                Sandboss.outputAce lessonObj.editor
    prev: ->
        if @number <= 0
            @output "You are out of the bounds of the tutorial", """<p><img src='images/dog.jpg' alt='Amazon dog'/></p>""", false, false, false
            return
        
        @number--
        lessonObj = @content[@number]
        isFirst = (@number == 0)
        isLast = (@number == (@content.length - 1))
        @output(lessonObj.title, lessonObj.console, true, isFirst, isLast)
        if lessonObj.editor != ""
            Sandboss.outputAce lessonObj.editor
    steps: ->
        output = '<ol>'
        for key of @content
            output += """<li><a onclick="REPLIT.jsrepl.eval('tutorial.step(#{key*1+1})')">#{@content[key].title}</a></li>"""
        output += '</ol>'
        @output "Table of Contents", output
    step: (key) ->
        key -= 1
        if key<0 || key>=@content.length
            stepContent =   """
                            <div class="alert alert-icon">\
                                <a class="close" data-dismiss="alert" href="#">×</a>\
                                <h3>Invalid Lesson Number!</h3>\
                                <p>Please select a number from <strong>0 - (@content.length -1)</strong></p>\
                            </div>\
                            """
            Sandboss.dumpHtml stepContent
        else
            @number = (key - 1)
            @next()
    output: (title, content, isLesson, isFirst, isLast) ->
        out = """<div class="tutorial"><h2>#{title}</h2>#{content}</div>"""
        Sandboss.dumpHtml(out)
    help: ->
        helpContent ="""
                     <p>The following tutorial will help you get started with DynamoDB. During the tutorial you will have the directions and \
                      results displayed on the right terminal and write the code on the left editor.<br>\
                     <br>\
                      Use the following commands to go through the tutorial:</p>\
                     <ul>\
                         <li><span class='code'>tutorial.start()</span>: Starts to the beginning of the tutorial</li>\
                         <li><span class='code'>tutorial.next()</span>: Goes to the next step of the tutorial</li>\
                         <li><span class='code'>tutorial.prev()</span>: Goes to the previous step of the tutorial</li>\
                         <li><span class='code'>tutorial.steps()</span>: Lists the tutorial's table of contents</li>\
                         <li><span class='code'>tutorial.step(number)</span>: Jumps to a specific step in the tutorial</li>\
                         <li><span class='code'>tutorial.help()</span></li>\
                     </ul>\
                     """
        @output 'Tutorial Help', helpContent
    # To make the string for the editor I used a website to include the escape chars and convert it into a string. Like this site:  http://www.freeformatter.com/javascript-escape.html#ad-output
    content: [
            title: "Getting Started",
            console:"""
                    <p>Let's get started with <a href='http://aws.amazon.com/dynamodb/'>Amazon DynamoDB</a> and the shell by taking a quick \
                     tour. We'll create some sample tables, load them with data, and perform some queries. For a more in-depth introduction, \
                     visit the <a href='http://docs.aws.amazon.com/amazondynamodb/latest/developerguide/Introduction.html'>Amazon DynamoDB \
                     Developer Guide</a>. A documentation link will always be below at the foot of the page.<br>\
                     To go to the next step in the tutorial, type <span class='code'>tutorial.next()</span>. You can also type <span class=\
                    'code'>tutorial.help()</span> for a listing of available commands, or <span class='code'>tutorial.steps()</span> to list the table of contents.</p>\
                    """
            editor: " "
        ,
            title: "Using the Shell",
            console:"""
                    <p>If this is your first time using the JavaScript Shell, here's a basic overview of how to use it: \
                    <ul>\
                        <li>The window on the right is your shell. Every time you press <span class='code'>Enter</span>, your JavaScript code is executed.</li>\
                        <li>The window on your left is your code editor. To run the code in the editor, you can press the \
                            <i class='icon-play' aria-label='play' role='img'></i> button or press <span class='code'>Ctrl+Enter</span>.</li>\
                        <li>Within the code editor, <span class='code'>Ctrl+Space</span> pulls up code snippets based on what you have typed, including shortcuts for calling the DynamoDB APIs</li>\
                        <li>The <i class="icon-code" aria-label="quote-left" role="img"></i> \
                            icon at the top of the screen shows example code templates for calling the DynamoDB APIs.</li>\
                        <li>The <i class="icon-question-sign color-text-blue" aria-label="question-sign" role="img"></i> \
                            icon at the top of the screen describes the rest of the the features and shortcuts in the shell.</li>\
                    </ul>\
                    That's enough about the JavaScript Shell for now.  Let's get back to learning about Amazon DynamoDB.
                    </p>\
                    """
            editor: " "
        ,
            title: "The Image Tag Demo Application"
            console: """
                    <p>Suppose you are building an image tagging application. With this application, users can assign tags \
                     to images, vote on their favorite images, and browse images by tag and by popularity. In this exercise, we \
                     will model the application by creating three tables:</p><br>\
                    <p><img src='images/dynamodb-image-tag-demo-data-model.png' alt='DynamoDB Image Tag Demo Data Model' height='280px'/></p>\
                    <ul>\
                        <li><span class='code'>Image</span>: Stores each image URL and the number of votes for the image</li>\
                        <li><span class='code'>Tag</span>: Stores the each tag and the number of images with that tag</li>\
                        <li><span class='code'>ImageTag</span>: Stores the association between images and tags</li>\
                    </ul>\
                    """
            editor: " "
        ,
            title: "Creating the Image Table"
            console:"""
                    <p>First, we'll create the Image table. For an overview of the data model of DynamoDB, such as Tables, Items, and \
                    Attributes, see the <a href='http://docs.aws.amazon.com/amazondynamodb/latest/developerguide/DataModel.html'>Data Model \
                    section of the Developer Guide.</a></p>
                    """
            editor: " "
        ,
            title: "CreateTable and Calling APIs"
            console:"""
                    <p>The CreateTable request is made up of a <span class='code'>params</span> object, which is then passed into the \
                    <span class='code'>createTable</span> call in the DynamoDB client. Calls to DynamoDB using the <a href=\
                    'http://aws.amazon.com/sdkforbrowser/'>AWS SDK for JavaScript</a> are asynchronous, meaning that the instead of the \
                     function returning the results when the call completes, the callback that you pass into the method is executed. You can \
                     see that the <span class='code'>TableName</span> parameter is filled in. Next, we'll walk through the additional \
                     arguments</p>\
                    """
            editor: """
                    // This CreateTable request will create the Image table.
                    // With DynamoDB Local, tables are created right away. If you are calling
                    // a real DynamoDB endpoint, you will need to wait for the table to become
                    // ACTIVE before you can use it. See also dynamodb.waitFor().
                    var params = {
                        // The name of the table to create
                        TableName: 'Image'

                        // ...more parameters
                    };
                    console.log("The CreateTable params aren't complete yet. Continue on to the next steps of the tutorial.");
                    //dynamodb.createTable(params, function(err, data) {
                    //    if (err) ppJson(err); // an error occurred
                    //    else ppJson(data); // successful response
                    //    console.log("CreateTable returned")
                    //});
                    """
        ,
            title: "CreateTable: Primary Keys"
            console:"""
                    <p>Next, the <a href="http://docs.aws.amazon.com/amazondynamodb/latest/APIReference/API_CreateTable.html">CreateTable</a> request needs a <a href=\
                    'http://docs.aws.amazon.com/amazondynamodb/latest/developerguide/DataModel.html#DataModel.PrimaryKey'>primary key schema</a>. \
                    For the <span class='code'>Image</span> table, we will use the <span class='code'>Id</span> attribute as a hash-only primary key schema. \
                    This means that each item in the table is uniquely identified by its <span class='code'>Id</span> attribute. \
                    DynamoDB automatically builds an index on the primary key, allowing for efficient queries.</p>\
                    """
            editor: """
                    // This CreateTable request will create the Image table.
                    // With DynamoDB Local, tables are created right away. If you are calling
                    // a real DynamoDB endpoint, you will need to wait for the table to become
                    // ACTIVE before you can use it. See also dynamodb.waitFor().
                    var params = {
                        TableName: 'Image',
                        KeySchema: [
                            {
                                AttributeName: 'Id',
                                KeyType: 'HASH'
                            }
                        ],
                        AttributeDefinitions: [
                            {
                                AttributeName: 'Id',
                                AttributeType: 'S'
                            }
                        ],

                        // ...more parameters
                    };
                    console.log("The CreateTable params aren't complete yet. Continue on to the next steps of the tutorial.");
                    //dynamodb.createTable(params, function(err, data) {
                    //    if (err) ppJson(err); // an error occurred
                    //    else ppJson(data); // successful response
                    //    console.log("CreateTable returned")
                    //});
                    """
        ,
            title:"CreateTable: Provisioned Throughput"
            console:"""
                    <p>Finally, when you create a table, you specify how much <a href=\
                    'http://docs.aws.amazon.com/amazondynamodb/latest/developerguide/ProvisionedThroughputIntro.html'>provisioned \
                     throughput</a> capacity you want to reserve for reads and writes. DynamoDB will reserve the necessary machine resources \
                     to meet your throughput needs while ensuring consistent, low-latency performance. You can increase or decrease the \
                     provisioned throughput later using the <span class='code'>UpdateTable</span> API or using the <a href=\
                    'https://console.aws.amazon.com/dynamodb/home'>DynamoDB Console</a>. Read and write capacity units translate roughly to how many \
                     read and write requests you'll be able to make to your table per-second, varying based on the size of the items in your request. \
                     For now, we've filled in the minimum of 1 read and write capacity unit.</p>\
                    """
            editor: """
                    // This CreateTable request will create the Image table.
                    // With DynamoDB Local, tables are created right away. If you are calling
                    // a real DynamoDB endpoint, you will need to wait for the table to become
                    // ACTIVE before you can use it. See also dynamodb.waitFor().
                    var params = {
                        TableName: 'Image',
                        KeySchema: [
                            {
                                AttributeName: 'Id',
                                KeyType: 'HASH'
                            }
                        ],
                        AttributeDefinitions: [
                            {
                                AttributeName: 'Id',
                                AttributeType: 'S'
                            }
                        ],
                        ProvisionedThroughput:  {
                            ReadCapacityUnits: 1,
                            WriteCapacityUnits: 1
                        }
                    };
                    console.log("The CreateTable params aren't complete yet. Continue on to the next steps of the tutorial.");
                    //dynamodb.createTable(params, function(err, data) {
                    //    if (err) ppJson(err); // an error occurred
                    //    else ppJson(data); // successful response
                    //    console.log("CreateTable returned")
                    //});
                    """
        ,
            title: "CreateTable: Putting It All Together"
            console:"""
                    <p>The CreateTable API returns the same type of information as the <span class='code'>describeTable</span> API. This \
                     information includes the table's <span class='code'>Status</span>, such as <span class='code'>CREATING</span>, \
                    <span class='code'>UPDATING</span>, or <span class='code'>ACTIVE</span>. When you create a table, you need to wait \
                     until the table becomes ACTIVE before you can use it. Since this tutorial calls DynamoDB Local, however, tables become \
                    <span class='code'>ACTIVE</span> immediately.</p>\
                    </br>\
                    <p>Now that you have a CreateTable request fully constructed, run it! Either click the <i class='icon-play' aria-label='play' role='img'></i> \
                     arrow between the two windows, or type <span class='code'>Ctrl+Enter</span> in the code editor window to copy over and execute the command from \
                     the text editor to the shell.</p><br>\
                    """
            editor: """
                    // This CreateTable request will create the Image table.
                    // With DynamoDB Local, tables are created right away. If you are calling
                    // a real DynamoDB endpoint, you will need to wait for the table to become
                    // ACTIVE before you can use it. See also dynamodb.waitFor().
                    var params = {
                        TableName: 'Image',
                        KeySchema: [
                            {
                                AttributeName: 'Id',
                                KeyType: 'HASH'
                            }
                        ],
                        AttributeDefinitions: [
                            {
                                AttributeName: 'Id',
                                AttributeType: 'S'
                            }
                        ],
                        ProvisionedThroughput:  {
                            ReadCapacityUnits: 1,
                            WriteCapacityUnits: 1
                        }
                    };
                    console.log("Creating the Image table");
                    dynamodb.createTable(params, function(err, data) {
                        if (err) ppJson(err); // an error occurred
                        else ppJson(data); // successful response
                    });
                    """
        ,
            title: "PutItem: Adding Items to the Image Table"
            console:"""
                    <p>Now that you have a table created, you can add <a href=\
                    'http://docs.aws.amazon.com/amazondynamodb/latest/developerguide/WorkingWithItems.html'>items</a> to the table using \
                     the <a href='http://docs.aws.amazon.com/amazondynamodb/latest/APIReference/API_PutItem.html'>PutItem API</a>. This \
                     request puts a new Image item into the Image table. An Item is a map of attribute name to attribute value. Each \
                     attribute value in an item must be one of the <a href=\
                    'http://docs.aws.amazon.com/amazondynamodb/latest/developerguide/DataModel.html#DataModel.DataTypes'>supported data \
                     types</a>. This example puts a new item with 3 attributes: <span class='code'>Id</span>, <span class=\
                    'code'>DateAdded</span>, and <span class='code'>VoteCount</span>. You can see more details about the PutItem API in the \
                    <a href='http://docs.aws.amazon.com/amazondynamodb/latest/developerguide/WorkingWithItems.html'>Working with Items</a> \
                     section of the Developer Guide.</p>\
                    <br>\
                    <p>Run the PutItem command now (<i class='icon-play' aria-label='play' role='img'></i>). \
                     Notice that by default, this API does not return anything.</p>\
                    """
            editor: """
                    // The PutItem API inserts a new item into DynamoDB.
                    // If an item already exists with the same primary key value,
                    // the item is replaced with the new item.
                    // The API has several other useful parameters not shown here, including:
                    //  * Expected: DynamoDB will perform the write only if certain attributes
                    //    match the values you expect them to have
                    //  * ReturnValues: DynamoDB can return the value you are replacing
                    var params = {
                        TableName: 'Image',
                        Item: {
                            Id: 'dynamodb.png',
                            DateAdded: new Date().toISOString(),
                            VoteCount: 0
                        }
                    };
                    console.log("Calling PutItem");
                    ppJson(params);
                    docClient.put(params, function(err, data) {
                        if (err) ppJson(err); // an error occurred
                        else console.log("PutItem returned successfully");
                    });
                    """
        ,
            title: "GetItem: Fetching Your New Image Item"
            console:"""
                    <p>Now that we have put an item into the Image table, you can retrieve it using the <a href=\
                    'http://docs.aws.amazon.com/amazondynamodb/latest/APIReference/API_GetItem.html'>GetItem API</a>. This API supports \
                    retrieving an item where you know its exact primary key attribute value(s). In this case, the primary key of the \
                    <span class='code'>Image</span> table is only the <span class='code'>Id</span> attribute.</p>\
                    <br>\
                    <p>You can see the results of a GetItem call by executing the code with the <i class='icon-play' aria-label='play' role='img'></i> button.</p>\
                    """
            editor: """
                    // GetItem retrieves an item by its exact primary key.
                    // This API also has a ConsistentRead parameter for choosing between
                    // strictly and eventually consistent read consistency.
                    var params = {
                        TableName: 'Image',
                        Key: {
                            Id: 'dynamodb.png'
                        }
                    };
                    console.log("Calling GetItem");
                    docClient.get(params, function(err, data) {
                        if (err) ppJson(err); // an error occurred
                        else ppJson(data); // successful response
                    });
                    """
        ,
            title: "BatchWriteItem: Making Things Interesting With More Data"
            console:"""
                    <p>To make things more interesting for other examples, let’s add more items to the <span class='code'>Image</span> \
                     table. The DynamoDB <a href="http://docs.aws.amazon.com/amazondynamodb/latest/APIReference/API_BatchWriteItem.html">BatchWriteItem</a> API supports writing up to 25 items at a time. Each \
                     request in the BatchWriteItem \
                     call is processed separately, meaning that some can fail while others succeed. \
                     Therefore it is important to continue to call the <span class='code'>BatchWriteItem</span> API until all of the calls \
                     succeed.</p>\
                     <br>\
                     <p>Run the code with the <i class='icon-play' aria-label='play' role='img'></i> button to populate the table with data.</p>\
                    """
            editor: """
                    // The BatchWriteItem takes up to 25 requests, some of which may succeed,
                    // and others needing to be retried. This example program takes in a list of requests
                    // that is larger than the batch size, and calls BatchWriteItem multiple times until
                    // all of the items have been written.
                    var params = {
                        // RequestItems is a map of TableName to Requests
                        RequestItems: {
                            Image: [
                                {
                                    PutRequest: {
                                        Item: {
                                            Id: 'sqs.png',
                                            DateAdded: new Date().toISOString(),
                                            VoteCount: 0 
                                        }
                                    }
                                },
                                {
                                    PutRequest: {
                                        Item: {
                                            Id: 'kinesis.png',
                                            DateAdded: new Date().toISOString(),
                                            VoteCount: 0
                                        }
                                    }
                                }
                            ]
                        }
                    };

                    // Generate some more requests and add them to the params map
                    var urls = [ 'android.png', 'appstream.png', 'cli.png', 'cloudformation.png',
                        'cloudfront.png', 'cloudsearch.png', 'cloudtrail.png', 'cloudwatch.png', 'data-pipeline.png',
                        'direct-connect.png', 'dotnet.png', 'dynamodb.png', 'ec2.png', 'eclipse.png', 'elasticache.png',
                        'elastic-beanstalk.png', 'elb.png', 'emr.png', 'glacier.png', 'iam.png', 'ios.png', 'java.png',
                        'nodejs.png', 'opsworks.png', 'php.png', 'powershell.png', 'python.png', 'rds.png', 'redshift.png',
                        'route53.png', 'ruby.png', 's3.png', 'ses.png', 'sns.png', 'storage-gateway.png', 'swf.png',
                        'transcoding.png', 'visual-studio.png', 'vpc.png'
                    ];

                    // Iterate over all of the additional URLs and keep kicking off batches of up to 25 items
                    while (urls.length > 0) {

                        // Pull off up to 25 items from the list
                        for (var i = params.RequestItems.Image.length; i < 25; i++) {

                            // Nothing else to add to the batch if the input list is empty
                            if (urls.length === 0) {
                                break;
                            }

                            // Take a URL from the list and add a new PutRequest to the list of requests
                            // targeted at the Image table
                            url = urls.pop();
                            params.RequestItems.Image.push(
                                {
                                    PutRequest: {
                                        Item: {
                                            Id: url,
                                            DateAdded: new Date().toISOString(),
                                            VoteCount: 0
                                        }
                                    }
                                }
                            );
                        }
                        // Kick off this batch of requests
                        console.log("Calling BatchWriteItem with a new batch of "
                                + params.RequestItems.Image.length + " items");
                        docClient.batchWrite(params, doBatchWriteItem);

                        // Initialize a new blank params variable
                        params = {
                            RequestItems: {
                                Image: []
                            }
                        };
                    }

                    // A callback that repeatedly calls BatchWriteItem until all of the writes have completed
                    function doBatchWriteItem(err, data) {
                        if (err) {
                            ppJson(err); // an error occurred
                        } else {
                            if ('UnprocessedItems' in data && 'Image' in data.UnprocessedItems) {
                                // More data. Call again with the unprocessed items.
                                var params = {
                                    RequestItems: data.UnprocessedItems
                                };
                                console.log("Calling BatchWriteItem again to retry "
                                    + params.RequestItems.Image.length + "UnprocessedItems");
                                docClient.batchWrite(params, doBatchWriteItem);
                            } else {
                                console.log("BatchWriteItem processed all items in the batch");
                            }
                        }
                    }
                    """
        ,
            title: "Scan: Reading Everything Out of the Table"
            console:"""
                    <p>Now you can retrieve all of the items in the <span class='code'>Image</span> table using the <a href=\
                    'http://docs.aws.amazon.com/amazondynamodb/latest/APIReference/API_Scan.html'>Scan</a> API. This API is not an \
                     efficient way to query for specific items in your table, but can be useful for periodically sweeping through all of the \
                     items in a table for background processing. More information about Scan performance and best practices is available in \
                     the <a href='http://docs.aws.amazon.com/amazondynamodb/latest/developerguide/QueryAndScan.html'>Developer \
                     Guide</a>.</p>\
                     <br>\
                     <p>Run the Scan code with the <i class='icon-play' aria-label='play' role='img'></i> button to see the some of the data in the table.</p>\
                    """
            editor: """
                    // Invokes the Scan API to retrieve only one "page" of data from the table.
                    // It needs to be called repeatedly to scan the whole table (this will be shown next)
                    // If you are scanning a large table, make sure to follow the best practices
                    // as described in the developer guide.
                    var params = {
                        TableName: 'Image',
                        Limit: 5  // Limits the number of results per page (beyond the default 1MB limit)
                    };

                    console.log("Calling the Scan API on the Image table");
                    docClient.scan(params, function(err, data) {
                        if (err) {
                            ppJson(err); // an error occurred
                        } else {
                            console.log("The Scan call evaluated " + data.ScannedCount + " items");
                            ppJson(data); // successful response
                        }
                    });
                    """
        ,
            title: "Scan: Paginating Through Results"
            console:"""
                    <p>The <a href=''>Scan API</a> is a paginated API, meaning that you have to call it repeatedly in order to retrieve all \
                     of the data in your table. One call to Scan will evaluate up to 1 MB of data, or the number of items you specify in the \
                     Limit parameter. This code calls the Scan API repeatedly, each time passing in the <span class=\
                    'code'>LastEvaluatedKey</span> parameter from the previous response in as the <span class=\
                    'code'>ExclusiveStartKey</span> parameter in the next request.</p>\
                    <br>\
                    <p>Run the Scan code with the <i class='icon-play' aria-label='play' role='img'></i> button to see all of the data in the table.</p>\
                    """
            editor: """
                    // This example repeatedly scans a number of items at a time, following the pagination token until
                    // the scan reaches the end of the table.
                    var params = {
                        TableName: 'Image',
                        Limit: 15  // Limits the number of results per page
                    };

                    // A callback that paginates through an entire DynamoDB table
                    function doScan(err, data) {
                        if (err) {
                            ppJson(err); // an error occurred
                        } else {
                            // Print the results
                            console.log("Last scan processed " + data.ScannedCount + " items: ");
                            var images = [];
                            for (var i = 0; i < data.Items.length; i++ ) {
                                images.push(data.Items[i].Id);
                            }
                            console.log(" "  + images.join(", "));

                            // More data.  Keep calling scan.
                            if ('LastEvaluatedKey' in data) {
                                console.log("Last Scan evaluated " + data.ScannedCount + " items. "
                                    + "Calling Scan again for another page of results");

                                params.ExclusiveStartKey = data.LastEvaluatedKey;
                                docClient.scan(params, doScan);
                            } else {
                                console.log("*** Finished the scan ***");
                            }
                        }
                    }

                    // Kick off the scan
                    console.log("Starting a Scan of the Image table");
                    docClient.scan(params, doScan);
                    """
        ,
            title: "Scan: Easier pagination with the JavaScript SDK"
            console:"""
                    <p>Writing all that extra code to deal with pagination can be a bit tedious. Fortunately the AWS SDK for JavaScript offers a helpful \
                    pagination function that you can use on any of DynamoDB's paginated APIs.</p>\
                    <br>\
                    <p>Run the Scan code with the <i class='icon-play' aria-label='play' role='img'></i> button to see all of the data in the table.</p>\
                    """
            editor: """
                    // This example repeatedly scans a number of items at a time, following the pagination token until
                    // the scan reaches the end of the table.
                    var params = {
                        TableName: 'Image',
                        Limit: 15  // Limits the number of results per page
                    };

                    // Kick off the scan
                    console.log("Starting a Scan of the Image table");
                    docClient.scan(params).eachPage(function(err, data) {
                        if (err) {
                            ppJson(err); // an error occurred
                        } else if (data) {
                            console.log("Last scan processed " + data.ScannedCount + " items: ");
                            var images = [];
                            for (var i = 0; i < data.Items.length; i++ ) {
                                images.push(data.Items[i].Id.S);
                            }
                            console.log(" "  + images.join(", "));
                        } else {
                            console.log("*** Finished scan ***");
                        }
                    });
                    """
        ,
            title: "CreateTable: More Interesting Tables"
            console:"""
                    <p>Since the Image table has a Hash-only <a href=
                    'http://docs.aws.amazon.com/amazondynamodb/latest/developerguide/DataModel.html#DataModel.PrimaryKey'>primary key \
                     schema</a>, and does not have any secondary indexes, it behaves like a key-value store, where the only efficient and \
                     scalable operations on the table are where you know exactly what item you want to retrieve. Next, let’s create another \
                     table that will support more complex queries.</p>\
                    """
            editor:" "
        ,
            title: "CreateTable: Tagging Images With the ImageTag Table"
            console:"""
                    <p>Storing images is useful, but this Image Tagging application also needs to support assigning tags to images, and \
                     querying for all images given a particular tag. To accomplish this, create a new table called <span class=\
                    'code'>ImageTag</span> to associate each image with its corresponding tag.<br>\
                    <br>\
                     The table uses a <a href=\
                    'http://docs.aws.amazon.com/amazondynamodb/latest/developerguide/DataModel.html#DataModel.PrimaryKey'>Hash-Range \
                     primary key schema</a>, with <span class='code'>Tag</span> as the hash key and <span class='code'>ImageId</span> as the \
                     range key. This serves as a one-to-many relationship between a Tag as an Image. Later in this tutorial, we'll show how \
                     to use the Query API to retrieve all images for a given tag.<br>\
                    <br>\
                     The table also has two <a href=\
                    'http://docs.aws.amazon.com/amazondynamodb/latest/developerguide/SecondaryIndexes.html'>secondary indexes</a> to \
                     support other query patterns efficiently. The first is a <a href=\
                    'http://docs.aws.amazon.com/amazondynamodb/latest/developerguide/GSI.html'>global secondary index</a> called \
                    <span class='code'>ImageId-index</span> for querying to see what tags are attached to a particular image. The second is \
                     a <a href='http://docs.aws.amazon.com/amazondynamodb/latest/developerguide/LSI.html'>local secondary index</a> called \
                    <span class='code'>VoteCount-index</span> for querying for all images with a particular tag, but sorted by \
                     popularity.</p>\
                    </br>\
                    <p>Run the command in the code editor now (<i class='icon-play' aria-label='play' role='img'></i>) \
                    to create the <span class='code'>ImageTag</span> table and its secondary indexes.</p>\
                    """
            editor: """
                    // This CreateTable request will create the ImageTag table.
                    var params = {
                        TableName: 'ImageTag',
                        KeySchema: [
                            {
                                AttributeName: 'Tag',
                                KeyType: 'HASH'
                            },
                            {
                                AttributeName: 'ImageId',
                                KeyType: 'RANGE'
                            }
                        ],
                        GlobalSecondaryIndexes: [{
                                IndexName: 'ImageId-index',
                                KeySchema: [
                                    {
                                        AttributeName: 'ImageId',
                                        KeyType: 'HASH'
                                    },
                                    {
                                        AttributeName: 'Tag',
                                        KeyType: 'RANGE'
                                    }
                                ],
                                Projection: {
                                    ProjectionType: 'KEYS_ONLY'
                                },
                                ProvisionedThroughput: {
                                    ReadCapacityUnits: 1,
                                    WriteCapacityUnits: 1
                                }
                            }
                        ],
                        LocalSecondaryIndexes: [{
                                IndexName: 'VoteCount-index',
                                KeySchema: [
                                    {
                                        AttributeName: 'Tag',
                                        KeyType: 'HASH'
                                    },
                                    {
                                        AttributeName: 'VoteCount',
                                        KeyType: 'RANGE'
                                    }
                                ],
                                Projection: {
                                    ProjectionType: 'ALL'
                                }
                            }
                        ],
                        AttributeDefinitions: [
                            {
                                AttributeName: 'Tag',
                                AttributeType: 'S'
                            },
                            {
                                AttributeName: 'ImageId',
                                AttributeType: 'S'
                            },
                            {
                                AttributeName: 'VoteCount',
                                AttributeType: 'N'
                            }
                        ],
                        ProvisionedThroughput:  {
                            ReadCapacityUnits: 1,
                            WriteCapacityUnits: 1
                        }
                    };
                    console.log("Creating the ImageTag table");
                    dynamodb.createTable(params, function(err, data) {
                            if (err) ppJson(err); // an error occurred
                            else ppJson(data); // successful response
                            console.log("CreateTable returned");
                        });
                    """
        ,
            title: "Loading Demo Data (Tagging Images)"
            console:"""
                    <p>Now let's put some data into the <span class='code'>ImageTag</span> table.</p>\
                    </br>\
                    <p>You may notice that this code uses a slightly different callback API in the AWS SDK so that the request object is \
                     accessible in the callback for printing out debugging info. More information on the differences in callback APIs in the \
                     SDK is available in the <a href=\
                    'http://docs.aws.amazon.com/AWSJavaScriptSDK/guide/browser-making-requests.html#The_Response_Object__AWS_Response_'>AWS \
                     SDK for JavaScript Developer Guide</a>.</p>\
                    </br>\
                    <p>Run this example program (<i class='icon-play' aria-label='play' role='img'></i>) to tag a bunch of images.</p>\
                    """
            editor: """
                    // This short program will load in a bunch of example data into the ImageTag table.

                    // A map of image id to the tags to attach to the image.
                    var images = {
                        'android.png': ['SDKs & Tools', 'Android'],
                        'appstream.png': ['Application Services', 'Amazon AppStream'],
                        'cli.png': ['SDKs & Tools', 'AWS CLI'],
                        'cloudformation.png': ['Deployment & Management', 'AWS CloudFormation'],
                        'cloudfront.png': ['Storage & CDN', 'Amazon CloudFront'],
                        'cloudsearch.png': ['Application Services', 'Amazon CloudSearch'],
                        'cloudtrail.png': ['Deployment & Management', 'AWS CloudTrail'],
                        'cloudwatch.png': ['Deployment & Management', 'Amazon CloudWatch'],
                        'data-pipeline.png': ['Analytics', 'AWS Data Pipeline'],
                        'direct-connect.png': ['Compute & Networking', 'AWS Direct Connect'],
                        'dotnet.png': ['SDKs & Tools', '.NET'],
                        'dynamodb.png': ['Database', 'Amazon DynamoDB'],
                        'ec2.png': ['Compute & Networking', 'Amazon EC2'],
                        'eclipse.png': ['SDKs & Tools', 'Eclipse'],
                        'elasticache.png': ['Database', 'Amazon ElastiCache'],
                        'elastic-beanstalk.png': ['Deployment & Management', 'AWS Elastic Beanstalk'],
                        'elb.png': ['Compute & Networking', 'Elastic Load Balancing'],
                        'emr.png': ['Analytics', 'Amazon EMR'],
                        'glacier.png': ['Storage & CDN', 'Amazon Glacier'],
                        'iam.png': ['Deployment & Management', 'AWS IAM'],
                        'ios.png': ['SDKs & Tools', 'iOS'],
                        'java.png': ['SDKs & Tools', 'Java'],
                        'kinesis.png': ['Analytics', 'Amazon Kinesis'],
                        'nodejs.png': ['SDKs & Tools', 'Node.js'],
                        'opsworks.png': ['Deployment & Management', 'AWS OpsWorks'],
                        'php.png': ['SDKs & Tools', 'PHP'],
                        'powershell.png': ['SDKs & Tools', 'PowerShell'],
                        'python.png': ['SDKs & Tools', 'Python'],
                        'rds.png': ['Database', 'Amazon RDS'],
                        'redshift.png': ['Database', 'Amazon Redshift'],
                        'route53.png': ['Compute & Networking', 'Amazon Route 53'],
                        'ruby.png': ['SDKs & Tools', 'Ruby'],
                        's3.png': ['Storage & CDN', 'Amazon S3'],
                        'ses.png': ['Application Services', 'Amazon SES'],
                        'sns.png': ['Application Services', 'Amazon SNS'],
                        'sqs.png': ['Application Services', 'Amazon SQS'],
                        'storage-gateway.png': ['Storage & CDN', 'Amazon Storage Gateway'],
                        'swf.png': ['Application Services', 'Amazon SWF'],
                        'transcoding.png': ['Application Services', 'Amazon Elastic Transcoder'],
                        'visual-studio.png': ['SDKs & Tools', 'Visual Studio'],
                        'vpc.png': ['Compute & Networking', 'Amazon VPC']
                    };

                    // Pulls off the next image to tag mapping in the above map, and
                    // processes all of the tags for that image.
                    function processImage() {

                        // If there aren't any images left, we're done (pending any in-flight requests)
                        if (Object.keys(images).length === 0) {
                            console.log("*** Finished tagging all images ***");
                            return;
                        }

                        // Get the first image and its tags
                        var image = Object.keys(images)[0];
                        var tags = images[image];
                        delete images[image];

                        // Random vote count for each image...kind of.
                        voteCount = ("dynamodb.png" == image) ? 1000 : Math.floor((Math.random() * 20) + 80);

                        // Always tag images with 'Amazon Web Services'
                        tags.push('Amazon Web Services');

                        // Submit the requests in parallel and wait for them to complete
                        inFlightRequests = tags.length;

                        // Update the Image item to include a vote count
                        docClient.update({
                            TableName: 'Image',
                            Key: {
                                Id: image,
                            },
                            UpdateExpression: 'ADD VoteCount :voteCount',
                            ExpressionAttributeValues: {
                                ':voteCount': voteCount
                            }
                        }).on('complete', function (response) {
                            var image = response.request.params.Key.ImageId;
                            if (response.error) {
                                console.log("ERROR with updating vote count for image " + image + ": " + err);
                            } else {
                                console.log("Updated VoteCount for " + image);
                            }
                            inFlightRequests--;
                            if(inFlightRequests === 0) {
                                console.log("Done with writes for image " + image);
                                processImage();
                            }
                        }).send();

                        // Now insert a new tag item for each ImageTag relationship
                        for (i = 0; i < tags.length; i++) {
                            var tag = tags[i];
                            var imageId = image;

                            // Write the ImageTag item for this image+tag combination
                            docClient.put({
                                TableName: 'ImageTag',
                                Item: {
                                    Tag: tag,
                                    ImageId: imageId,
                                    VoteCount: voteCount,
                                }
                            }, function (err, data) {
                                if (err) {
                                    console.log("ERROR with tagging " + imageId + " with " + tag + ": " + err);
                                } else {
                                    console.log("Tagged " + imageId + " with " + tag);
                                }
                                inFlightRequests--;
                                if(inFlightRequests === 0) {
                                    console.log("Done with writes for image " + imageId);
                                    processImage();
                                }
                            }); // FIXME disregard this style warning. Working on disabling that feature of editor.
                        }
                    }

                    // Kick off the process
                    processImage();
                    """
        ,
            title: "Query: Querying Hash-Range Tables"
            console:"""
                    <p>Now you can try some <a href=\
                    'http://docs.aws.amazon.com/amazondynamodb/latest/developerguide/QueryAndScan.html'>queries</a>. First, use the \
                    <a href='http://docs.aws.amazon.com/amazondynamodb/latest/APIReference/API_Query.html'>Query API</a> to retrieve \
                     all images for the tag <span class='code'>Database</span>. The results will be sorted by range key (in this case image \
                     id). Notice that this code uses the <span class='code'>eachPage()</span> method to call the Query API repeatedly \
                     if there are more than one page of results.</p>\
                    </br>\
                    <p>Run the code (<i class='icon-play' aria-label='play' role='img'></i>) to see the Query API in action.</p>\
                    """
            editor: """
                    // Queries for all items in the ImageTag table for images with the tag 'Database'
                    var params = {
                        TableName: 'ImageTag',
                        KeyConditionExpression: 'Tag = :db',
                        ExpressionAttributeValues: {
                            ':db' : 'Database'
                        }
                    };
                    console.log("Querying the ImageTag table for all images with the tag 'Database'");
                    docClient.query(params).eachPage(function(err, data) {
                        if (err) ppJson(err); // an error occurred
                        else if (data) ppJson(data); // successful response
                    });
                    """
        ,
            title: "Query: Using a Local Secondary Index to Get the Popular Images"
            console:"""
                    <p>The sort order in the previous example wasn't very useful, so next let's query the <span class=\
                    'code'>VoteCount-index</span> to retrieve the top 5 most popular items for the tag <span class='code'>Database</span>. \
                     We’ll use the <a href='http://docs.aws.amazon.com/amazondynamodb/latest/APIReference/API_Query.html'>Query API</a> \
                     again, but add the <span class='code'>IndexName</span> to query against the index, and <span class=\
                    'code'>ScanIndexForward</span>: <span class='code'>false</span> to get the results descending.</p>\
                    </br>\
                    <p>Run the code (<i class='icon-play' aria-label='play' role='img'></i>) to see a query on a local secondary index.</p>\
                    """
            editor:"""
                    // Queries ImageTag's VoteCount index to get up to 5 images with the 'Database' tag, ordered by popularity
                    var params = {
                        TableName: 'ImageTag',
                        IndexName: 'VoteCount-index',
                        KeyConditionExpression: 'Tag = :db',
                        ExpressionAttributeValues: {
                            ':db' : 'Database'
                        },
                        Limit: 5,
                        ScanIndexForward: false
                    };
                    console.log("Querying the ImageTag table's VoteCount-index "
                        + "for up to 5 images with the tag 'Database', ordered by VoteCount (descending)");
                    docClient.query(params, function(err, data) {
                        if (err) ppJson(err); // an error occurred
                        else if (data) ppJson(data); // successful response
                    });
                    """
        ,
            title: "Query: Using a Global Secondary Index to get the Tags for an Image"
            console:"""
                    <p>The image <span class='code'>dynamodb.png</span> seems to have the largest number of votes. To see what else \
                    <span class='code'>dynamodb.png</span> is tagged with, query the index <span class='code'>ImageId-index</span>.</p>\
                    </br>\
                    <p>Run the code (<i class='icon-play' aria-label='play' role='img'></i>) to see a query on a global secondary index.</p>\
                    """
            editor: """
                    // Queries ImageTag's ImageId index to get all of the tags for the image 'dynamodb.png'
                    var params = {
                        TableName: 'ImageTag',
                        IndexName: 'ImageId-index',
                        KeyConditionExpression: 'ImageId = :png',
                        ExpressionAttributeValues: {
                            ':png': 'dynamodb.png'
                        }
                    };
                    console.log("Querying the ImageTag table's ImageId-index all tags for the image 'dynamodb.png'");
                    docClient.query(params).eachPage(function(err, data) {
                        if (err) ppJson(err); // an error occurred
                        else if (data) ppJson(data); // successful response
                    });
                    """
        ,
            title: "Creating One Last Table for the Demo"
            console:"""
                    <p>Before we can run the functioning demo, there is one more table to create and populate with data: the <span class=\
                    'code'>Tag</span> table. This table stores each tag and the number of images for each tag. First, create the \
                    <span class='code'>Tag</span> table. This is a simple hash-only primary key schema table.</p>\
                    </br>\
                    <p>Run the code (<i class='icon-play' aria-label='play' role='img'></i>) to create the Tag table.</p>\
                    """
            editor: """
                    // This CreateTable request will create the Tag table.
                    var params = {
                        TableName: 'Tag',
                        KeySchema: [
                            {
                                AttributeName: 'Tag',
                                KeyType: 'HASH'
                            }
                        ],
                        AttributeDefinitions: [
                            {
                                AttributeName: 'Tag',
                                AttributeType: 'S'
                            }
                        ],
                        ProvisionedThroughput:  {
                            ReadCapacityUnits: 1,
                            WriteCapacityUnits: 1
                        }
                    };
                    console.log("Creating the Tag table");
                    dynamodb.createTable(params, function(err, data) {
                        if (err) ppJson(err); // an error occurred
                        else ppJson(data); // successful response
                        console.log("CreateTable returned");
                    });
                    """
        ,
            title: "Loading the Last Bit of Demo Data"
            console:"""
                    <p>Next, run the code (<i class='icon-play' aria-label='play' role='img'></i>) \
                    to populate the <span class='code'>Tag</span> table with data.</p>
                    """
            editor: """
                    // Populates the Tag table to list all of the tags and each tag's image count

                    // A map of tag to number of images with that tag
                    var tags = {
                        'SDKs & Tools': 12,
                        'Application Services': 7,
                        'Deployment & Management': 6,
                        'Storage & CDN': 4,
                        'Analytics': 3,
                        'Compute & Networking': 5,
                        'Database': 5,
                        'Android': 1,
                        'Amazon AppStream': 1,
                        'AWS CLI': 1,
                        'AWS CloudFormation': 1,
                        'Amazon CloudFront': 1,
                        'Amazon CloudSearch': 1,
                        'AWS CloudTrail': 1,
                        'AWS Data Pipeline': 1,
                        'AWS Direct Connect': 1,
                        '.NET': 1,
                        'Amazon DynamoDB': 1,
                        'Amazon EC2': 1,
                        'Eclipse': 1,
                        'Amazon ElastiCache': 1,
                        'AWS Elastic Beanstalk': 1,
                        'Elastic Load Balancing': 1,
                        'Amazon EMR': 1,
                        'Amazon Glacier': 1,
                        'AWS IAM': 1,
                        'iOS': 1,
                        'Java': 1,
                        'Amazon Kinesis': 1,
                        'Node.js': 1,
                        'AWS OpsWorks': 1,
                        'PHP': 1,
                        'PowerShell': 1,
                        'Python': 1,
                        'Amazon RDS': 1,
                        'Amazon Redshift': 1,
                        'Amazon Route 53': 1,
                        'Ruby': 1,
                        'Amazon S3': 1,
                        'Amazon SES': 1,
                        'Amazon SNS': 1,
                        'Amazon SQS': 1,
                        'Amazon Storage Gateway': 1,
                        'Amazon SWF': 1,
                        'Amazon Elastic Transcoder': 1,
                        'Visual Studio': 1,
                        'Amazon VPC': 1
                    };

                    // Kicks off putting the tags into the table
                    putTag();

                    // Puts the tags into the Tag table one by one
                    function putTag() {

                        // If there are no more tags in the map, we're done
                        if (Object.keys(tags).length === 0) {
                            console.log("*** Finished adding tags ***");
                            return;
                        }
                        // Pop off the next tag in the list
                        var tag = Object.keys(tags)[0];
                        var numImages = tags[tag];
                        delete tags[tag];

                        // Put the Tag item into the table
                        docClient.put({
                            TableName: 'Tag',
                            Item: {
                                Tag: tag,
                                ImageCount: numImages
                            }
                        }, function(err, data) {
                            if (err) ppJson(err); // an error occurred
                            else {
                                console.log("Added the '" + tag + "' tag");
                                putTag(); // put the next tag once this one completes
                            }
                        });
                    }
                    """
        ,
            title: "Try Out the Demo"
            console:"""
                    <p>Now you can launch the <a href="image-tag-demo.html" target="_blank">image tagging demo web app</a> \
                    to see the type of application you can build using a simple schema on DynamoDB.</p>\
                    """
            editor:" "
    ]
