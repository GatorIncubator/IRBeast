from bullet import Check, keyhandler
from bullet.charDef import NEWLINE_KEY


# taken from bullet/examples/check.py
class MinMaxCheck(Check):
    def __init__(self, min_selections=0, max_selections=None, *args, **kwargs):
        super().__init__(*args, **kwargs)
        self.min_selections = min_selections
        self.max_selections = max_selections
        if max_selections is None:
            self.max_selections = len(self.choices)

    @keyhandler.register(NEWLINE_KEY)
    def accept(self):
        if self.valid():
            return super().accept()

    def valid(self):
        return (
            self.min_selections
            <= sum(1 for c in self.checked if c)
            <= self.max_selections
        )


def get_choices(file_path):
    file = open(file_path, "r")
    ret = [line.replace("\n", "") for line in file]
    while "" in ret:
        ret.remove("")
    return ret


def display_checklist(choices):
    client = MinMaxCheck(
        prompt="Select Everything You Have Done (spacebar)\n"
        + "Press Enter When You Are Done Selecting",
        choices=choices,
        margin=2,
    )
    return client.launch()
