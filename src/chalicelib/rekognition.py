"""The RekognitonClient handler."""
import uuid


class RekognitonClient(object):
    """The class that handles the RekognitonClient behavior."""
    def __init__(self, boto3_client):
        """Constructor of the RekognitonClient class."""
        self._boto3_client = boto3_client

    def get_image_labels(self, bucket, key):
        """Function to fetch image labels"""
        response = self._boto3_client.detect_labels(
            Image={"S3Object": {"Bucket": bucket, "Name": key}},
            MinConfidence=50.0,  # noqa: E501
        )
        return [label["Name"] for label in response["Labels"]]

    def start_video_label_job(self, bucket, key, topic_arn, role_arn):
        """Video labelling function."""
        response = self._boto3_client.start_label_detection(
            Video={"S3Object": {"Bucket": bucket, "Name": key}},
            ClientRequestToken=str(uuid.uuid4()),
            NotificationChannel={
                "SNSTopicArn": topic_arn,
                "RoleArn": role_arn,
            },  # noqa: E501
            MinConfidence=50.0,
        )
        return response["JobId"]

    def get_video_job_labels(self, job_id):
        """skrrt"""
        labels = set()
        client_kwargs = {"JobId": job_id}
        response = self._boto3_client.get_label_detection(**client_kwargs)
        self._collect_video_labels(labels, response)
        while "NextToken" in response:
            client_kwargs["NextToken"] = response["NextToken"]
            response = self._boto3_client.get_label_detection(**client_kwargs)
            self._collect_video_labels(labels, response)
        return list(labels)

    def _collect_video_labels(self, labels, response):
        for label in response["Labels"]:
            label_name = label["Label"]["Name"]
            labels.add(label_name)
