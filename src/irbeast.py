import sys
import os


import arguments
import bullet_manager
import help_info


COMMANDS = ["file", "login", "checklist", "submit", "quit", "help"]
CHECKLIST_FILE = ""
CHECKED = list()


def repl_command():
    args = str(input(" >> ")).lower().split()
    while (all(arg not in COMMANDS for arg in args)):
        print("Command Not Found")
        args = str(input(" >> ")).lower().split()
    return args, len(args)


def main():
    args = arguments.parse(sys.argv[1:])
    if arguments.verify(args):
        print("Welcome to IRBeast")
    else:
        print("Missing Command Line Arguments")
        sys.exit()

    args, n = repl_command()
    while args[0] != "quit":
        if args[0] == "file":
            CHECKLIST_FILE = str(
                input("Enter the path to the checklist file:\n")
            )
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
        elif args[0] == "login":
            username = str(input("Username: "))
            password = str(input("Password: "))
            print("logging in.........")
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
