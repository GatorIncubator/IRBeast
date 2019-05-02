"""Module provides information about command-line usage."""
# COMMANDS = ["file","logout","checklist","submit","quit","help"]

FILE_DESC = (
    "Allows the user to input the name of the file that "
    + "contains the checklist to be completed"
)
LOGOUT_DESC = "Allows for logging out of the database to switch accounts"
CHECKLIST_DESC = (
    "Allows for filling out the checklist supplied via the 'File' command"
)
SUBMIT_DESC = "Submits the completed checklist and IRB proposal file"
QUIT_DESC = "Quits IRBeast"
HELP_DESC = (
    "Dislays all possible commands with descriptions or "
    + "if a command is specified, that specific command"
)

FILE_INFO = {"command": "File", "desc": FILE_DESC}
LOGOUT_INFO = {"command": "Logout", "desc": LOGOUT_DESC}
LIST_INFO = {"command": "Checklist", "desc": CHECKLIST_DESC}
SUBMIT_INFO = {"command": "Submit", "desc": SUBMIT_DESC}
QUIT_INFO = {"command": "Quit", "desc": QUIT_DESC}
HELP_INFO = {"command": "Help", "desc": HELP_DESC}


INFO = (FILE_INFO, LOGOUT_INFO, LIST_INFO, SUBMIT_INFO, QUIT_INFO, HELP_INFO)

INFO_STRINGS = ("file", "logout", "checklist", "submit", "quit", "help")


def get_help(command=None):
    """Function that displays help information for each command."""
    if command is None:
        for i in INFO:
            print("Command:", i["command"], "| Desc.:", i["desc"], "\n")
    else:
        index = INFO_STRINGS.index(command.lower())
        print(
            "Command:", INFO[index]["command"], "| Desc.:", INFO[index]["desc"]
        )  # noqa: E501
