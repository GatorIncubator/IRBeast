"""main file for irbeast"""

from __future__ import print_function
import sys

from beast import arguments
from beast import utilities


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
            logged_in = utilities.login_user(username, password)
        args = utilities.repl_command()
        while args[0] != "quit" and logged_in:
            if args[0] == "file":
                checklist_file = utilities.get_file()
            elif args[0] == "checklist":
                utilities.checklist(checklist_file)
            elif args[0] == "logout":
                print("Logging user out")
                logged_in = False
                while not logged_in:
                    username = str(input("Username: "))
                    password = str(input("Password: "))
                    logged_in = utilities.login_user(username, password)
            elif args[0] == "submit":
                utilities.submit()
            elif args[0] == "help":
                help(args)
            elif args[0] == "quit":
                print("Thank You")
                sys.exit()
            args = utilities.repl_command()
    else:
        if arguments.verify(args):
            if args.login is not False and utilities.login_user(
                    args.username, args.password
            ):
                print("Logged In")
                if args.checklist is not False:
                    if args.file is not None:
                        utilities.checklist("./checklists/" + args.file)
                    else:
                        print("Please Supply a Checklist File")
                if args.submit is not None:
                    utilities.submit(args.submit)
            else:
                print("Invalid Login Info")
                sys.exit()
        else:
            print("Missing Command Line Arguments")
            sys.exit()


main()
