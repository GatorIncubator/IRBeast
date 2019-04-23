# IRBeast

![IRBeast](static/beast.png "The IRBeast Logo")

[![Build Status](https://api.travis-ci.com/GatorEducator/IRBeast.svg?branch=master)](https://travis-ci.com/GatorEducator/IRBeast)
[![codecov.io](http://codecov.io/github/GatorEducator/IRBeast/coverage.svg?branch=master)](http://codecov.io/github/GatorEducator/IRBeast?branch=master)
[![made-with-python](https://img.shields.io/badge/Made%20with-Python-orange.svg)](https://www.python.org/)
[![code-style](https://img.shields.io/badge/code%20style-black-000000.svg)](https://github.com/ambv/black)
![license-mit](https://img.shields.io/github/license/GatorEducator/IRBeast.svg)

IRBeast is a software tool developed to help student researchers ensure that they create a successful IRB proposal.
Use this tool to make an awesome IRB proposal document and become an IRBeast!

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
are supplied it will automatically enter the Repl where you will be 
