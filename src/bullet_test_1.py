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
        return self.min_selections <= sum(
            1 for c in self.checked if c) <= self.max_selections


client = MinMaxCheck(
    prompt="Select Everything You Have Done\n" +
    "Press Enter When You Are Done Selecting",
    min_selections=0,
    max_selections=2,
    choices=[
        "Question 1: insert text here",
        "Question 2: insert text here",
        "Question 3: insert text here"
    ],
    margin=2
)

result = client.launch()
print(result)

client = MinMaxCheck(
    prompt="Select Everything You Have Done\n" +
    "Press Enter When You Are Done Selecting",
    min_selections=0,
    choices=[
        "New Question 1: insert text here",
        "New Question 2: insert text here",
        "New Question 3: insert text here"
    ],
    margin=2
)

result = client.launch()

print(result)
