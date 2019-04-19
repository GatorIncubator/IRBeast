from __future__ import print_function
import boto3

dynamodb = boto3.resource(
    'dynamodb', region_name="us-west-2", endpoint_url="http://localhost:8000"
)

table = dynamodb.create_table(
    TableName="Irb",
    Keyschema=[
        {
            'AttributeName': studentIDNumber,
            'KeyType': 'HASH'
        },
        {
            'AttributeName': name,
            'KeyType': 'sort'
        }
    ]
)
