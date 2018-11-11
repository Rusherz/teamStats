"use strict"
//Team Model
const Team = require("../../models/Team");

let TeamFunctions = {
	'getTeamNames': (season) => {
		return new Promise((resolve, reject) => {
			Team.find({
				season: season
			}, '-_id team', {
					sort: {
						team: 1
					}
				},
				function (err, results) {
					if (err) {
						console.error(err);
						reject(err);
					}
					resolve(results);
				});
		});
	},
	'insertOneTeam': (teamName, season) => {
		return new Promise((resolve, reject) => {
			let query = {
				team: teamName,
				season: season
			}
			Team.find(query, function (err, results) {
				if (err) {
					console.error(err);
					reject(err);
				}
				if (results.length == 0) {
					let team = new Team();
					team['team'] = teamName;
					team['season'] = season;
					team.save(function (err, team) {
						if (err) {
							console.error(err);
							reject(err);
						}
						resolve();
					})
				} else {
					resolve();
				}
			});
		});
	},
	'findAllTeams': (season) => {
		return new Promise((resolve, reject) => {
			Team.find({"season": season}, '-__v -_id', function (err, results) {
				if (err) {
					console.error(err);
					reject(err);
				}
				resolve(results);
			});
		});
	},
	'resetTeamWinLoss': (season) => {
		return new Promise((resolve, reject) => {
			let update = {
				$set: {
					'bazaar.rounds.win': 0,
					'bazaar.rounds.loss': 0,
					'bazaar.maps.win': 0,
					'bazaar.maps.loss': 0,
					'cargo.rounds.win': 0,
					'cargo.rounds.loss': 0,
					'cargo.maps.win': 0,
					'cargo.maps.loss': 0,
					'downfall.rounds.win': 0,
					'downfall.rounds.loss': 0,
					'downfall.maps.win': 0,
					'downfall.maps.loss': 0,
					'quarantine.rounds.win': 0,
					'quarantine.rounds.loss': 0,
					'quarantine.maps.win': 0,
					'quarantine.maps.loss': 0,
					'suburbia.rounds.win': 0,
					'suburbia.rounds.loss': 0,
					'suburbia.maps.win': 0,
					'suburbia.maps.loss': 0,
					'subway.rounds.win': 0,
					'subway.rounds.loss': 0,
					'subway.maps.win': 0,
					'subway.maps.loss': 0,
					'tanker.rounds.win': 0,
					'tanker.rounds.loss': 0,
					'tanker.maps.win': 0,
					'tanker.maps.loss': 0
				}
			}
			Team.updateMany({season: season}, update, function(err){
				if(err){
					console.error(err);
					reject(err);
				}
				resolve();
			})
		});
	},
	'findOneTeam': (teamName, season) => {
		return new Promise((resolve, reject) => {
			let query = {
				"team": teamName,
				"season": season
			}
			Team.findOne(query, '-__v -_id', function (err, result) {
				if (err) {
					console.error(err);
					reject(err);
				}
				resolve(result);
			});
		});
	},
	'findTwoTeams': (teamNames, season) => {
		return new Promise((resolve, reject) => {
			let query = {
				$or: [{
						'team': teamNames[0]
					},
					{
						'team': teamNames[1]
					}
				],
				"season": season
			}
			Team.find(query, '-__v -_id', function (err, results) {
				if (err) {
					console.error(err);
					reject(err);
				}
				resolve(results);
			});
		});
	},
	'updateOneMap': (mapData, season) => {
		return new Promise((resolve, reject) => {
			if (mapData['map'] != 'other') {
				let query = {
					'team': mapData['teamName'],
					'season': season
				}
				Team.findOne(query, function (err, team) {
					if (err) {
						console.error(err);
						reject(err);
					}
					if (team == null) {
						resolve();
					} else {
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
						team.update({
							$inc: update
						}, function (err, team) {
							if (err) {
								console.error(err);
								reject(err);
							}
							resolve();
						})
					}
				});
			} else {
				resolve();
			}
		});
	}
}

module.exports = TeamFunctions;