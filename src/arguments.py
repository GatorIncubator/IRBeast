"""Handle checklist arguments"""
import argparse


def parse(args):
    irb_parser = argparse.ArgumentParser(
        formatter_class=argparse.ArgumentDefaultsHelpFormatter
    )

    irb_parser.add_argument(
        "--login", action="store_true"
    )

    irb_parser.add_argument(
        "--username", type=str, help="username to log into AWS database"
    )

    irb_parser.add_argument(
        "--password", type=str, help="password to log into AWS database"
    )

    irb_parser.add_argument(
        "--checklists", type=str, help="path to file with checklist items")

    irb_arguments_finished = irb_parser.parse_args(args)

    return irb_arguments_finished


def is_valid_login(args):
    if args.username is not None and args.password is not None:
        return True
    else:
        return False


def verify(args):
    verified = True
    if args.login:
        verified = is_valid_login(args)
    return verified
