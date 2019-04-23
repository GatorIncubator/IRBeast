"""Handle checklist arguments"""
import argparse


def parse(args):
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
        "--file", type=str, help="path to the file for the checklist"
    )

    irb_parser.add_argument(
        "--submit", type=str, help="path to the file(s) to submit"
    )

    irb_arguments_finished = irb_parser.parse_args(args)

    return irb_arguments_finished


def is_valid_login(args):
    if args.username is not None and args.password is not None:
        return True
    else:
        return False


def is_valid_file(args):
    if args.file is not None:
        try:
            open(args.file)
        except FileNotFoundError:  # noqa: F821
            print("File Not Found")
            return False
        return True
    return False


def is_valid_submit(args):
    if args.submit is not None:
        try:
            open(args.submit)
        except FileNotFoundError:  # noqa: F821
            print("File Not Found")
            return False
        return True
    return False


def verify(args):
    verified = True
    VALID_LOGIN = False
    if args.login:
        VALID_LOGIN = is_valid_login(args)
    if args.file:
        verified = is_valid_file(args)
    # if args.submit:
    #     verified = is_valid_submit(args)
    return VALID_LOGIN and verified
