# COMMANDS = ["file","login","checklist","submit","quit","help"]

FILE_DESCRIPTION = "Allows the user to input the name of the file that " + \
    "contains the checklist to be completed"
LOGIN_DESCRIPTION = "Allows the user to log into the database and check " + \
    "submitted proposals"
CHECKLIST_DESCRIPTION = "Allows the user to fill out the checklist " + \
    "supplied via the 'File' command"
SUBMIT_DESCRIPTION = "Submits the completed checklist and IRB proposal file"
QUIT_DESCRIPTION = "Quits IRBeast"
HELP_DESCRIPTION = "Dislays all possible commands with descriptions or " + \
    "if a command is specified, that specific command"

FILE_INFO = {
    "command_name": "File", "description": FILE_DESCRIPTION
}
LOGIN_INFO = {
    "command_name": "Login", "description": LOGIN_DESCRIPTION
}
CHECKLIST_INFO = {
    "command_name": "Checklist", "description": CHECKLIST_DESCRIPTION
}
SUBMIT_INFO = {
    "command_name": "Submit", "description": SUBMIT_DESCRIPTION
}
QUIT_INFO = {
    "command_name": "Quit", "description": QUIT_DESCRIPTION
}
HELP_INFO = {
    "command_name": "Help", "description": HELP_DESCRIPTION
}


INFO = (
    FILE_INFO,
    LOGIN_INFO,
    CHECKLIST_INFO,
    SUBMIT_INFO,
    QUIT_INFO,
    HELP_INFO
)

INFO_STRINGS = ("file", "login", "checklist", "submit", "quit", "help")


def get_help(command=None):
    if command is None:
        for i in INFO:
            print(
                "Command:", i['command_name'],
                "| Description:", i['description']
            )
    else:
        index = INFO_STRINGS.index(command.lower())
        print(
            "Command:", INFO[index]['command_name'],
            "| Description:", INFO[index]['description']
        )
