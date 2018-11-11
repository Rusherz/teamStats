"use strict"
const router = require("express").Router();
const MatchFunctions = require("../../shared/MatchFunctions");
const SeasonFunctions = require("../../shared/SeasonFunctions");

router.route('/').post((req, res) => {
  SeasonFunctions.findSeason(req.body.season).then((season) => {
    if (season != undefined) {
      if (season['endDate'] == undefined) season['endDate'] = new Date();
      let query = {
        $and: [{
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
      return MatchFunctions.findAllMatches(query);
    } else {
      return MatchFunctions.findAllMatches();
    }
  }).then((matches) => {
    let mapData = {
      'bazaar': {
        'marsoc': 0,
        'volk': 0
      },
      'cargo': {
        'marsoc': 0,
        'volk': 0
      },
      'downfall': {
        'marsoc': 0,
        'volk': 0
      },
      'quarantine': {
        'marsoc': 0,
        'volk': 0
      },
      'suburbia': {
        'marsoc': 0,
        'volk': 0
      },
      'subway': {
        'marsoc': 0,
        'volk': 0
      },
      'tanker': {
        'marsoc': 0,
        'volk': 0
      }
    }
    for (let match of matches) {
      for (let i = 1; i < 4; i++) {
        if (match['map' + i]['mapName'] == 'other') continue;
				if(parseInt(match['map' + i]['homeTeam']['marsocWins']) != 0) console.log(parseInt(match['map' + i]['homeTeam']['marsocWins']));
        mapData[match['map' + i]['mapName']]['marsoc'] += parseInt(match['map' + i]['homeTeam']['marsocWins']);
        mapData[match['map' + i]['mapName']]['marsoc'] += parseInt(match['map' + i]['awayTeam']['marsocWins']);

        mapData[match['map' + i]['mapName']]['volk'] += parseInt(match['map' + i]['homeTeam']['volkWins']);
        mapData[match['map' + i]['mapName']]['volk'] += parseInt(match['map' + i]['awayTeam']['volkWins']);
      }
    }
		console.log(mapData);
    let dataPoints = [];
    dataPoints.push({
      label: 'Marsoc Wins',
      backgroundColor: 'rgba(0,0,255,0.5)',
      borderColor: 'rgb(0,0,255)',
      borderWidth: '2',
      fill: true,
      data: [mapData['bazaar']['marsoc'], mapData['cargo']['marsoc'], mapData['downfall']['marsoc'], mapData['quarantine']['marsoc'], mapData['suburbia']['marsoc'], mapData['subway']['marsoc'], mapData['tanker']['marsoc']]
    });
    dataPoints.push({
      label: 'Volk Wins',
      backgroundColor: 'rgba(255,0,0,0.5)',
      borderColor: 'rgb(255,0,0)',
      borderWidth: '2',
      fill: true,
      data: [mapData['bazaar']['volk'], mapData['cargo']['volk'], mapData['downfall']['volk'], mapData['quarantine']['volk'], mapData['suburbia']['volk'], mapData['subway']['volk'], mapData['tanker']['volk']]
    });
    res.json(dataPoints);
  });
});

module.exports = router;
