import sys
import os


import arguments
import bullet_manager
import help_info


COMMANDS = ["file", "logout", "checklist", "submit", "quit", "help"]
LOGGED_IN = False
LOGIN_INFO = {"username": "", "password": ""}
CHECKED = list()


def repl_command():
    args = str(input(" >> ")).lower().split()
    while (all(arg not in COMMANDS for arg in args)):
        print("Command Not Found")
        args = str(input(" >> ")).lower().split()
    return args


def login_user(username, password):
    # TODO Check to ensure valid username and password
    # if not valid username/password:
    #   return False
    # else:
    LOGIN_INFO['username'] = username
    LOGIN_INFO['password'] = password
    return True


def file():
    CHECKLIST_FILE = "../checklists/" + \
        str(input("Enter the name of the checklist file:\n")).strip()
    while not os.path.isfile(CHECKLIST_FILE):
        print("File not Found")
        CHECKLIST_FILE = str(
            input("Enter the path to the checklist file:\n")
        )
    return CHECKLIST_FILE


def checklist(CHECKLIST_FILE):
    choices = list()
    if CHECKLIST_FILE != "":
        choices = bullet_manager.get_choices(CHECKLIST_FILE)
    else:
        print("Please run 'File' to specify the checklist file")
        return
    CHECKED = bullet_manager.display_checklist(choices)
    try:
        f = open("submission_checklist.txt", "x")
    except FileExistsError:  # noqa: F821
        f = open("submission_checklist.txt", "w")
    for item in CHECKED:
        f.write(item + "\n")
    f.close()


def help(args):
    if len(args) == 1:
        help_info.get_help()
    elif len(args) == 2:
        help_info.get_help(args[1])


def submit():
    # Code for checking name of the pdf proposal
    # to ensure correct format
    # Code for uploading to database using user's login info
    print("Submitting Info")


def main():
    LOGGED_IN = False
    CHECKLIST_FILE = ""
    args = arguments.parse(sys.argv[1:])
    # checks to see if there are any command line arguments passed
    # if so skip repl, otherwise launch repl
    if all(
        getattr(args, arg) is None or
        getattr(args, arg) is False for arg in vars(args)
    ):
        print("Welcome to IRBeast")
        # TODO Get login details before entering repl
        while not LOGGED_IN:
            username = str(input("Username: "))
            password = str(input("Password: "))
            LOGGED_IN = login_user(username, password)
        args = repl_command()
        while args[0] != "quit" and LOGGED_IN:
            if args[0] == "file":
                CHECKLIST_FILE = file()
            elif args[0] == "checklist":
                checklist(CHECKLIST_FILE)
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
                args.username, args.password
            ):
                print("Logged In")
                if args.checklist is not None:
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


main()
