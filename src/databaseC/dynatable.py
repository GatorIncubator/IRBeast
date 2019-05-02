"""Wrapper for launching the dynamodb"""
from __future__ import print_function
import boto3

DYNAMODB = boto3.resource("dynamodb")

TABLE = DYNAMODB.create_table(
    TableName="Irb",
    KeySchema=[
        {"AttributeName": "studentIDNumber", "KeyType": "HASH"},
        {"AttributeName": "major", "KeyType": "RANGE"}
        # {"AttributeName": "projectName", "KeyType": "HASH"}
    ],
    AttributeDefinitions=[
        {"AttributeName": "studentIDNumber", "AttributeType": "N"},
        {"AttributeName": "major", "AttributeType": "B"}
        # {"AttributeName": "projectName", "KeyType": "HASH"}
    ],
    ProvisionedThroughput={"ReadCapacityUnits": 10, "WriteCapacityUnits": 10},
)
TABLE.meta.client.get_waiter("table_exists").wait(TableName="Irb")
print(TABLE.item_count)
print("Table status:", TABLE.table_status)
