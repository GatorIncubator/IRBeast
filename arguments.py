"""Handle checklist arguments"""
import argparse


def parse(args):
    irb_parser = argparse.ArgumentParser(
        formatter_class=argparse.ArgumentDefaultsHelpFormatter
    )

    irbparser.add_argument(
        "--checklists", help="prints checklist items", action="store_true"
    )
    irb_arguments_finished = irb_parser.parse_args(args)
    irb_arguments_finished = []
    return irb_arguments_finished
