from flask import Flask
from functions.MatchFunctions import getOneMatch, insertOneMatch, updateLastDate, getLastDate
from functions.siteFunctions import getMatches
from bson.json_util import dumps
import json
 
app = Flask('app')

@app.route('/')
def index():
    return dumps(getMatches())


app.run('0.0.0.0', debug=True)
