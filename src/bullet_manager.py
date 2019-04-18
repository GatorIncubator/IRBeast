from bullet import Check, keyhandler
from bullet.charDef import NEWLINE_KEY

from itertools import islice


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


def get_choices(file_path):
    try:
        file = open(file_path,"r")
    except:
        return ["File '"+file_path+"' Not Found"]
    ret = [line.replace("\n","") for line in file]
    while ('' in ret):
        ret.remove("")
    return ret

def create_checklist(choices):
    client = bullet.MinMaxCheck(
        prompt="Select Everything You Have Done\n" +
        "Press Enter When You Are Done Selecting",
        choices=choices,
        margin=2
    )
    return client.launch()

#print(get_choices("../checklists/checklist1.txt"))

# if __name__ == '__main__':
#     file_path = str(input("Enter the path to the checklist\n"))
#     client = MinMaxCheck(
#         prompt="Select Everything You Have Done\n" +
#         "Press Enter When You Are Done Selecting",
#         choices=get_choices(file_path),
#         margin=2
#     )
#     result = client.launch()
#     print(result)
