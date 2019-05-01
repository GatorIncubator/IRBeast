"""Handle arguments"""

from __future__ import print_function
import argparse


def parse(args):
    """specifies command line arguments"""
    irb_parser = argparse.ArgumentParser(
        formatter_class=argparse.ArgumentDefaultsHelpFormatter
    )

    irb_parser.add_argument(
        "--login", action="store_true", help="login user to the AWS database"
    )

    irb_parser.add_argument(
        "--username", type=str, help="username to log into AWS database"
    )

    irb_parser.add_argument(
        "--password", type=str, help="password to log into AWS database"
    )

    irb_parser.add_argument(
        "--checklist", action="store_true", help="run the bullet checklist"
    )

    irb_parser.add_argument(
        "--file",
        type=str,
        help="path to the file for the checklist\n" +
        "should be within 'checklists/''"
    )

    irb_parser.add_argument(
        "--submit",
        type=str,
        help="path to the proposal to submit\n" +
        "should be within 'submit/''"
    )

    irb_arguments_finished = irb_parser.parse_args(args)

    return irb_arguments_finished


def is_valid_login(args):
    """checks if login supplied with username and password"""
    return args.username is not None and args.password is not None


def is_valid_file(args):
    """checks if checklist file supplied is valid"""
    if args.file is not None:
        try:
            open("./checklists/" + args.file)
            return True
        except FileNotFoundError:  # noqa: F821
            print("File Not Found")
            return False
    return False


def is_valid_checklist(args):
    """checks if the checklist can be generated"""
    return args.checklist is not False and is_valid_file(args)


def is_valid_submit(args):
    """checks if submission file is valid"""
    if args.submit is not None:
        try:
            open("./submit/" + args.submit)
            return True
        except FileNotFoundError:  # noqa: F821
            print("File Not Found")
            return False
    return False


def verify(args):
    """checks if supplied arguments are valid"""
    valid_login = False
    valid_checklist = True
    valid_file = True
    valid_submit = True
    if args.login:
        valid_login = is_valid_login(args)
    if args.checklist:
        valid_checklist = is_valid_checklist(args)
    if args.file:
        valid_file = is_valid_file(args)
    if args.submit:
        valid_submit = is_valid_submit(args)
    return valid_login and valid_checklist and valid_file and valid_submit
