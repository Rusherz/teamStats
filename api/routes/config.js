let router = require('express').Router();
let MatchFunctions = require('../function/MatchFunctions');
let TeamFunctions = require('../function/TeamFunctions');

/*

    Only used for initalizing the teams database SHOULD NEVER BE CALL OTHER WISE

*/
router.get('/createTeams', (req, res) => {
    MatchFunctions.findAllMatches('season_5_2018', function (data) {
        let count = 0;
        let teamNames = [];
        for (let match of data) {
            if (teamNames.indexOf(match['homeTeam']) == -1 && match['homeTeam'] != undefined && match['homeTeam'] != null && match['homeTeam'] != '' && match['homeTeam'] != 'undefined') teamNames.push(match['homeTeam']);
            if (teamNames.indexOf(match['awayTeam']) == -1 && match['homeTeam'] != undefined && match['homeTeam'] != null && match['homeTeam'] != '' && match['homeTeam'] != 'undefined') teamNames.push(match['awayTeam']);
            count++
            if (count == data.length - 1) {
                let second_count = 0;
                for (let teamName of teamNames) {
                    if (teamName != undefined || teamName != '') {
                        TeamFunctions.insertOneTeam('season_5_2018', teamName, function () {
                            second_count++;
                            if (second_count == teamNames.length - 1) res.send('done');
                        })
                    } else {
                        second_count++;
                        if (second_count == teamNames.length - 1) res.send('done');
                    }
                }
            }
        }
    });
});

/*

    Used all the data from the database and initalizes the team scores. This will add already
    calculated maps into the score.

*/
router.get('/setWinLoss', (req, res) => {
    MatchFunctions.findAllMatches('season_5_2018', function (matches) {
        let count = 0;
        for (let match of matches) {
            if (match['type'] == 'date') continue;
            for (let i = 1; i < 4; i++) {
                let homeTeamMap = {
                    teamName: match['homeTeam'],
                    map: match['map' + i]['mapName'],
                    roundsWon: parseInt(match['map' + i]['scoreHome']),
                    roundsLoss: parseInt(match['map' + i]['scoreAway'])
                }
                let awayTeamMap = {
                    teamName: match['awayTeam'],
                    map: match['map' + i]['mapName'],
                    roundsWon: parseInt(match['map' + i]['scoreAway']),
                    roundsLoss: parseInt(match['map' + i]['scoreHome'])
                }
                TeamFunctions.updateOneMap('season_5_2018', homeTeamMap, function () {
                    TeamFunctions.updateOneMap('season_5_2018', awayTeamMap, function () {
                        if (i == 3) {
                            count++;
                            if (count == matches.length - 1) {
                                res.send('done');
                            }
                        }
                    })
                })
            }
        }
    })
});

module.exports = router;