import json
from .db import find, findOne, insertOne, updateOne
from bson.json_util import dumps
import sys
from datetime import datetime


def getOneMatch(homeTeam, awayTeam):
    db_params = {
        'database': 'season_5_2018',
        'collection': 'matches',
        'query': {
            '$or': [
                {'team': homeTeam},
                {'team': awayTeam}
            ]
        }
    }
    match = findOne(db_params)

    return match


def insertOneMatch(season, match):
    db_params = {
        'database': season,
        'collection': 'matches',
        'query': {
            'date': match['date'],
            'homeTeam': match['homeTeam'],
            'awayTeam': match['awayTeam']
        }
    }
    doc = findOne(db_params)
    if doc is None:
        doc = insertOne(db_params, match)
        print("Inserted document " + str(doc), file=sys.stderr)
        return True
    else:
        print("Document existed", file=sys.stderr)
        return False


def updateLastDate(season):
    db_params = {
        'database': season,
        'collection': 'matches',
        'query': {
            'type': 'date'
        }
    }
    date_string = str(datetime.utcnow())
    print("DATE :::::::::", file=sys.stderr)
    print(date_string, file=sys.stderr)
    doc = updateOne(db_params, {
        '$set': {
            'date': date_string
        }
    })
    if doc is not None:
        return date_string
    else:
        print('COULD NOT UPDATE DATE ERROR', file=sys.stderr)
        return False


def getLastDate(season):
    db_params = {
        'database': season,
        'collection': 'matches',
        'query': {
            'type': 'date'
        }
    }
    doc = findOne(db_params)
    return doc
