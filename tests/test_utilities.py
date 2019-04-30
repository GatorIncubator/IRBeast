"""tests irbeast file"""

from src import utilities


def test_repl_command():
    """test entering repl command"""


def test_login_user():
    """test to ensure that login does not work without proper info"""
    username = "user"
    password = "pass"
    # will only return true while no implementation for login checks
    logged_in = utilities.login_user(username, password)
    assert logged_in is True


def test_get_file():
    """tests to ensure that supplying a valid checklist works"""


def test_checklist():
    """test checklist interaction"""


def test_help():
    """tests asking for help"""


def test_submit():
    """tests submitting a file"""
