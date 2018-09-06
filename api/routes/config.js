let router = require('express').Router();
let MatchFunctions = require('../function/MatchFunctions');
let TeamFunctions = require('../function/TeamFunctions');
let request = require('request');
let cheerio = require('cheerio');
/*

    Only used for initalizing the teams database SHOULD NEVER BE CALL OTHER WISE

*/
router.get('/createTeams', (req, res) => {
    request.get('https://vrmasterleague.com/Onward/Standings.aspx/d3JZU1F5WlVraGc90?rankMin=1', function (err, result, body) {
        let $ = cheerio.load(body);
        let string = ''
        let count = 0;
        let num_matches = $('#Standings_StandingsNode .standings_table tbody tr').length;
        $('#Standings_StandingsNode .standings_table tbody tr').each((index, element) => {
            TeamFunctions.insertOneTeam('season_6_2018', $(element).find('.team_cell').text(), function () {
                count++;
                if (count == num_matches - 1) {
                    res.send('done')
                }
            })
        });
    });
});

/*

    Used all the data from the database and initalizes the team scores. This will add already
    calculated maps into the score.

*/
router.get('/setWinLoss', (req, res) => {
    MatchFunctions.findAllMatches('season_6_2018', function (matches) {
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
                TeamFunctions.updateOneMap('season_6_2018', homeTeamMap, function () {
                    TeamFunctions.updateOneMap('season_6_2018', awayTeamMap, function () {
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