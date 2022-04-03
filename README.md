# React-UI-Global

This application provides a convenient web interface and REST API application for interacting with globals.

## Installation

### Docker
The repo is dockerised so you can  clone/git pull the repo into any local directory

```
$ git clone https://github.com/NjekTt/React-UI-Global
```

Open the terminal in this directory and run:

```
$ docker-compose up -d
```

Then open http://localhost:4000/

## Web interface
The web interface allows you to view and create globals. In the web interface, you can generate globals with a given number of lines with random values.

## REST API
Routing is used by Flask Framework to process incoming requests. When a request is received using Python Embedded, methods of the ObjectScript class are called and processed

- [GET] /api/getGlobalData - Returns the elements of the given global. Parameters: name - global name, size - number of global elements (to implement loading and optimization)
- [POST] /api/generateGlobal - Generates a global with random data. Parameters: globalname - the name of the created global, rowcount - the number of generated elements.
- [GET] /api/getRowCountGlobal - Returns the number of global rows. Parameters: name - global name
- [GET] /api/getAllGlobalList - Returns lists of all globals
- [GET] /api/getGlobalUsageList - Returns a list of globals from the %ExtentMgr.GlobalRegistry table
