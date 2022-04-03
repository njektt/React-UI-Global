from urllib import response
from flask import Flask, request, make_response, jsonify
from flask_cors import CORS
import json
import iris

# init server
app = Flask(__name__)
CORS(app)
classUtils = 'dc.teccod.API.utils'

@app.route('/api/getGlobalData')
def getGlobalData():
    globalName = request.args.get('name')
    size = request.args.get('size')
    namespace = request.args.get('namespace')
    return jsonify(json.loads(iris.cls(classUtils).getGlobalData(globalName, size, namespace))['data'])


@app.route('/api/setNamespace')
def setNamespace():
    return iris.cls(classUtils).setNamespace()


@app.route('/api/generateGlobal',  methods=['GET', 'POST'])
def generateGlobal():
    namespace = request.get_json()['namespace']
    rowcount = request.get_json()['rowcount']
    globalname = request.get_json()['globalname']
    iris.cls(classUtils).generateGlobal(globalname, rowcount, namespace)
    return {'status' : 200}


@app.route('/api/getRowCountGlobal')
def getRowCountGlobal():
    globalName = request.args.get('name')
    return {"count" : iris.cls(classUtils).getRowCount(globalName)}


@app.route('/api/getAllGlobalList')
def getAllGlobalList():
    nameSpace = request.args.get('nameSpace')
    return jsonify(json.loads(iris.cls(classUtils).getGlobalList(nameSpace))['data'])

if __name__ == "__main__":
    app.run_server(host="0.0.0.0", port=8080, debug=True)