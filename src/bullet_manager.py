"""Module to manage the checklist and number of selected checks."""
from bullet import Check, keyhandler
from bullet.charDef import NEWLINE_KEY


# taken from bullet/examples/check.py
class MinMaxCheck(Check):
    """Class to manage the most and least checks that can be made."""

    # pylint: disable=keyword-arg-before-vararg
    def __init__(self, min_selections=0, max_selections=None, *args, **kwargs):
        super().__init__(*args, **kwargs)
        self.min_selections = min_selections
        self.max_selections = max_selections
        if max_selections is None:
            self.max_selections = len(self.choices)

    @keyhandler.register(NEWLINE_KEY)
    # pylint: disable=inconsistent-return-statements
    def accept(self):
        """Function to apply a 'check'."""
        if self.valid():
            return super().accept()

    def valid(self):
        """Function to validate and return all 'checks'."""
        return (
            self.min_selections
            <= sum(1 for c in self.checked if c)
            <= self.max_selections
        )


def get_choices(file_path):
    """Function to load the checklist options."""
    file = open(file_path, "r")
    ret = [line.replace("\n", "") for line in file]
    while "" in ret:
        ret.remove("")
    return ret


def display_checklist(choices):
    """Function to display the checklist to the user."""
    client = MinMaxCheck(
        prompt="Select Everything You Have Done (spacebar)\n"
        + "Press Enter When You Are Done Selecting",
        choices=choices,
        margin=2,
    )
    return client.launch()
