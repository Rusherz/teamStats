const db = require('../shared/db');

let MatchFunctions = {
    'insertOneMatch': (season, match, callback) => {
        db.find({
            database: season,
            collection: 'matches',
            query: {
                'date': match['date'],
                'homeTeam': match['homeTeam'],
                'awayTeam': match['awayTeam']
            },
            fields: {}
        }, function (data) {
            if (data.length == 0) {
                db.insertOne({
                    database: season,
                    collection: 'matches',
                    query: {},
                    fields: {}
                }, match, function () {
                    callback(true);
                })
            } else {
                callback(false);
            }
        });
    },
    'updateLastDate': (season, callback) => {
        let date = new Date(new Date().toUTCString());
        db.updateOne({
            database: season,
            collection: 'matches',
            query: {
                type: "date"
            },
            fields: {
                _id: 0,
                __v: 0
            }
        }, {
            $set: {
                date: date
            }
        }, function (data) {
            callback(date);
        })
    },
    'getLastUpdated': (season, callback) => {
        db.findOne({
            database: season,
            collection: 'matches',
            query: {
                type: "date"
            },
            fields: {
                _id: 0,
                __v: 0
            }
        }, function (data) {
            callback(data);
        })
    },
    'findAllMatches': (season) => {
        return new Promise((resolve, reject) => {
            let db_params = {
                database: season,
                collection: 'matches',
                query: {
                    homeTeam: {
                        '$exists': true
                    }
                },
                fields: {
                    _id: 0,
                    map1: 1,
                    map2: 1,
                    map3: 1
                }
            }
            db.find(db_params, function (data) {
                resolve(data);
            })
        })
    },
    'fineOneTeamMatches': (teamName, callback) => {
        db.find('matches', 'matches', {
            $or: [{
                'homeTeam': teamName
            }, {
                'awayTeam': teamName
            }]
        }, {}, function (data) {
            callback(data);
        });
    },
    'findOneMatch': (teamA, teamB, callback) => {
        db.find('matches', 'matches', {
            $or: [{
                    'homeTeam': teamA,
                    'awayTeam': teamB
                },
                {
                    'homeTeam': teamB,
                    'awayTeam': teamA
                }
            ]
        }, {
            _id: 0,
            __v: 0
        }, function (data) {
            callback(data);
        });
    }
}

module.exports = MatchFunctions;