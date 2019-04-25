"""manages interactions with bullet package"""

from bullet import Check, keyhandler
from bullet.charDef import NEWLINE_KEY


# taken from bullet/examples/check.py
class MinMaxCheck(Check):
    """Checklist object"""
    # pylint:  disable=W1113
    def __init__(self, min_selections=0, max_selections=None, *args, **kwargs):
        """initializes MinMaxCheck object"""
        super().__init__(*args, **kwargs)
        self.min_selections = min_selections
        self.max_selections = max_selections
        if max_selections is None:
            self.max_selections = len(self.choices)

    @keyhandler.register(NEWLINE_KEY)
    # pylint:  disable=R1710
    def accept(self):
        """checks off checklist item"""
        if self.valid():
            return super().accept()

    def valid(self):
        """returns all selected items"""
        return (
            self.min_selections
            <= sum(1 for c in self.checked if c)
            <= self.max_selections
        )


def get_choices(file_path):
    """parses through supplied checklist file and returns each item"""
    file = open(file_path, "r")
    ret = [line.replace("\n", "") for line in file]
    while "" in ret:
        ret.remove("")
    return ret


def display_checklist(choices):
    """runs the checklist and returns selected items"""
    client = MinMaxCheck(
        prompt="Select Everything You Have Done (spacebar)\n"
        + "Press Enter When You Are Done Selecting",
        choices=choices,
        margin=2,
    )
    return client.launch()
