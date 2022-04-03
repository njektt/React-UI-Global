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
    direction = request.args.get('direction')
    return jsonify(json.loads(iris.cls(classUtils).getGlobalData(globalName, size, direction))['data'])


@app.route('/api/setNamespace')
def setNamespace():
    return iris.cls(classUtils).setNamespace()


@app.route('/api/generateGlobal',  methods=['GET', 'POST'])
def generateGlobal():
    iris.cls(classUtils).generateGlobal(request.get_json()['globalname'], request.get_json()['rowcount'])
    return {'status' : 200}


@app.route('/api/getRowCountGlobal')
def getRowCountGlobal():
    globalName = request.args.get('name')
    return {"count" : iris.cls(classUtils).getRowCount(globalName)}


@app.route('/api/getAllGlobalList')
def test():
    return jsonify(json.loads(iris.cls(classUtils).getGlobalList())['data'])


@app.route('/api/getGlobalUsageList')
def getGlobalList():
    query = "SELECT * FROM %ExtentMgr.GlobalRegistry"
    data_frame = iris.sql.exec(query).dataframe()
    return (data_frame.to_json(orient="records"))

if __name__ == "__main__":
    app.run_server(host="0.0.0.0", port=8080, debug=True)