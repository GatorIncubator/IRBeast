import sys

import arguments
import bullet_manager

COMMANDS = ["file","login","checklist","submit","quit"]
CHECKLIST_FILE = ""

args = arguments.parse(sys.argv[1:])


def repl_command():
    arg = str(input(" >> ")).lower().split()
    return args, len(args)

def main():
    if arguments.verify(args):
        print("Welcome to IRBeast")
    else:
        print("Missing Command Line Arguments")
        sys.exit()


    arg = repl_command()
    while args[0] is not "quit":
        if args[0] is "file":
            CHECKLIST_FILE = str(input("Enter the path to the checklist file"))
        elif args[0] is "checklist":
            if CHECKLIST_FILE is not "":
                choices = bullet.get_choices(CHECKLIST_FILE)
            else:
                print("Please run the 'File' command to specify the checklist file")
            bullet.create_checklist(choices)
        elif args[0] is "quit":
            print("Thank You")
            sys.exit()
        args = repl_command()


main()
