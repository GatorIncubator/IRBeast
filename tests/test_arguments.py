"""tests command line arguments"""

# pylint: disable=E0401
import pytest

from beast import arguments


@pytest.mark.parametrize(
    "args",
    [
        (["--login"]),
        (["--login", "--username", "user"]),
        (["--login", "--password", "pass"]),
        (
            [
                "--login",
                "--username", "user",
                "--password", "pass",
                "--checklist"
            ]
        ),
        (
            [
                "--login",
                "--username", "user",
                "--password", "pass",
                "--file", "test.txt"
            ]
        ),
        (
            [
                "--login",
                "--username",
                "user",
                "--password",
                "pass",
                "--submit",
                "test.txt",
            ]
        ),
    ],
)
def test_verify(args):
    """checks if there is not a valid command line"""
    parse_args = arguments.parse(args)
    valid_verify = arguments.verify(parse_args)
    assert valid_verify is False


@pytest.mark.parametrize(
    "args",
    [
        (["--login"]),
        (["--login", "--username", "user"]),
        (["--login", "--password", "pass"]),
    ],
)
def test_is_valid_login(args):
    """tests if there is not a valid login"""
    parse_args = arguments.parse(args)
    valid_login = arguments.is_valid_login(parse_args)
    assert valid_login is False


@pytest.mark.parametrize(
    "args", [
        (
            [
                "--login",
                "--username", "user",
                "--password", "pass",
                "--checklist"
            ]
        )
    ]
)
def test_is_valid_checklist(args):
    """tests if there are not valid arguments for checklist"""
    parse_args = arguments.parse(args)
    valid_checklist = arguments.is_valid_checklist(parse_args)
    assert valid_checklist is False


@pytest.mark.parametrize(
    "args",
    [
        (
            [
                "--login",
                "--username", "user",
                "--password", "pass",
                "--file", "test.txt"
            ]
        )
    ],
)
def test_is_valid_file(args):
    """tests if there is not a valid submission file"""
    parse_args = arguments.parse(args)
    valid_submit = arguments.is_valid_file(parse_args)
    assert valid_submit is False


@pytest.mark.parametrize(
    "args",
    [
        (
            [
                "--login",
                "--username", "user",
                "--password", "pass",
                "--submit", "test.txt"
            ]
        )
    ],
)
def test_is_valid_submit(args):
    """tests if there is not a valid submission file"""
    parse_args = arguments.parse(args)
    valid_submit = arguments.is_valid_submit(parse_args)
    assert valid_submit is False
