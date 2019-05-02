"""Module for handling database integration"""
from boto3.dynamodb.conditions import Attr


IMAGE_TYPE = "image"
VIDEO_TYPE = "video"


class DynamoMediaDB():
    """The Dynamo media object"""
    def __init__(self, table_resource):
        """Constructor for DynamoMediaDB"""
        self._table = table_resource

    def list_media_files(self, startswith=None, media_type=None, label=None):
        """List media files in Dynamo DB"""
        scan_params = {}
        filter_expression = None
        if startswith is not None:
            filter_expression = self._add_to_filter_expression(
                filter_expression, Attr("name").begins_with(startswith)
            )
        if media_type is not None:
            filter_expression = self._add_to_filter_expression(
                filter_expression, Attr("type").eq(media_type)
            )
        if label is not None:
            filter_expression = self._add_to_filter_expression(
                filter_expression, Attr("labels").contains(label)
            )
        if filter_expression:
            scan_params["FilterExpression"] = filter_expression
        response = self._table.scan(**scan_params)
        return response["Items"]

    def add_media_file(self, name, media_type, labels=None):
        """Add media file to dynamo db"""
        if labels is None:
            labels = []
        self._table.put_item(
            Item={"name": name, "type": media_type, "labels": labels}
        )  # noqa: E501

    def get_media_file(self, name):
        """Return a media file in the dynamo db"""
        response = self._table.get_item(Key={"name": name})
        return response.get("Item")

    def delete_media_file(self, name):
        """Delete a media file in the dynamo db"""
        self._table.delete_item(Key={"name": name})

    # pylint: disable=no-self-use
    def _add_to_filter_expression(self, expression, condition):
        """Add a label to a filter expression"""
        if expression is None:
            return condition
        return expression, condition
