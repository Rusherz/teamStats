let router = require('express').Router();
let MatchFunctions = require('../shared/MatchFunctions');

router.post('/', (req, res) => {
    MatchFunctions.findAllMatches(req.body['season']).then(results => {
		let wins = {
			bazaarHome: 0,
			bazaarAway: 0,
			cargoHome: 0,
			cargoAway: 0,
			downfallHome: 0,
			downfallAway: 0,
			quarantineHome: 0,
			quarantineAway: 0,
			suburbiaHome: 0,
			suburbiaAway: 0,
			subwayHome: 0,
			subwayAway: 0,
			tankerHome: 0,
			tankerAway: 0,
		}
		for (let map of results) {
			if (map['map1']) {
				if(map['map1']['scoreHome'] > map['map1']['scoreAway']){
					wins[map['map1']['mapName'] + 'Home']++;
				}else{
					wins[map['map1']['mapName'] + 'Away']++;
				}
			}else if (map['map2']) {
				if(map['map2']['scoreHome'] > map['map2']['scoreAway']){
					wins[map['map2']['mapName'] + 'Home']++;
				}else{
					wins[map['map2']['mapName'] + 'Away']++;
				}
			}else if (map['map3']) {
				if(map['map3']['scoreHome'] > map['map3']['scoreAway']){
					wins[map['map3']['mapName'] + 'Home']++;
				}else{
					wins[map['map3']['mapName'] + 'Away']++;
				}
			}
		}
		let dataPoints = [];
		dataPoints.push({
			label: 'Home Team Wins',
			backgroundColor: 'rgba(0,0,255,0.5)',
			borderColor: 'rgb(0,0,255)',
			borderWidth: '2',
			fill: true,
			data: [wins['bazaarHome'], wins['cargoHome'], wins['downfallHome'], wins['quarantineHome'], wins['suburbiaHome'], wins['subwayHome'], wins['tankerHome']]
		});
		dataPoints.push({
			label: 'Away Team Wins',
			backgroundColor: 'rgba(255,0,0,0.5)',
			borderColor: 'rgb(255,0,0)',
			borderWidth: '2',
			fill: true,
			data: [wins['bazaarAway'], wins['cargoAway'], wins['downfallAway'], wins['quarantineAway'], wins['suburbiaAway'], wins['subwayAway'], wins['tankerAway']]
		});
		res.json(dataPoints);
	});
})

module.exports = router;