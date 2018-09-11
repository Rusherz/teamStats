let router = require('express').Router();
let db = require('../shared/db');

router.post('/', (req, res) => {
    let team = req.body.teamName;
    let map = req.body.mapName;
    let season = req.body.season;
    let db_params = {
        database: season,
        collection: 'matches',
        query: {
            '$and': [{
                '$or': [
                    {
                        'homeTeam': team
                    },
                    {
                        'awayTeam': team
                    }
                ]
            }, {
                '$or': [
                    {
                        'map1.mapName': map
                    },
                    {
                        'map2.mapName': map
                    },
                    {
                        'map3.mapName': map
                    }
                ]
            }
            ]
        },
        sort:{
            date: 1
        },
        filters: {}
    }
    db.find(db_params, function (matches) {
        let dataPoints = [
            {
                label:'Win',
                borderColor: 'rgb(0,0,255)',
                data: []
            },
            {
                label: 'Loss',
                borderColor: 'rgb(255,0,0)',
                data: []
            }
        ]
        let labels = []
        let count = 0;
        for (let match of matches) {
            let win = 'scoreHome';
            let loss = 'scoreAway';
            let otherTeam = 'awayTeam';
            if (match['awayTeam'] == team) {
                win = 'scoreAway';
                loss = 'scoreHome'
                otherTeam = 'homeTeam';
            }
            labels.push({
                date: match['date'],
                team: match[otherTeam]
            })
            let mapNumber = 1
            if (match['map2']['mapName'] == map) mapNumber = 2;
            if (match['map3']['mapName'] == map) mapNumber = 3;
            dataPoints[0]['data'].push(match['map' + mapNumber][win])
            dataPoints[1]['data'].push(match['map' + mapNumber][loss])
            if (count == matches.length - 1) {
                res.json({dataPoints: dataPoints, labels: labels});
            } else {
                count++;
            }
        }
    })
})

module.exports = router;