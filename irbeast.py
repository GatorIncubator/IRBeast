"""main file for irbeast"""

from __future__ import print_function
import sys

from src import arguments
from src import utilities


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
