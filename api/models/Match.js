const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const MatchSchema = new Schema({
    date: {
        type: String,
    },
    homeTeam:{
        type: String,
    },
    awayTeam: {
        type: String,
    },
    encrValue : {
        type: String,
    },
    map1: {
        mapName: {
            type: String,
        },
        scoreHome: {
            type: String,
        },
        scoreAway: {
            type: String,
        }
    },
    map2: {
        mapName: {
            type: String,
        },
        scoreHome: {
            type: String,
        },
        scoreAway: {
            type: String,
        }
    },
    map3: {
        mapName: {
            type: String,
        },
        scoreHome: {
            type: String,
        },
        scoreAway: {
            type: String,
        }
    }
});

const Match = mongoose.model('Match', MatchSchema);

module.exports = Match;