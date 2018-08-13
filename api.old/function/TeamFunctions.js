let db = require('../config/db');
/* const mongoose = require('mongoose');
const Team = require('../models/Team'); */

let TeamFunctions = {
    'getTeamNames': (season, callback) => {
        db.find({
            database: season,
            collection: 'teams',
            query: {},
            filters: {
                team: 1
            }
        }, function(data){
            callback(data);
        })
    },
    'insertOneTeam': (season, teamName, callback) => {
        db.find({
            database: season,
            collection: 'teams',
            query: {
                "team": teamName
            },
            filters: {}
        }, function (data) {
            if (data.length == 0) {
                let team = {};
                Object.assign(team, Team);
                team['team'] = teamName;
                db.insertOne({
                    database: season,
                    collection: 'teams',
                    query: {},
                    filters: {}
                }, team, function(result){
                    callback();
                })
            }
        });
    },
    'findAllTeams': (season, callback) => {
        db.find({
            database: season,
            collection: 'teams',
            query: {},
            filters: {
                _id: 0,
                __v: 0
            }
        }, function (data) {
            callback(data);
        });
    },
    'findOneTeam': (season, teamName, callback) => {
        db.findOne({
            database: season,
            collection: 'teams',
            query: {
                "team": teamName
            },
            filters: {}
        }, function (data) {
            callback(data);
        });
    },
    'findTwoTeams': (season, teamNames, callback) => {
        db.find({
            database: season,
            collection: 'teams',
            query: {
                $or: [{
                    'team': teamNames[0]
                },
                {
                    'team': teamNames[1]
                }
                ]
            },
            filters: {
                _id: 0,
                __v: 0
            }
        }, function (data) {
            callback(data);
        });
    },
    'updateOneMap': (season, mapData, callback) => {
        if (mapData['map'] != 'other') {
            let update = {}
            update[mapData['map'] + '.rounds.win'] = mapData['roundsWon'];
            update[mapData['map'] + '.rounds.loss'] = mapData['roundsLoss'];
            if (parseInt(mapData['roundsWon']) > parseInt(mapData['roundsLoss'])) {
                update[mapData['map'] + '.maps.win'] = 1;
                update[mapData['map'] + '.maps.loss'] = 0;
            } else {
                update[mapData['map'] + '.maps.win'] = 0;
                update[mapData['map'] + '.maps.loss'] = 1;
            }
            db.updateOne({
                database: season,
                collection: 'teams',
                query: {
                    'team': mapData['teamName']
                },
                filters: {}
            }, {
                    $inc: update
                }, function (data) {
                    callback();
                })
        } else {
            callback();
        }
    }
}

let Team = {
    team: '',
    bazaar: {
        maps: {
            win: 0,
            loss: 0
        },
        rounds: {
            win: 0,
            loss: 0
        }
    },
    cargo: {
        maps: {
            win: 0,
            loss: 0
        },
        rounds: {
            win: 0,
            loss: 0
        }
    },
    downfall: {
        maps: {
            win: 0,
            loss: 0
        },
        rounds: {
            win: 0,
            loss: 0
        }
    },
    quarantine: {
        maps: {
            win: 0,
            loss: 0
        },
        rounds: {
            win: 0,
            loss: 0
        }
    },
    suburbia: {
        maps: {
            win: 0,
            loss: 0
        },
        rounds: {
            win: 0,
            loss: 0
        }
    },
    subway: {
        maps: {
            win: 0,
            loss: 0
        },
        rounds: {
            win: 0,
            loss: 0
        }
    },
    tanker: {
        maps: {
            win: 0,
            loss:  0
        },
        rounds: {
            win: 0,
            loss:  0
        }
    }

}








module.exports = TeamFunctions;