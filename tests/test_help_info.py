"""tests help_info file"""


from src import help_info


def test_get_help(capsys):
    """test output of basic help command"""
    expected_output = (
        "Command: File | Description: Allows the user to input the name " +
        "of the file that contains the checklist to be completed \n\n" +
        "Command: Logout | Description: Allows the user to logout of the " +
        "database to switch accounts \n\n" +
        "Command: Checklist | Description: Allows the user to fill out the " +
        "checklist supplied via the 'File' command \n\n" +
        "Command: Submit | Description: Submits the completed checklist and " +
        "IRB proposal file \n\n" +
        "Command: Quit | Description: Quits IRBeast \n\n" +
        "Command: Help | Description: Dislays all possible commands with " +
        "descriptions or if a command is specified, that specific command \n\n"
    )
    help_info.get_help()
    test_output = capsys.readouterr()
    assert test_output.out == expected_output


def test_get_help_file(capsys):
    """test output of file help command"""
    expected_output = (
        "Command: File | Description: Allows the user to input the name of "
        + "the file that contains the checklist to be completed\n"
    )
    help_info.get_help("file")
    test_output = capsys.readouterr()
    assert test_output.out == expected_output


def test_get_help_logout(capsys):
    """test output of logout help command"""
    expected_output = (
        "Command: Logout | Description: Allows the user to logout of the "
        + "database to switch accounts\n"
    )
    help_info.get_help("logout")
    test_output = capsys.readouterr()
    assert test_output.out == expected_output


def test_get_help_checklist(capsys):
    """test output of checklist help command"""
    expected_output = (
        "Command: Checklist | Description: Allows the user to fill out the "
        + "checklist supplied via the 'File' command\n"
    )
    help_info.get_help("checklist")
    test_output = capsys.readouterr()
    assert test_output.out == expected_output


def test_get_help_submit(capsys):
    """test output of submit help command"""
    expected_output = (
        "Command: Submit | Description: Submits the completed checklist "
        + "and IRB proposal file\n"
    )
    help_info.get_help("submit")
    test_output = capsys.readouterr()
    assert test_output.out == expected_output


def test_get_help_quit(capsys):
    """test output of quit help command"""
    expected_output = "Command: Quit | Description: Quits IRBeast\n"
    help_info.get_help("quit")
    test_output = capsys.readouterr()
    assert test_output.out == expected_output


def test_get_help_help(capsys):
    """test output of help help command"""
    expected_output = (
        "Command: Help | Description: Dislays all possible commands with "
        + "descriptions or if a command is specified, that specific command\n"
    )
    help_info.get_help("help")
    test_output = capsys.readouterr()
    assert test_output.out == expected_output
