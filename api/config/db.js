const MongoClient = require('mongodb').MongoClient;

var url = "mongodb://web_mongo:27017/";

module.exports = {
    'find': (db_params, callback) => {
        MongoClient.connect(url, function (err, db) {
            if (err) throw err;
			console.log(db_params)
            var dbo = db.db(db_params['database']);
            dbo.collection(db_params['collection']).find(db_params['query']).project(db_params['fields']).toArray(function (err, result) {
                if (err) throw err;
                db.close();
                callback(result);
            });
        });
    },
    'findOne': (db_params, callback) => {
        MongoClient.connect(url, function (err, db) {
            if (err) throw err;
			var dbo = db.db(db_params['database']);
            dbo.collection(db_params['collection']).findOne(db_params['query'], function (err, result) {
                if (err) throw err;
                db.close();
                callback(result);
            });
        });
    },
    'insertOne': (db_params, document, callback) => {
        MongoClient.connect(url, function (err, db) {
            if (err) throw err;
            var dbo = db.db(db_params['database']);
            dbo.collection(db_params['collection']).insertOne(document, function (err, result) {
                if (err) throw err;
                db.close();
                callback(result);
            });
        });
    },
    'insertMany': (db_params, documents, callback) => {
        MongoClient.connect(url, function (err, db) {
            if (err) throw err;
            var dbo = db.db(db_params['database']);
            dbo.collection(db_params['collection']).insertMany(documents, function (err, result) {
                if (err) throw err;
                db.close();
                callback(result);
            });
        });
    },
    'updateOne': (db_params, document, callback) => {
        MongoClient.connect(url, function (err, db) {
            if (err) throw err;
            var dbo = db.db(db_params['database']);
            dbo.collection(db_params['collection']).updateOne(db_params['query'], document, function (err, res) {
                if (err) throw err;
                db.close();
                callback(res['result']);
            });
        });
    }
}