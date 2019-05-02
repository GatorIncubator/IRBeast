import os
from chalicelib import db
import boto3
from chalice import Chalice

app = Chalice(app_name='media-query')

@app.route('/')
def index():
    return {'hello': 'world'}


def get_media_db():
    global _MEDIA_DB
    if _MEDIA_DB is None:
        _MEDIA_DB = db.DynamoMediaDB(
            boto3.resource('dynamodb').Table(
                os.environ['MEDIA_TABLE_NAME']))
    return _MEDIA_DB
