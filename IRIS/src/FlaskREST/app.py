from crypt import methods
from unicodedata import name
from urllib import response
from flask import Flask, request, jsonify
from flask_cors import CORS
import json
import iris

# init server
app = Flask(__name__)
CORS(app)
classUtils = 'dc.teccod.API.utils'
classUtilsDocDB = 'dc.teccod.API.DocDB'

@app.route('/api/getGlobalData')
def getGlobalData():
    return jsonify(json.loads(iris.cls(classUtils).getGlobalData(
        request.args.get('name'),
        request.args.get('size'),
        request.args.get('namespace')
    ))['data'])


@app.route('/api/setNamespace')
def setNamespace():
    return iris.cls(classUtils).setNamespace()


@app.route('/api/generateGlobal', methods=['GET', 'POST'])
def generateGlobal():
    iris.cls(classUtils).generateGlobal(
        request.get_json()['namespace'],
        request.get_json()['rowcount'],
        request.get_json()['globalname']
    )
    return {'status' : 200}


@app.route('/api/getRowCountGlobal')
def getRowCountGlobal():
    return {"count" : iris.cls(classUtils).getRowCount(
        request.args.get('name')
    )}


@app.route('/api/getAllGlobalList')
def getAllGlobalList():
    return jsonify(json.loads(iris.cls(classUtils).getGlobalList(
        request.args.get('nameSpace')
    ))['data'])


@app.route('/api/docdb/createItem', methods=['POST'])
def createItem():
    return iris.cls(classUtilsDocDB).createItem(
        request.get_json()['namespace'],
        request.get_json()['database'],
        request.get_json()['collection'],
        request.get_json()['id'],
        request.get_json()['value']
    )


@app.route('/api/docdb/getStructure', methods=['POST'])
def getStructure():
    return jsonify(json.loads(iris.cls(classUtilsDocDB).getStructure(
        request.get_json()['namespace']
    )))


@app.route('/api/docdb/getDocuments', methods=['POST'])
def getDocuments():
    return json.loads(iris.cls(classUtilsDocDB).getDocuments(
        request.get_json()['database'],
        request.get_json()['collection'],
        request.get_json()['namespace']
    ))


@app.route('/api/docdb/dropDatabase', methods=['POST'])
def dropDatabase():
    iris.cls(classUtilsDocDB).dropDatabase(
        request.get_json()['database'],
        request.get_json()['namespace']
    )
    return {'status' : 200}


@app.route('/api/docdb/dropCollection', methods=['POST'])
def dropCollection():
    iris.cls(classUtilsDocDB).dropCollection(
        request.get_json()['database'],
        request.get_json()['collection'], 
        request.get_json()['namespace']
    )
    return {'status' : 200}


@app.route('/api/docdb/dropDocument', methods=['POST'])
def dropDocument():
    iris.cls(classUtilsDocDB).dropDocument(
        request.get_json()['database'],
        request.get_json()['collection'],
        request.get_json()['id'],
        request.get_json()['namespace']
    )
    return {'status' : 200}


if __name__ == "__main__":
    app.run_server(host="0.0.0.0", port=8080, debug=True)