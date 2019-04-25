"""main file for irbeast"""

from __future__ import print_function
import sys
import os

from src import arguments
from src import bullet_manager
from src import help_info


COMMANDS = ["file", "logout", "checklist", "submit", "quit", "help"]
LOGIN_INFO = {"username": "", "password": ""}


def repl_command():
    """gets user's input for command and checks against possible commands"""
    args = str(input(" >> ")).lower().split()
    print(args)
    while all(arg not in COMMANDS for arg in args):
        print("Command Not Found")
        args = str(input(" >> ")).lower().split()
    return args


def login_user(username, password):
    """for logging in the user to the data in the future"""
    # need to check to ensure valid username and password
    # if not valid username/password:
    #   return False
    # else:
    LOGIN_INFO["username"] = username
    LOGIN_INFO["password"] = password
    return True


def get_file():
    """code for getting the file that contains the checklist"""
    checklist_file = (
        "./checklists/" + str(
            input("Enter the name of the checklist file:\n")).strip()
    )
    if not os.path.isfile(checklist_file):
        print("File not Found")
        return ""
    return checklist_file


def checklist(checklist_file):
    """runs the bullet checklist with the options specified via file command"""
    choices = list()
    if checklist_file != "":
        choices = bullet_manager.get_choices(checklist_file)
    else:
        print("Please run 'File' to specify the checklist file")
        return
    checked = bullet_manager.display_checklist(choices)
    try:
        file = open("./submit/submission_checklist.txt", "x")
    except FileExistsError:  # noqa: F821
        file = open("./submit/submission_checklist.txt", "w")
    for item in checked:
        file.write(item + "\n")
    file.close()


# pylint: disable=W0622
def help(args):
    """prints out all help info or help for a specific command"""
    if len(args) == 1:
        help_info.get_help()
    elif len(args) == 2:
        help_info.get_help(args[1])


def submit(file_name=None):
    """code for submitting the checklist and IRB proposal"""
    if file_name is None:
        file_name = str(input("Enter the name of the Proposal File:\n"))
    try:
        open("./submit/" + file_name)
    except FileNotFoundError:  # noqa: F821
        print("File Not Found")
        return
    # Code for checking name of the pdf proposal
    # to ensure correct format
    # Code for uploading to database using user's login info
    print("Proposal:", file_name)
    try:
        print(
            "Checklist:\n"
            + "\t"
            + "\t".join(l for l in open("./submit/submission_checklist.txt"))
        )
    except FileNotFoundError:  # noqa: F821
        print("Submission File Not Found, please run 'checklist'")
        return
    if str(input("Submit? (Y/N)\n")).lower() == "y":
        print("Submitting")
    else:
        return


# pylint: disable=R0912
def main():
    """main function"""
    logged_in = False
    checklist_file = ""
    args = arguments.parse(sys.argv[1:])
    # checks to see if there are any command line arguments passed
    # if so skip repl, otherwise launch repl
    if all(
            getattr(args, arg) is None or
            getattr(args, arg) is False
            for arg in vars(args)
    ):
        print("Welcome to IRBeast")
        # Get login details before entering repl
        while not logged_in:
            username = str(input("Username: "))
            password = str(input("Password: "))
            logged_in = login_user(username, password)
        args = repl_command()
        while args[0] != "quit" and logged_in:
            if args[0] == "file":
                checklist_file = get_file()
            elif args[0] == "checklist":
                checklist(checklist_file)
            elif args[0] == "logout":
                print("Logging user out")
                logged_in = False
                while not logged_in:
                    username = str(input("Username: "))
                    password = str(input("Password: "))
                    logged_in = login_user(username, password)
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
            if (args.login is not False and
                    login_user(args.username, args.password)):
                print("Logged In")
                if args.checklist is not False:
                    if args.file is not None:
                        checklist(args.file)
                    else:
                        print("Please Supply a Checklist File")
                if args.submit is not None:
                    submit(args.submit)
            else:
                print("Invalid Login Info")
                sys.exit()
        else:
            print("Missing Command Line Arguments")
            sys.exit()


main()
