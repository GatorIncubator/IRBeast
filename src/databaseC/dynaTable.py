from __future__ import print_function
import boto3

dynamodb = boto3.resource(
    "dynamodb"
)

table = dynamodb.create_table(
    TableName="Irb",
    KeySchema=[
        {"AttributeName": "studentIDNumber", "KeyType": "HASH"},
        {"AttributeName": "major", "KeyType": "RANGE"}
    ],
    AttributeDefinitions=[
        {"AttributeName": "studentIDNumber", "AttributeType": "N"},
        {"AttributeName": "major", "AttributeType": "B"}
    ],
    ProvisionedThroughput={
    "ReadCapacityUnits": 10,
    "WriteCapacityUnits": 10
    }
)
table.meta.client.get_waiter('table_exists').wait(TableName='Irb')
print(table.item_count)
print("Table status:", table.table_status)
