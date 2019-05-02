"""The IRBeast System."""
import sys
import os


import bullet_manager
import help_info
import arguments
from arguments import is_valid_login


COMMANDS = ["file", "logout", "checklist", "submit", "quit", "help"]
LOGGED_IN = False
LOGIN_INFO = {"username": "", "password": ""}
CHECKED = list()


def repl_command():
    """Function to capture user commands."""
    args = str(input(" >> ")).lower().split()
    while all(arg not in COMMANDS for arg in args):
        print("Command Not Found")
        args = str(input(" >> ")).lower().split()
    return args


def login_user(username, password):
    """Function to check to ensure valid username and password"""
    if not is_valid_login([username, password]):
        return False
    return True


def file():
    """Function to open the checklist file."""
    checklist_file = (
        "../checklists/" + str(input("Name of the checklist file:\n")).strip()
    )
    while not os.path.isfile(checklist_file):
        print("File not Found")
        checklist_file = str(input("Path to the checklist file:\n"))
    return checklist_file


def checklist(checklist_file):
    """Function to manage the checklist."""
    choices = list()
    if checklist_file != "":
        choices = bullet_manager.get_choices(checklist_file)
    else:
        print("Please run 'File' to specify the checklist file")
        return
    # pylint: disable=global-statement
    global CHECKED
    CHECKED = bullet_manager.display_checklist(choices)
    try:
        check_file = open("submission_checklist.txt", "x")
    except FileExistsError:  # noqa: F821
        check_file = open("submission_checklist.txt", "w")
    for item in CHECKED:
        check_file.write(item + "\n")
    check_file.close()


# pylint: disable=redefined-builtin
def help(args):
    """Function to capture and execute help command."""
    if len(args) == 1:
        help_info.get_help()
    elif len(args) == 2:
        help_info.get_help(args[1])


def submit():
    """
    Code for checking name of the pdf proposal to ensure correct format and
    uploading to database using user's login info print("Submitting Info")
    """
    print("Submitting Info")


# pylint: disable=too-many-branches
def main():
    """The main function of the IRBeast program."""
    # pylint: disable=global-statement
    global LOGGED_IN
    LOGGED_IN = False
    checklist_file = ""
    args = arguments.parse(sys.argv[1:])
    # checks to see if there are any command line arguments passed
    # if so skip repl, otherwise launch repl
    if all(
        # pylint: disable=bad-continuation
        getattr(args, arg) is None or getattr(args, arg) is False
        # pylint: disable=bad-continuation
        for arg in vars(args)
    ):
        print("Welcome to IRBeast")
        # Get login details before entering repl
        while not LOGGED_IN:
            username = str(input("Username: "))
            password = str(input("Password: "))
            LOGGED_IN = login_user(username, password)
        args = repl_command()
        while args[0] != "quit" and LOGGED_IN:
            if args[0] == "file":
                checklist_file = file()
            elif args[0] == "checklist":
                checklist(checklist_file)
            elif args[0] == "logout":
                print("Logging user out")
                LOGGED_IN = False
                while not LOGGED_IN:
                    username = str(input("Username: "))
                    password = str(input("Password: "))
                    LOGGED_IN = login_user(username, password)
            elif args[0] == "submit":
                submit()
            elif args[0] == "help":
                help(args)
            elif args[0] == "quit":
                print("Thank You")
                sys.exit()
            args = repl_command()
    else:
        if arguments.verify(args):
            if args.login is not False and login_user(
                # pylint: disable=bad-continuation
                args.username,
                args.password,
            ):
                print("Logged In")
                if args.checklist is not False:
                    if args.file is not None:
                        checklist(args.file)
                    else:
                        print("Please Supply a Checklist File")
                if args.submit is not None:
                    submit()
            else:
                print("Invalid Login Info")
                sys.exit()
        else:
            print("Missing Command Line Arguments")
            sys.exit()


if __name__ == "__main__":
    main()
