# React-UI-Global

This application provides a convenient web interface and REST API application for interacting with globals.

## Installation

### Docker

The repo is dockerised so you can clone/git pull the repo into any local directory

```
$ git clone https://github.com/NjekTt/React-UI-Global
```

Open the terminal in this directory and run:

```
$ docker-compose up -d
```

Then open http://localhost:4000/

Online demo http://mareiznode.teccod.com:4001/

## Web interface

The web interface allows you to view and create globals. In the web interface, you can generate globals with a given number of lines with random values.

## REST API

Routing is used by Flask Framework to process incoming requests. When a request is received using Python Embedded, methods of the ObjectScript class are called and processed

-   [GET] /api/getGlobalData - Returns the elements of the given global. Parameters: name - global name, size - number of global elements (to implement loading and optimization), namespace - namspace where the global is located
-   [POST] /api/generateGlobal - Generates a global with random data. Parameters: globalname - the name of the created global, rowcount - the number of generated elements, namespace - where the global will be created
-   [GET] /api/getRowCountGlobal - Returns the number of global rows. Parameters: name - global name
-   [GET] /api/getAllGlobalList - Returns lists of all globals. Parameters: namespace - namespace where globals are located

## Example

![image](https://user-images.githubusercontent.com/47400570/161452661-6aae3830-468b-415a-b9d1-fa21a68557ef.png)

### Form for creating a global

![image](https://user-images.githubusercontent.com/47400570/161452651-52cc3fd0-b324-4257-9331-4747f3c37ec3.png)
