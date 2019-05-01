"""
The APP module handles functionality for connecting to the
AWS Chalice database.
"""
import os

import boto3
from chalice import Chalice
from chalicelib import db
from chalicelib import rekognition

APP = Chalice(app_name="IRBeast")

_MEDIA_DB = None
_RK_CLIENT = None


@APP.route("/")
def index():
    """Function acting in the root directory."""
    return {"hello": "world"}


@APP.route("/hello")
def hello_workshop():
    """Function acting in the ~/hello/ directory"""
    return {"hello": "workshop"}


def get_media_db():
    """Function to access the media database."""
    # pylint: disable=global-statement
    global _MEDIA_DB
    if _MEDIA_DB is None:
        _MEDIA_DB = db.DynamoMediaDB(
            boto3.resource("dynamodb").Table(os.environ["Irb"])
        )
    return _MEDIA_DB


def get_rk_client():
    """Function to access the RK Client"""
    # pylint: disable=global-statement
    global _RK_CLIENT
    if _RK_CLIENT is None:
        _RK_CLIENT = rekognition.RekognitonClient(boto3.client("rekognition"))
    return _RK_CLIENT


@APP.lambda_function()
def detect_labels_on_image(event):
    """Function to detect the labels on an image"""
    bucket = event["Bucket"]
    key = event["Key"]
    labels = get_rk_client().get_image_labels(bucket=bucket, key=key)
    get_media_db().add_media_file(key, media_type=db.IMAGE_TYPE, labels=labels)


# The view function above will return {"hello": "world"}
# whenever you make an HTTP GET request to '/'.
#
# Here are a few more examples:
#
# @APP.route('/hello/{name}')
# def hello_name(name):
#    # '/hello/james' -> {"hello": "james"}
#    return {'hello': name}
#
# @APP.route('/users', methods=['POST'])
# def create_user():
#     # This is the JSON body the user sent in their POST request.
#     user_as_json = APP.current_request.json_body
#     # We'll echo the json body back to the user in a 'user' key.
#     return {'user': user_as_json}
#
# See the README documentation for more examples.
#
