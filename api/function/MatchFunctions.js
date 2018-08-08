const db = require('../config/db');/* 
const mongoose = require('mongoose');
const Match = require('../models/Match'); */
const date_id = "5b64ba4fe0e7bdff24546a46";

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
            filters: {}
        }, function (data) {
            if (data.length == 0) {
                db.insertOne({
                    database: season,
                    collection: 'matches',
                    query: {},
                    filters: {}
                }, match, function () {
                    callback(true);
                })
            } else {
                callback(false);
            }
        });
    },
    'updateLastDate': (season, callback) => {
        db.updateOne({
            database: season,
            collection: 'matches',
            query: {
                type: "date"
            },
            filters: {
                _id: 0,
                __v: 0
            }
        }, {
                $set: {
                    DATE: new Date().toUTCString()
                }
            }, function (data) {
                callback(data);
            })
    },
    'getLastUpdated': (season, callback) => {
        db.findOne({
            database: season,
            collection: 'matches',
            query: {
                type: "date"
            },
            filters: {
                _id: 0,
                __v: 0
            }
        }, function (data) {
            callback(data);
        })
    },
    'findAllMatches': (season, callback) => {
        console.log("HERE :::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::")
        db.find({
            database: season,
            collection: 'matches',
            query: {},
            filters: {
                _id: 0,
                __v: 0
            }
        }, function (data) {
            callback(data);
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