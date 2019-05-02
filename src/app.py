"""
The APP module handles functionality for connecting to the
AWS Chalice database.
"""
import os
from chalicelib import db
import boto3
from chalice import Chalice

APP = Chalice(app_name='media-query')

@APP.route('/')
def index():
    return {'hello': 'world'}


def get_media_db():
    """Function to access the media database."""
    # pylint: disable=global-statement
    global _MEDIA_DB
    if _MEDIA_DB is None:
        _MEDIA_DB = db.DynamoMediaDB(
            boto3.resource('dynamodb').Table(
                os.environ['MEDIA_TABLE_NAME']))
    return _MEDIA_DB
