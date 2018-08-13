from pymongo import MongoClient
import json

url = "mongodb://web_mongo:27017/"


def find(db_params):
    client = MongoClient(url)
    db = client[db_params['database']]
    collection = db[db_params['collection']]
    docs = collection.find(db_params['query'], {'_id': False})
    client.close()
    return docs


def findOne(db_params):
    client = MongoClient(url)
    db = client[db_params['database']]
    collection = db[db_params['collection']]
    doc = collection.find_one(db_params['query'])
    client.close()
    return doc


def insertOne(db_params, document):
    client = MongoClient(url)
    db = client[db_params['database']]
    collection = db[db_params['collection']]
    doc = collection.insert_one(document)
    client.close()
    return doc.inserted_id


def updateOne(db_params, document):
    client = MongoClient(url)
    db = client[db_params['database']]
    collection = db[db_params['collection']]
    doc = collection.update_one(db_params['query'], document)
    client.close()
    return doc
