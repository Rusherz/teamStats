//Team Model
const Season = require("../../models/Season");

let SeasonFunctions = {
	'getTeamNames': () => {
		return new Promise((resolve, reject) => {
			Season.find({}, '-_id', function (err, results) {
				if (err) {
					console.error(err);
					reject(err);
				}
				resolve(results);
			});
		});
	},
	'insertOneSeason': (season_data) => {
		return new Promise((resolve, reject) => {
			let query = {
				season: season_data['season'],
				start_date: new Date(season_data['start_data']),
				end_date: new Date(season_data['end_data'])
			}
			Season.find(query, function (err, results) {
				if (err) {
					console.error(err);
					reject(err);
				}
				if (results.length == 0) {
					let season = new Season();
					season['season'] = season_data['season'];
					season['startDate'] = season_data['startDate'];
					season['endDate'] = season_data['endDate'];
					season.save(function (err, season) {
						if (err) {
							console.error(err);
							reject(err);
						}
						console.log(season)
						resolve(true);
					})
				}else{
					resolve(false);
				}
			});
		});
	},
	'findSeason': (season) => {
		return new Promise((resolve, reject) => {
			Season.findOne({season: season}, function(err, result) {
				if(err){
					console.error(err);
					reject(err);
				}
				resolve(result);
			})
		});
	},
	'findCurrentSeason': (season) => {
		return new Promise((resolve, reject) => {
			Season.findOne({endDate: {$exists: false}}, function(err, result) {
				if(err){
					console.error(err);
					reject(err);
				}
				resolve(result);
			})
		});
	},
	'updateOneSeason': (season, endDate) => {
		return new Promise((resolve, reject) => {
			Season.updateOne({season: season}, {$set: {endDate: endDate}}, function(err, season){
				if(err){
					console.error(err);
					reject()
				}
				resolve(season);
			});
		});
	}
}

module.exports = SeasonFunctions;
