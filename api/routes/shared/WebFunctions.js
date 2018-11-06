let request = require('request');
let cheerio = require('cheerio');
let matches = new Array();

let getmatchInfo = function (match) {
	return new Promise((resolve, reject) => {
		if (match['homeTeam'] == '' && match['awayTeam'] == '') resolve();
		let options = {
			uri: 'https://vrmasterleague.com/Services.asmx/GetMatchSets',
			form: {
				encrValue: match['matchSet']
			}
		}
		request.post(options, function (err, res, body) {
			match['date'] = new Date(match['date']);
			let maps = JSON.parse(body.substring(body.indexOf('['), body.indexOf(']') + 1));
			for (let map_index in maps) {
				match['map' + (parseInt(map_index) + 1)] = {
					mapName: maps[map_index]['Map'].toLowerCase().split(" ")[0],
					scoreHome: maps[map_index]['ScoreHome'],
					scoreAway: maps[map_index]['ScoreAway']
				}
				if (map_index == maps.length - 1) {
					resolve();
				}
			}
		});
	});
}

module.exports = {
	'getAllMatchInfo': () => {
		return new Promise((resolve, reject) => {
			let results = Promise.all(matches.map(getmatchInfo))
			results.then(() => resolve(matches));
		});
	},
	'getMatches': () => {
		matches = new Array();
		return new Promise((resolve, reject) => {
			request.get('https://vrmasterleague.com/Onward/Matches.aspx', function (err, res, body) {
				let $ = cheerio.load(body);
				let string = ''
				let count = 0;
				let num_matches = $('#MatchesRecent_MatchesNode .matches_table tr').length;
				$('#MatchesRecent_MatchesNode .matches_table tr').each((index, element) => {
					let date = '';
					let homeTeam = '';
					let awayTeam = '';
					let matchSet = '';
					$(element).find('td').each((i, elm) => {
						switch (i) {
							case 0:
								date = new Date($(elm).children().first().text()).toUTCString();
							case 2:
								homeTeam = $(elm).children().last().text()
								break;
							case 3:
								let matchSetString = $(elm).children().first().attr('onclick').toString();
								matchSet = matchSetString.substring(matchSetString.indexOf('"') + 1, matchSetString.lastIndexOf('"'))
								break;
							case 4:
								awayTeam = $(elm).children().first().text()
								break;
						}
						if (i == $(element).find('td').length - 1) {
							if (homeTeam != '' && awayTeam != '' && date != '' && matchSet != '') {
								matches.push({
									date: date,
									homeTeam: homeTeam,
									awayTeam: awayTeam,
									matchSet: matchSet
								});
							}
							count++;
							if (count == num_matches - 1) {
								console.log('finished getMacthes')
								resolve();
							}
						}
					});
				});
			});
		});
	},
	'getOldTeamMatches': (seasonUrl, callback) => {
		request.get(seasonUrl, function (err, result, body) {
			let $ = cheerio.load(body);
			let string = ''
			let count = 0;
			let num_matches = $('#Team_TeamsNode .teams_recent_matches_table tbody tr').length;
			$('#Team_TeamsNode .teams_recent_matches_table tbody tr').each((index, element) => {
				let date = '';
				let homeTeam = '';
				let awayTeam = '';
				let matchSet = '';
				$(element).find('td').each((i, elm) => {
					switch (i) {
						case 0:
							date = new Date($(elm).children().first().text()).toUTCString();
						case 2:
							homeTeam = $(elm).children().last().text()
							break;
						case 3:
							let matchSetString = $(elm).children().first().attr('onclick').toString();
							matchSet = matchSetString.substring(matchSetString.indexOf('"') + 1, matchSetString.lastIndexOf('"'))
							break;
						case 4:
							awayTeam = $(elm).children().first().text()
							break;
					}
				});
				if (homeTeam != '' && awayTeam != '' && date != '' && matchSet != '') {
					matches.push({
						date: date,
						homeTeam: homeTeam,
						awayTeam: awayTeam,
						matchSet: matchSet
					});
				}
				count++;
				if (count == num_matches - 1) {
					if (!getMatchesCB) {
						getMatchesCB = true;
						callback();
					}
				}
			});
		});
	},
	'getTeams': () => {
		let teams = [];
		return new Promise((resolve, reject) => {
			request.get('https://vrmasterleague.com/Onward/Standings.aspx/d3JZU1F5WlVraGc90', function (err, result, body) {
				let $ = cheerio.load(body);
				let num_teams = $('#Standings_StandingsNode .standings_table tbody tr').length;
				$('#Standings_StandingsNode .standings_table tbody tr').each((index, element) => {
					teams.push($(element).find('.team_cell').text());
					if(index == num_teams - 1){
						resolve(teams);
					}
				});
			});
		});
	}
}