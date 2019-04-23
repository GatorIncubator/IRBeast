(function() {
  var $;

  $ = jQuery;

  $.extend(REPLIT, {
    setSnippets: function(m) {
      return m.snippets.concat(this.snippetContents);
    },
    snippetContents: [
      {
        name: "AttributeValue",
        tabTrigger: "AttributeValue",
        content: "// Enter only one of the possible attribute value types.\n// For a more convenient shorthand command, use the shortcut\n// for each type, such as 'S', 'N', 'B'.\n{\n    S: 'STRING_VALUE',\n    N: 'NUMBER_VALUE',\n    B: 'BASE64_ENCODED_STRING',\n    SS: [ 'STRING_VALUE_1', 'STRING_VALUE_2', ],\n    NS: [ 'NUMBER_VALUE_1', 'NUMBER_VALUE_2', ],\n    BS: [ 'BASE64_ENCODED_STRING_1', 'BASE64_ENCODED_STRING_2', ]\n}"
      }, {
        name: "S",
        tabTrigger: "S",
        content: "{ S: '${1:STRING_VALUE}' }"
      }, {
        name: "N",
        tabTrigger: "N",
        content: "{ N: '${1:NUMBER_VALUE}' }"
      }, {
        name: "B",
        tabTrigger: "B",
        content: "{ B: '${1:BASE64_ENCODED_STRING}' }"
      }, {
        name: "SS",
        tabTrigger: "SS",
        content: "[ '${1:STRING_VALUE_1}', '${2:STRING_VALUE_2}', ${3: }]"
      }, {
        name: "NS",
        tabTrigger: "NS",
        content: "[ '${1:NUMBER_VALUE_1}', '${2:NUMBER_VALUE_2}', ${3: }]"
      }, {
        name: "BS",
        tabTrigger: "BS",
        content: "[ '${1:BASE64_ENCODED_STRING_1}', '${2:BASE64_ENCODED_STRING_2}', ${3: }]"
      }, {
        name: "batchGetItem",
        tabTrigger: "batchGetItem",
        content: "var params = {\n    RequestItems: { // map of TableName to list of Key to get from each table\n        ${1:table_name_1}: {\n            Keys: [ // a list of primary key value maps\n                {\n                    key_attribute_name: 'STRING_VALUE',\n                    // ... more key attributes, if the primary key is hash/range\n                },\n                // ... more keys to get from this table ...\n            ],\n            AttributesToGet: [ // option (attributes to retrieve from this table)\n                'attribute_name',\n                // ... more attribute names ...\n            ],\n            ConsistentRead: false, // optional (true | false)\n        },\n        // ... more tables and keys ...\n    },\n    ReturnConsumedCapacity: 'NONE', // optional (NONE | TOTAL | INDEXES)\n};\ndocClient.batchGet(params, function(err, data) {\n    if (err) ppJson(err); // an error occurred\n    else ppJson(data); // successful response\n\n});"
      }, {
        name: "Keys",
        tabTrigger: "Keys",
        content: "Keys: [ // a list of primary key value maps\n    {\n        key_attribute_name: { S: 'STRING_VALUE' },\n        // ... more key attributes, if the primary key is hash/range\n    },\n    // ... more keys to get from this table ...\n],"
      }, {
        name: "batchWriteItem",
        tabTrigger: "batchWriteItem",
        content: "var params = {\n    RequestItems: { // A map of TableName to Put or Delete requests for that table\n        ${1:table_name_1}: [ // a list of Put or Delete requests for that table\n            { // An example PutRequest\n                PutRequest: {\n                    Item: { // a map of attribute name to AttributeValue    \n                        attribute_name: 'STRING_VALUE',\n                        // ... more attributes ...\n                    }\n                }\n            },\n            { // An example DeleteRequest\n                DeleteRequest: {\n                    Key: { \n                        key_attribute_name: 'STRING_VALUE',\n                        // more primary attributes (if the primary key is hash/range schema)\n                    }\n                }\n            },\n            // ... more put or delete requests ...\n        ],\n        // ... more tables ...\n    },\n    ReturnConsumedCapacity: 'NONE', // optional (NONE | TOTAL | INDEXES)\n    ReturnItemCollectionMetrics: 'NONE', // optional (NONE | SIZE)\n};\ndynamodb.batchWrite(params, function(err, data) {\n    if (err) ppJson(err); // an error occurred\n    else ppJson(data); // successful response\n});"
      }, {
        name: "RequestItems",
        tabTrigger: "RequestItems",
        content: "RequestItems: { // A map of TableName to Put or Delete requests for that table\n    ${1:table_name_1}: [ // a list of Put or Delete requests for that table\n        { // An example PutRequest\n            PutRequest: {\n                Item: { // a map of attribute name to AttributeValue    \n                    attribute_name: 'STRING_VALUE',\n                    // ... more attributes ...\n                }\n            }\n        },\n        { // An example DeleteRequest\n            DeleteRequest: {\n                Key: { \n                    key_attribute_name: 'STRING_VALUE',\n                    // more primary attributes (if the primary key is hash/range schema)\n                }\n            }\n        },\n        // ... more put or delete requests ...\n    ],\n    // ... more tables ...\n}"
      }, {
        name: "createTable",
        tabTrigger: "createTable",
        content: "var params = {\n    TableName: '${1:table_name}',\n    KeySchema: [ // The type of of schema.  Must start with a HASH type, with an optional second RANGE.\n        { // Required HASH type attribute\n            AttributeName: 'hash_key_attribute_name',\n            KeyType: 'HASH',\n        },\n        { // Optional RANGE key type for HASH + RANGE tables\n            AttributeName: 'range_key_attribute_name', \n            KeyType: 'RANGE', \n        }\n    ],\n    AttributeDefinitions: [ // The names and types of all primary and index key attributes only\n        {\n            AttributeName: 'attribute_name',\n            AttributeType: 'S', // (S | N | B) for string, number, binary\n        },\n        // ... more attributes ...\n    ],\n    ProvisionedThroughput: { // required provisioned throughput for the table\n        ReadCapacityUnits: 0, \n        WriteCapacityUnits: 0, \n    },\n    GlobalSecondaryIndexes: [ // optional (list of GlobalSecondaryIndex)\n        { \n            IndexName: 'index_name_1', \n            KeySchema: [\n                { // Required HASH type attribute\n                    AttributeName: 'hash_key_attribute_name',\n                    KeyType: 'HASH',\n                },\n                { // Optional RANGE key type for HASH + RANGE secondary indexes\n                    AttributeName: 'range_key_attribute_name', \n                    KeyType: 'RANGE', \n                }\n            ],\n            Projection: { // attributes to project into the index\n                ProjectionType: 'ALL', // (ALL | KEYS_ONLY | INCLUDE)\n                NonKeyAttributes: [ // required / allowed only for INCLUDE\n                    'attribute_name_1',\n                    // ... more attribute names ...\n                ],\n            },\n            ProvisionedThroughput: { // throughput to provision to the index\n                ReadCapacityUnits: 0,\n                WriteCapacityUnits: 0,\n            },\n        },\n        // ... more global secondary indexes ...\n    ],\n    LocalSecondaryIndexes: [ // optional (list of LocalSecondaryIndex)\n        { \n            IndexName: 'index_name_2',\n            KeySchema: [ \n                { // Required HASH type attribute - must match the table's HASH key attribute name\n                    AttributeName: 'hash_key_attribute_name',\n                    KeyType: 'HASH',\n                },\n                { // alternate RANGE key attribute for the secondary index\n                    AttributeName: 'range_key_attribute_name', \n                    KeyType: 'RANGE', \n                }\n            ],\n            Projection: { // required\n                NonKeyAttributes: [\n                    'STRING_VALUE',\n                    // ... more items ...\n                ],\n                ProjectionType: 'ALL | KEYS_ONLY | INCLUDE',\n            },\n        },\n        // ... more local secondary indexes ...\n    ],\n};\ndynamodb.createTable(params, function(err, data) {\n    if (err) ppJson(err); // an error occurred\n    else ppJson(data); // successful response\n\n});"
      }, {
        name: "AttributeDefinitions",
        tabTrigger: "AttributeDefinitions",
        content: "AttributeDefinitions: [ // The names and types of all primary and index key attributes only\n    {\n        AttributeName: 'attribute_name',\n        AttributeType: 'S', // (S | N | B) for string, number, binary\n    },\n    // ... more attributes ...\n],"
      }, {
        name: "AttributeDefinition",
        tabTrigger: "AttributeDefinition",
        content: "{\n    AttributeName: 'attribute_name',\n    AttributeType: 'S', // (S | N | B) for string, number, binary\n\n},"
      }, {
        name: "GlobalSecondaryIndex",
        tabTrigger: "GlobalSecondaryIndex",
        content: "{ \n    IndexName: 'index_name', \n    KeySchema: [\n        { // Required HASH type attribute\n            AttributeName: 'hash_key_attribute_name',\n            KeyType: 'HASH',\n        },\n        { // Optional RANGE key type for HASH + RANGE secondary indexes\n            AttributeName: 'range_key_attribute_name', \n            KeyType: 'RANGE', \n        }\n    ],\n    Projection: { // attributes to project into the index\n        ProjectionType: 'ALL', // (ALL | KEYS_ONLY | INCLUDE)\n        NonKeyAttributes: [ // required / allowed only for INCLUDE\n            'attribute_name_1',\n            // ... more attribute names ...\n        ],\n    },\n    ProvisionedThroughput: { // throughput to provision to the index\n        ReadCapacityUnits: 0,\n        WriteCapacityUnits: 0,\n    },\n},"
      }, {
        name: "GlobalSecondaryIndexes",
        tabTrigger: "GlobalSecondaryIndexes",
        content: "GlobalSecondaryIndexes: [ // optional (list of GlobalSecondaryIndex)\n    { \n        IndexName: 'index_name_1', \n        KeySchema: [\n            { // Required HASH type attribute\n                AttributeName: 'hash_key_attribute_name',\n                KeyType: 'HASH',\n            },\n            { // Optional RANGE key type for HASH + RANGE secondary indexes\n                AttributeName: 'range_key_attribute_name', \n                KeyType: 'RANGE', \n            }\n        ],\n        Projection: { // attributes to project into the index\n            ProjectionType: 'ALL', // (ALL | KEYS_ONLY | INCLUDE)\n            NonKeyAttributes: [ // required / allowed only for INCLUDE\n                'attribute_name_1',\n                // ... more attribute names ...\n            ],\n        },\n        ProvisionedThroughput: { // throughput to provision to the index\n            ReadCapacityUnits: 0,\n            WriteCapacityUnits: 0,\n        },\n    },\n    // ... more global secondary indexes ...\n],"
      }, {
        name: "LocalSecondaryIndex",
        tabTrigger: "LocalSecondaryIndex",
        content: "{ \n    IndexName: 'index_name',\n    KeySchema: [ \n        { // Required HASH type attribute - must match the table's HASH key attribute name\n            AttributeName: 'hash_key_attribute_name',\n            KeyType: 'HASH',\n        },\n        { // alternate RANGE key attribute for the secondary index\n            AttributeName: 'range_key_attribute_name', \n            KeyType: 'RANGE', \n        }\n    ],\n    Projection: { // required\n        NonKeyAttributes: [\n            'STRING_VALUE',\n            // ... more items ...\n        ],\n        ProjectionType: 'ALL | KEYS_ONLY | INCLUDE',\n    },\n\n},"
      }, {
        name: "LocalSecondaryIndexes",
        tabTrigger: "LocalSecondaryIndexes",
        content: "LocalSecondaryIndexes: [ // optional (list of LocalSecondaryIndex)\n    { \n        IndexName: 'index_name',\n        KeySchema: [ \n            { // Required HASH type attribute - must match the table's HASH key attribute name\n                AttributeName: 'hash_key_attribute_name',\n                KeyType: 'HASH',\n            },\n            { // alternate RANGE key attribute for the secondary index\n                AttributeName: 'range_key_attribute_name', \n                KeyType: 'RANGE', \n            }\n        ],\n        Projection: { // required\n            NonKeyAttributes: [\n                'STRING_VALUE',\n                // ... more items ...\n            ],\n            ProjectionType: 'ALL | KEYS_ONLY | INCLUDE',\n        },\n    },\n    // ... more local secondary indexes ...\n],"
      }, {
        name: "ProvisionedThroughput",
        tabTrigger: "ProvisionedThroughput",
        content: "ProvisionedThroughput: {\n    ReadCapacityUnits: 0, \n    WriteCapacityUnits: 0, \n},"
      }, {
        name: "KeySchema",
        tabTrigger: "KeySchema",
        content: "KeySchema: [ // The type of of schema.  Must start with a HASH type, with an optional second RANGE.\n    { // Required HASH type attribute\n        AttributeName: 'hash_key_attribute_name',\n        KeyType: 'HASH',\n    },\n    { // Optional RANGE key type\n        AttributeName: 'range_key_attribute_name', \n        KeyType: 'RANGE', \n    }\n],"
      }, {
        name: "deleteItem",
        tabTrigger: "deleteItem",
        content: "var params = {\n    TableName: '${1:table_name}',\n    Key: { // a map of attribute name to AttributeValue for all primary key attributes\n    \n        attribute_name: 'STRING_VALUE',\n        // more attributes...\n\n    },\n    ConditionExpression: 'attribute_exists(attribute_name)', // optional String describing the constraint to be placed on an attribute\n    ExpressionAttributeNames: { // a map of substitutions for attribute names with special characters\n        //'#name': 'attribute name'\n    },\n    ExpressionAttributeValues: { // a map of substitutions for all attribute values\n        //':value': 'VALUE'\n    },\n    ReturnValues: 'NONE', // optional (NONE | ALL_OLD)\n    ReturnConsumedCapacity: 'NONE', // optional (NONE | TOTAL | INDEXES)\n    ReturnItemCollectionMetrics: 'NONE', // optional (NONE | SIZE)\n};\ndocClient.delete(params, function(err, data) {\n    if (err) ppJson(err); // an error occurred\n    else ppJson(data); // successful response\n});"
      }, {
        name: "deleteTable",
        tabTrigger: "deleteTable",
        content: "var params = {\n    TableName: '${1:table_name}',\n};\ndynamodb.deleteTable(params, function(err, data) {\n    if (err) ppJson(err); // an error occurred\n    else ppJson(data); // successful response\n});"
      }, {
        name: "describeTable",
        tabTrigger: "describeTable",
        content: "var params = {\n    TableName: '${1:table_name}',\n};\ndynamodb.describeTable(params, function(err, data) {\n    if (err) ppJson(err); // an error occurred\n    else ppJson(data); // successful response\n});"
      }, {
        name: "describeTables (all)",
        tabTrigger: "describeTables-all",
        content: "dynamodb.listTables().eachPage(function(err, data) {\nif (err) {\n    ppJson(err); // an error occurred\n} else if (data) {\n    for (var i in data.TableNames) {\n        var tableName = data.TableNames[i];\n        var params = {\n            TableName: tableName,\n        };\n        dynamodb.describeTable(params, function(err, data) {\n            if (err) ppJson(err); // an error occurred\n            else ppJson(data); // successful response\n    });\n    }\n}\n});"
      }, {
        name: "getItem",
        tabTrigger: "getItem",
        content: "var params = {\n    TableName: '${1:table_name}',\n    Key: { // a map of attribute name to AttributeValue for all primary key attributes\n    \n        attribute_name: 'STRING_VALUE'\n        // more attributes...\n\n    },\n    AttributesToGet: [ // optional (list of specific attribute names to return)\n        'attribute_name',\n        // ... more attribute names ...\n    ],\n    ConsistentRead: false, // optional (true | false)\n    ReturnConsumedCapacity: 'NONE', // optional (NONE | TOTAL | INDEXES)\n};\ndocClient.get(params, function(err, data) {\n    if (err) ppJson(err); // an error occurred\n    else ppJson(data); // successful response\n});"
      }, {
        name: "getItem (basic)",
        tabTrigger: "getItem-basic",
        content: "var params = {\n    TableName: '${1:table_name}',\n    Key: { // a map of attribute name to AttributeValue for all primary key attributes\n    \n        attribute_name: 'STRING_VALUE'\n        // more attributes...\n\n    },\n    // ... other optional parameters ...\n};\ndocClient.get(params, function(err, data) {\n    if (err) ppJson(err); // an error occurred\n    else ppJson(data); // successful response\n});"
      }, {
        name: "Key",
        tabTrigger: "Key",
        content: "Key: { // a map of attribute name to AttributeValue for all primary key attributes\n\n    attribute_name: { S: 'STRING_VALUE' }\n    // more attributes...\n\n}"
      }, {
        name: "listTables",
        tabTrigger: "listTables",
        content: "var params = {\n    ExclusiveStartTableName: '${1:table_name}', // optional (for pagination, returned as LastEvaluatedTableName)\n    Limit: 0, // optional (to further limit the number of table names returned per page)\n};\ndynamodb.listTables(params, function(err, data) {\n    if (err) ppJson(err); // an error occurred\n    else ppJson(data); // successful response\n\n});"
      }, {
        name: "listTables (all)",
        tabTrigger: "listTables-all",
        content: "dynamodb.listTables().eachPage(function(err, data) {\n    if (err) {\n        ppJson(err); // an error occurred\n    } else if (data) {\n        ppJson(data);\n    }\n});"
      }, {
        name: "listTables (and describe)",
        tabTrigger: "listTables-and-describe",
        content: "dynamodb.listTables().eachPage(function(err, data) {\n    if (err) {\n        ppJson(err); // an error occurred\n    } else if (data) {\n        for (var i in data.TableNames) {\n            var tableName = data.TableNames[i];\n            var params = {\n                TableName: tableName,\n            };\n            dynamodb.describeTable(params, function(err, data) {\n                if (err) ppJson(err); // an error occurred\n                else ppJson(data); // successful response\n            });\n        }\n    }\n});"
      }, {
        name: "putItem",
        tabTrigger: "putItem",
        content: "var params = {\n    TableName: '${1:table_name}',\n    Item: { // a map of attribute name to AttributeValue\n    \n        ${2:attribute_name}: ${3:'STRING_VALUE'}\n        // more attributes...\n    },\n    ConditionExpression: 'attribute_not_exists(attribute_name)', // optional String describing the constraint to be placed on an attribute\n    ExpressionAttributeNames: { // a map of substitutions for attribute names with special characters\n        //'#name': 'attribute name'\n    },\n    ExpressionAttributeValues: { // a map of substitutions for all attribute values\n        //':value': 'VALUE'\n    },\n    ReturnValues: '${6:NONE}', // optional (NONE | ALL_OLD)\n    ReturnConsumedCapacity: '${7:NONE}', // optional (NONE | TOTAL | INDEXES)\n    ReturnItemCollectionMetrics: '${8:NONE}', // optional (NONE | SIZE)\n};\ndocClient.put(params, function(err, data) {\n    if (err) ppJson(err); // an error occurred\n    else ppJson(data); // successful response\n});"
      }, {
        name: "putItem (required only)",
        tabTrigger: "putItem-required",
        content: "var params = {\n    TableName: '${1:table_name}',\n    Item: { // a map of attribute name to AttributeValue\n        \n        attribute_name: 'STRING_VALUE'\n        // more attributes...\n    }\n};\ndocClient.put(params, function(err, data) {\n    if (err) ppJson(err); // an error occurred\n    else ppJson(data); // successful response\n});"
      }, {
        name: "putItem (conditional)",
        tabTrigger: "putItem-conditional",
        content: "var params = {\n    TableName: '${1:table_name}',\n    Item: { // a map of attribute name to AttributeValue\n    \n        attribute_name: { S: 'STRING_VALUE' }\n        // more attributes...\n    },\n    ConditionExpression: 'attribute = :value',\n    ExpressionAttributeValues: {\n        ':value': 'VALUE'\n    },\n    ReturnValues: 'NONE', // optional (NONE | ALL_OLD)\n};\ndocClient.put(params, function(err, data) {\n    if (err) ppJson(err); // an error occurred\n    else ppJson(data); // successful response\n});"
      }, {
        name: "query",
        tabTrigger: "query",
        content: "var params = {\n    TableName: '${1:table_name}',\n    IndexName: 'index_name', // optional (if querying an index)\n    KeyConditionExpression: 'attribute_name = :value', // a string representing a constraint on the attribute\n    ExpressionAttributeNames: { // a map of substitutions for attribute names with special characters\n        //'#name': 'attribute name'\n    },\n    ExpressionAttributeValues: { // a map of substitutions for all attribute values\n      ':value': 'STRING_VALUE'\n    },\n    ScanIndexForward: true, // optional (true | false) defines direction of Query in the index\n    Limit: 0, // optional (limit the number of items to evaluate)\n    ConsistentRead: false, // optional (true | false)\n    Select: 'ALL_ATTRIBUTES', // optional (ALL_ATTRIBUTES | ALL_PROJECTED_ATTRIBUTES | \n                              //           SPECIFIC_ATTRIBUTES | COUNT)\n    AttributesToGet: [ // optional (list of specific attribute names to return)\n        'attribute_name',\n        // ... more attributes ...\n    ],\n    ExclusiveStartKey: { // optional (for pagination, returned by prior calls as LastEvaluatedKey)\n        attribute_name: 'STRING_VALUE',\n        // anotherKey: ...\n\n    },\n    ReturnConsumedCapacity: 'NONE', // optional (NONE | TOTAL | INDEXES)\n};\ndocClient.query(params, function(err, data) {\n    if (err) ppJson(err); // an error occurred\n    else ppJson(data); // successful response\n});"
      }, {
        name: "query (and paginate)",
        tabTrigger: "query-paginate",
        content: "var params = {\n    TableName: '${1:table_name}',\n    KeyConditionExpression: 'attribute_name = :value', // a string representing a constraint on the attribute\n    ExpressionAttributeNames: { // a map of substitutions for attribute names with special characters\n        //'#name': 'attribute name'\n    },\n    ExpressionAttributeValues: { // a map of substitutions for all attribute values\n      ':value': 'STRING_VALUE'\n    },\n};\n\n// A callback that paginates through an entire DynamoDB table\nfunction doQuery(response) {\n    console.log(response.error);\n    if (response.error) ppJson(response.error); // an error occurred\n    else {\n        ppJson(response.data); // successful response\n        \n        // More data.  Keep calling query.\n        if ('LastEvaluatedKey' in response.data) {\n            response.request.params.ExclusiveStartKey = response.data.LastEvaluatedKey;\n            docClient.query(response.request.params)\n                .on('complete', doQuery)\n                .send();\n      } \n    }\n}\n\n// Kick off the query\nconsole.log(\"Starting a Query on the table\");\ndocClient.query(params)\n    .on('complete', doQuery)\n    .send();"
      }, {
        name: "query (basic)",
        tabTrigger: "query-basic",
        content: "var params = {\n    TableName: '${1:table_name}',\n    KeyConditionExpression: 'attribute_name = :value', // a string representing a constraint on the attribute\n    ExpressionAttributeNames: { // a map of substitutions for attribute names with special characters\n        //'#name': 'attribute name'\n    },\n    ExpressionAttributeValues: { // a map of substitutions for all attribute values\n      ':value': 'STRING_VALUE'\n    }\n};\ndocClient.query(params, function(err, data) {\n    if (err) ppJson(err); // an error occurred\n    else ppJson(data); // successful response\n\n});"
      }, {
        name: "KeyConditionExpression",
        tabTrigger: "KeyConditionExpression",
        content: "KeyConditionExpression: 'attribute_name = :value', // a string representing a constraint on the attribute\nExpressionAttributeNames: { // a map of substitutions for attribute names with special characters\n    //'#name': 'attribute name'\n},\nExpressionAttributeValues: { // a map of substitutions for all attribute values\n    ':value': 'STRING_VALUE'\n},"
      }, {
        name: "ConsistentRead",
        tabTrigger: "ConsistentRead",
        content: "ConsistentRead: true,"
      }, {
        name: "scan",
        tabTrigger: "scan",
        content: "var params = {\n    TableName: '${1:table_name}',\n    Limit: 0, // optional (limit the number of items to evaluate)\n    FilterExpression: 'attribute_name = :value', // a string representing a constraint on the attribute\n    ExpressionAttributeNames: { // a map of substitutions for attribute names with special characters\n        //'#name': 'attribute name'\n    },\n    ExpressionAttributeValues: { // a map of substitutions for all attribute values\n        ':value': 'STRING_VALUE'\n    },\n    Select: 'ALL_ATTRIBUTES', // optional (ALL_ATTRIBUTES | ALL_PROJECTED_ATTRIBUTES | \n                              //           SPECIFIC_ATTRIBUTES | COUNT)\n    AttributesToGet: [ // optional (list of specific attribute names to return)\n        'attribute_name',\n        // ... more attributes ...\n    ],\n    ConsistentRead: false, // optional (true | false)\n    Segment: 0, // optional (for parallel scan)\n    TotalSegments: 0, // optional (for parallel scan)\n    ExclusiveStartKey: { // optional (for pagination, returned by prior calls as LastEvaluatedKey)\n        attribute_name: { S: 'STRING_VALUE' },\n        // anotherKey: ...\n    },\n    ReturnConsumedCapacity: 'NONE', // optional (NONE | TOTAL | INDEXES)\n};\ndocClient.scan(params, function(err, data) {\n    if (err) ppJson(err); // an error occurred\n    else ppJson(data); // successful response\n});"
      }, {
        name: "scan (basic)",
        tabTrigger: "scan-basic",
        content: "var params = {\n    TableName: '${1:table_name}',\n};\ndocClient.scan(params, function(err, data) {\n    if (err) ppJson(err); // an error occurred\n    else ppJson(data); // successful response\n});"
      }, {
        name: "scan (and paginate)",
        tabTrigger: "scan-paginate",
        content: "var params = {\n    TableName: '${1:table_name}'\n    // ... other optional parameters like Limit or ScanFilter ...\n};\n\n// A callback that paginates through an entire DynamoDB table\nfunction doScan(response) {\n    if (response.error) ppJson(response.error); // an error occurred\n    else {\n        ppJson(response.data); // successful response\n        \n        // More data.  Keep calling scan.\n        if ('LastEvaluatedKey' in response.data) {\n            response.request.params.ExclusiveStartKey = response.data.LastEvaluatedKey;\n            docClient.scan(response.request.params)\n                .on('complete', doScan)\n                .send();\n      } \n    }\n}\n\n// Kick off the scan\nconsole.log(\"Starting a Scan of the table\");\ndocClient.scan(params)\n    .on('complete', doScan)\n    .send();"
      }, {
        name: "FilterExpression",
        tabTrigger: "FilterExpression",
        content: "FilterExpression: 'attribute_name = :value', // a string representing a constraint on the attribute\nExpressionAttributeNames: { // a map of substitutions for attribute names with special characters\n    //'#name': 'attribute name'\n},\nExpressionAttributeValues: { // a map of substitutions for all attribute values\n    ':value': 'STRING_VALUE'\n},"
      }, {
        name: "updateItem",
        tabTrigger: "updateItem",
        content: "var params = {\n    TableName: '${1:table_name}',\n    Key: { // The primary key of the item (a map of attribute name to AttributeValue)\n\n        attribute_name: 'STRING_VALUE'\n        // more attributes...\n    },\n    UpdateExpression: 'SET attribute_name :value', // String representation of the update to an attribute\n        // SET set-action , ... \n        // REMOVE remove-action , ...  (for document support)\n        // ADD add-action , ... \n        // DELETE delete-action , ...  (previous DELETE equivalent)\n    ConditionExpression: 'attribute_exists(attribute_name)', // optional String describing the constraint to be placed on an attribute\n    ExpressionAttributeNames: { // a map of substitutions for attribute names with special characters\n        //'#name': 'attribute name'\n    },\n    ExpressionAttributeValues: { // a map of substitutions for all attribute values\n        ':value': 'VALUE'\n    },\n    ReturnValues: 'NONE', // optional (NONE | ALL_OLD | UPDATED_OLD | ALL_NEW | UPDATED_NEW)\n    ReturnConsumedCapacity: 'NONE', // optional (NONE | TOTAL | INDEXES)\n    ReturnItemCollectionMetrics: 'NONE', // optional (NONE | SIZE)\n};\ndocClient.update(params, function(err, data) {\n    if (err) ppJson(err); // an error occurred\n    else ppJson(data); // successful response\n});"
      }, {
        name: "updateItem (required)",
        tabTrigger: "updateItem-required",
        content: "var params = {\n    TableName: '${1:table_name}',\n    Key: { // The primary key of the item (a map of attribute name to AttributeValue)\n\n        attribute_name: 'STRING_VALUE'\n        // more attributes...\n    },\n    UpdateExpression: 'SET attribute_name :value', // String representation of the update to an attribute\n        // SET set-action , ... \n        // REMOVE remove-action , ...  (for document support)\n        // ADD add-action , ... \n        // DELETE delete-action , ...  (previous DELETE equivalent)\n    ExpressionAttributeNames: { // a map of substitutions for attribute names with special characters\n        //'#name': 'attribute name'\n    },\n    ExpressionAttributeValues: { // a map of substitutions for all attribute values\n        ':value': 'VALUE'\n    }\n};\ndocClient.update(params, function(err, data) {\n    if (err) ppJson(err); // an error occurred\n    else ppJson(data); // successful response\n});"
      }, {
        name: "updateItem (conditional)",
        tabTrigger: "updateItem-conditional",
        content: "var params = {\n    TableName: '${1:table_name}',\n    Key: { // The primary key of the item (a map of attribute name to AttributeValue)\n\n        attribute_name: 'STRING_VALUE'\n        // more attributes...\n    },\n    UpdateExpression: 'SET attribute_name :value', // String representation of the update to an attribute\n        // SET set-action , ... \n        // REMOVE remove-action , ...  (for document support)\n        // ADD add-action , ... \n        // DELETE delete-action , ...  (previous DELETE equivalent)\n    ConditionExpression: 'attribute_exists(attribute_name)', // optional String describing the constraint to be placed on an attribute\n    ExpressionAttributeNames: { // a map of substitutions for attribute names with special characters\n        //'#name': 'attribute name'\n    },\n    ExpressionAttributeValues: { // a map of substitutions for all attribute values\n        ':value': 'VALUE'\n    },\n    ReturnValues: 'NONE', // optional (NONE | ALL_OLD | UPDATED_OLD | ALL_NEW | UPDATED_NEW)\n};\ndocClient.update(params, function(err, data) {\n    if (err) ppJson(err); // an error occurred\n    else ppJson(data); // successful response\n});"
      }, {
        name: "ConditionExpression",
        tabTrigger: "ConditionExpression",
        content: "ConditionExpression: 'attribute_exists('STRING_VALUE')'// optional String describing the constraint to be placed on an attribute"
      }, {
        name: "UpdateExpression",
        tabTrigger: "UpdateExpression",
        content: "UpdateExpression: 'SET attribute_name :value', // String representation of the update to an attribute\n        // SET set-action , ... \n        // REMOVE remove-action , ...  (for document support)\n        // ADD add-action , ... \n        // DELETE delete-action , ...  (previous DELETE equivalent)"
      }, {
        name: "ExpressionAttributeNames",
        tabTrigger: "ExpressionAttributeNames",
        content: "ExpressionAttributeNames: { // a map of substitutions for attribute names with special characters\n    //'#name': 'attribute name'\n},"
      }, {
        name: "ExpressionAttributeValues",
        tabTrigger: "ExpressionAttributeValues",
        content: "ExpressionAttributeValues: { // a map of substitutions for all attribute values\n    ':value': 'VALUE'\n},"
      }, {
        name: "updateTable",
        tabTrigger: "updateTable",
        content: "var params = {\n    TableName: '${1:table_name}',\n    GlobalSecondaryIndexUpdates: [{ // optional\n            Update: {\n                IndexName: 'index_name',\n                ProvisionedThroughput: {\n                    ReadCapacityUnits: 0, \n                    WriteCapacityUnits: 0,\n                },\n            },\n        },\n        // ... more optional indexes ...\n    ],\n    ProvisionedThroughput: {\n        ReadCapacityUnits: 0,\n        WriteCapacityUnits: 0,\n    },\n};\ndynamodb.updateTable(params, function(err, data) {\n    if (err) ppJson(err); // an error occurred\n    else ppJson(data); // successful response\n});"
      }, {
        name: "updateTable (table throughput)",
        tabTrigger: "updateTable-table",
        content: "var params = {\n    TableName: '${1:table_name}',\n    ProvisionedThroughput: {\n        ReadCapacityUnits: 0,\n        WriteCapacityUnits: 0,\n    },\n};\ndynamodb.updateTable(params, function(err, data) {\n    if (err) ppJson(err); // an error occurred\n    else ppJson(data); // successful response\n});"
      }, {
        name: "updateTable (index throughput)",
        tabTrigger: "updateTable-index",
        content: "var params = {\n    TableName: '${1:table_name}',\n    GlobalSecondaryIndexUpdates: [{ // optional\n            Update: {\n                IndexName: 'index_name',\n                ProvisionedThroughput: {\n                    ReadCapacityUnits: 0, \n                    WriteCapacityUnits: 0,\n                },\n            },\n        },\n        // ... more optional indexes ...\n    ],\n};\ndynamodb.updateTable(params, function(err, data) {\n    if (err) ppJson(err); // an error occurred\n    else ppJson(data); // successful response\n});"
      }, {
        content: "var params = {\n    TableName: '${1:STRING_VALUE}', // required\n};\ndynamodb.waitFor('tableExists', params, function(err, data) {\n    if (err) ppJson(err); // an error occurred\n    else ppJson(data); // successful response\n});",
        name: "waitFor",
        tabTrigger: "waitFor"
      }
    ]
  });

}).call(this);
