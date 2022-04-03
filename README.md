# React-UI-Global

This application provides a convenient web interface and REST API application for interacting with globals.

## Installation

### Docker
The repo is dockerised so you can  clone/git pull the repo into any local directory

```
$ git clone https://github.com/NjekTt/iris-python-dashboards.git
```

Open the terminal in this directory and run:

```
$ docker-compose up -d
```

## Web interface
The web interface allows you to view and create globals. In the web interface, you can generate globals with a given number of lines with random values.

## REST API
Routing is used by Flask Framework to process incoming requests. When a request is received using Python Embedded, methods of the ObjectScript class are called and processed
