"""
The APP module handles functionality for connecting to the
AWS Chalice database.
"""
import os
import boto3
from chalice import Chalice
from chalicelib import db

_MEDIA_DB = None
APP = Chalice(app_name="media-query")


@APP.route("/")
def index():
    """Index function of app, to be deprecated."""
    return {"hello": "world"}


def get_media_db():
    """Function to access the media database."""
    # pylint: disable=global-statement
    global _MEDIA_DB
    if _MEDIA_DB is None:
        _MEDIA_DB = db.DynamoMediaDB(
            boto3.resource("dynamodb").Table(os.environ["MEDIA_TABLE_NAME"])
        )
    return _MEDIA_DB
