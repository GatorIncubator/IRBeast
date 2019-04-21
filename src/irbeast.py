import sys
import os


import arguments
import bullet_manager
import help_info


COMMANDS = ["file", "logout", "checklist", "submit", "quit", "help"]
LOGGED_IN = False
LOGIN_INFO = {"username": "", "password": ""}
CHECKLIST_FILE = ""
CHECKED = list()


def repl_command():
    args = str(input(" >> ")).lower().split()
    while (all(arg not in COMMANDS for arg in args)):
        print("Command Not Found")
        args = str(input(" >> ")).lower().split()
    return args, len(args)


def login_user():
    username = str(input("Username: "))
    password = str(input("Password: "))
    # TODO Check to ensure valid username and password
    # if not valid username/password:
    #   return False
    # else:
    LOGIN_INFO['username'] = username
    LOGIN_INFO['password'] = password
    return True


def main():
    args = arguments.parse(sys.argv[1:])
    if arguments.verify(args):
        print("Welcome to IRBeast")
        # TODO Get login details before entering repl
        LOGGED_IN = login_user()
    else:
        print("Missing Command Line Arguments")
        sys.exit()

    args, n = repl_command()
    while args[0] != "quit" and LOGGED_IN:
        if args[0] == "file":
            CHECKLIST_FILE = "../checklists/" + \
                str(input("Enter the name of the checklist file:\n")).strip()
            while not os.path.isfile(CHECKLIST_FILE):
                print("File not Found")
                CHECKLIST_FILE = str(
                    input("Enter the path to the checklist file:\n")
                )
        elif args[0] == "checklist":
            if CHECKLIST_FILE != "":
                choices = bullet_manager.get_choices(CHECKLIST_FILE)
            else:
                print("Please run 'File' to specify the checklist file")
            CHECKED = bullet_manager.display_checklist(choices)
            print(CHECKED)
        elif args[0] == "logout":
            print("Logging user out")
            LOGGED_IN = False
            while not LOGGED_IN:
                LOGGED_IN = login_user()

        elif args[0] == "submit":
            print("Submitting Info")
            # Code for checking name of the pdf proposal
            # to ensure correct format
            # Code for uploading to database using user's login info
        elif args[0] == "help":
            if n == 1:
                help_info.get_help()
            elif n == 2:
                help_info.get_help(args[1])
        elif args[0] == "quit":
            print("Thank You")
            sys.exit()
        args, n = repl_command()


main()
