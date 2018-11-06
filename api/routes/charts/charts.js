const router = require("express").Router();

const WebFunctions = require('../shared/WebFunctions');
const MatchFunctions = require('../shared/MatchFunctions');
const TeamFunctions = require('../shared/TeamFunctions');
const SeasonFunctions = require('../shared/SeasonFunctions');

const overTime = require("./chartTypes/overTime");
const winLoss = require("./chartTypes/winLoss");
const sideWin = require("./chartTypes/sideWin");

router.use('/winloss', winLoss);
router.use('/overtime', overTime);
router.use('/sidewin', sideWin);

router.route('/').get((req, res) => {
	WebFunctions.getMatches().then(() => {
		return WebFunctions.getAllMatchInfo();
	}).then((matches) => {
		return Promise.all(matches.map(match => MatchFunctions.insertOneMatch(match)));
	}).then(() => {
		return SeasonFunctions.findCurrentSeason();
	}).then((season) => {
		TeamFunctions.resetTeamWinLoss(season['season']).then(() => {
			if (season['endDate'] == null) season['endDate'] = new Date().toISOString();
			let query = {
				'$and': [{
						date: {
							$gte: season['startDate']
						}
					},
					{
						date: {
							$lte: season['endDate']
						}
					}
				]
			}
			MatchFunctions.findAllMatches(query).then(matches => {
				let maps = [];
				for (let index in matches) {
					for (let i = 1; i < 4; i++) {
						maps.push({
							teamName: matches[index]['homeTeam'],
							map: matches[index]['map' + i]['mapName'],
							roundsWon: matches[index]['map' + i]['scoreHome'],
							roundsLoss: matches[index]['map' + i]['scoreAway']
						});
						maps.push({
							teamName: matches[index]['awayTeam'],
							map: matches[index]['map' + i]['mapName'],
							roundsWon: matches[index]['map' + i]['scoreAway'],
							roundsLoss: matches[index]['map' + i]['scoreHome']
						});
					}
				}
				return Promise.all(maps.map(map => {
					TeamFunctions.updateOneMap(map, season['season'])
				}));
			})
		});
	}).then(() => {
		res.send('done');
	}).catch((err) => {
		res.send(err);
	});
});

router.route('/allTeamNames').get((req, res) => {
	TeamFunctions.getTeamNames(req.query.season).then((teams) => {
		res.json(teams);
	});
});

router.route('/teams').get((req, res) => {
	let all_teams = [];
	WebFunctions.getTeams().then((teams) => {
		for (let team of teams) {
			if (all_teams.indexOf(team) == -1) all_teams.push(team);
			if (all_teams.indexOf(team) == -1) all_teams.push(team);
		}
		return;
	}).then(() => {
		MatchFunctions.findAllMatches().then(matches => {
			for (let match of matches) {
				if (all_teams.indexOf(match['homeTeam']) == -1) {
					all_teams.push(match['homeTeam']);
				}
				if (all_teams.indexOf(match['awayTeam']) == -1) {
					all_teams.push(match['awayTeam']);
				}
			}
			return;
		});
	}).then(() => {
		return Promise.all(all_teams.map(team => {
			TeamFunctions.insertOneTeam(team, 'Season 5 2018')
		}));
	}).then(() => {
		res.send('done');
	}).catch((err) => {
		res.send(err);
	});
});

router.route('/setwinloss').get((req, res) => {
	let season = req.query.season.replace('"', '').replace('"', '')
	SeasonFunctions.findSeason(season).then(result => {
		TeamFunctions.resetTeamWinLoss(result['season']).then(() => {
			if (result['endDate'] == null) result['endDate'] = new Date().toISOString();
			let query = {
				'$and': [{
						date: {
							$gte: result['startDate']
						}
					},
					{
						date: {
							$lte: result['endDate']
						}
					}
				]
			}
			return MatchFunctions.findAllMatches(query);
		}).then(matches => {
			let maps = [];
			for (let index in matches) {
				for (let i = 1; i < 4; i++) {
					maps.push({
						teamName: matches[index]['homeTeam'],
						map: matches[index]['map' + i]['mapName'],
						roundsWon: matches[index]['map' + i]['scoreHome'],
						roundsLoss: matches[index]['map' + i]['scoreAway']
					});
					maps.push({
						teamName: matches[index]['awayTeam'],
						map: matches[index]['map' + i]['mapName'],
						roundsWon: matches[index]['map' + i]['scoreAway'],
						roundsLoss: matches[index]['map' + i]['scoreHome']
					});
				}
			}
			return Promise.all(maps.map(map => {
				TeamFunctions.updateOneMap(map, season)
			}));
		}).then(() => {
			res.send('done');
		})
	}).catch((err) => {
		res.send({
			error: err
		});
	});
});

/* router.route('/createseason').get((req, res) => {
	let season5_data = {
		season: 'Season 5 2018',
		startDate: new Date(2018, 5, 25).toISOString(),
		endDate: new Date(2018, 7, 31).toISOString()
	}
	SeasonFunctions.insertOneSeason(season5_data).then(result => {
		res.send(result);
	});
}); */

module.exports = router;