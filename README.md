# IRBeast

![IRBeast](static/beast.png "The IRBeast Logo")

[![Build Status](https://api.travis-ci.com/GatorEducator/IRBeast.svg?branch=master)](https://travis-ci.com/GatorEducator/IRBeast)
[![codecov.io](http://codecov.io/github/GatorEducator/IRBeast/coverage.svg?branch=master)](http://codecov.io/github/GatorEducator/IRBeast?branch=master)
[![made-with-python](https://img.shields.io/badge/Made%20with-Python-orange.svg)](https://www.python.org/)
[![code-style](https://img.shields.io/badge/code%20style-black-000000.svg)](https://github.com/ambv/black)
![license-mit](https://img.shields.io/github/license/GatorEducator/IRBeast.svg)

IRBeast is a software tool developed to help student researchers ensure that they
create a successful IRB proposal. Use this tool to make an awesome IRB proposal
document and become an IRBeast!

## Installing IRBeast

As a Python 3 program, GatorGrader relies on
[Pipenv](https://github.com/pypa/pipenv) for the installation of the libraries
on which it depends and the creation of the virtual environments in which it
runs. You may skip the *Dependencies* subsection if you have Python 3 and Pipenv
installed. You should also ensure that you have installed Git on your computer
and that you can run Git commands in a terminal window. Then, you can type the
following command in your terminal window to clone GatorGrader's GitHub
repository:

```
git clone https://github.com/GatorEducator/IRBeast.git
```

### Dependencies

Python comes pre-installed on many different distributions, and is available as
a package on most systems. However, there are certain features you might want
to use that are not available on your distro’s package. Simply google `python
download` for your OS or follow the download and installation instructions on
[the Python website](https://www.python.org/).

[Pipenv](https://github.com/pypa/pipenv) is used by GatorGrader to create a
virtual environment, install and manage packages, and run Python commands. To
learn how to install and use Pipenv, please refer to the [Pipenv
Documentation](https://pipenv.readthedocs.io/en/latest/install/)

## Running IRBeast

IRBeast can be run via command line arguments or through the built it Repl system.
To run it for either method use the command `python3 IRBeast.py`. If no arguments
are supplied it will automatically enter the Repl where you will be asked to login
to the server, specify the file to generate a checklist from, check off items in
the checklist, and submit the files. The commands for theses are are `file`,
`checklist`, and `submit` respectively.

### Running from the command line

IRBeast can also be run using the following command line arguments.

### Arguments

* `--login`: This argument is required for all operations and requires the
  arguments `--username` and `--password` arguments to be supplied as well. Each
  of these arguments should be followed by the user's username and password
  respectively.

* `--file`: Argument for specifying the text file that contains the items for the
  checklist. The checklist should stored be within `checklists/`.

* `--checklist`: Launches the Bullet checklist, item selection is performed using
  `space bar` while the item is highlighted and `Enter` is used to specify the end
  of selection. All selected items are saved inside a file within `checklists/`
  called `submission_checklist.txt`

* `--submit`: Uploads the supplied filenames to the server for evaluation and
  possible submission.

## Testing IRBeast

To run the test suite for IRBeast use the command `pipenv run pytest tests`. All
code follows the flake8, pylint, and black style guides and to ensure that any
code written adheres to these standards use the commands `pipenv run <style>`
where `<style>` is replaced by whatever style guide you wish to check against.
