let func = require('./function/function');
let MatchFunctions = require('./function/MatchFunctions');
let TeamFunctions = require('./function/TeamFunctions');
let db = require('./config/db');
let express = require('express');
let path = require('path')
let app = express();
let configRoute = require('./routes/config')
let bodyParser = require("body-parser");
let request = require('request');
let cheerio = require('cheerio');

app.use(bodyParser.urlencoded({
    extended: true
}));
app.use(bodyParser.json());

app.use(function (req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
});

//app.use(express.static(path.join(__dirname, 'public')));

app.get('/', (req, res) => {
    let season = req.query['season']
    func.resetCallbackVariables(function () {
        func.getMatches(function () {
            func.getAllMatchInfo(season, function () {
                MatchFunctions.updateLastDate(season, function (data) {
                    res.json(data);
                });
            });
        });
    })
});

app.use('/config', configRoute);

app.get('/getLastUpdated', (req, res) => {
    MatchFunctions.getLastUpdated(req.query['season'], function (data) {
        res.json(data);
    });
});

app.post('/seasonData', (req, res) => {
    func.resetCallbackVariables(function () {
        func.getOldTeamMatches(req.body['seasonUrl'], function () {
            func.getAllMatchInfo(req.body['season'], function () {
                res.json({ 'result': 'done' });
            })
        })
    })
});

app.get('/findTeam', (req, res) => {
    MatchFunctions.fineOneTeamMatches('Stone Cold Killers', function (data) {
        res.json(data);
    })
});

app.post('/chartwinloss', (req, res) => {
    let body = req.body;
    if (body['teamNames'] && body['teamNames'].length == 1) {
        TeamFunctions.findOneTeam(body['season'], body['teamNames'][0], function (team) {
            let dataPoints = [];
            dataPoints.push({
                label: team['team'] + ' wins',
                backgroundColor: 'rgba(0,0,255,0.5)',
                borderColor: 'rgb(0,0,255)',
                borderWidth: '2',
                fill: true,
                data: [team['bazaar'][body['roundsMaps']]['win'], team['cargo'][body['roundsMaps']]['win'], team['downfall'][body['roundsMaps']]['win'], team['quarantine'][body['roundsMaps']]['win'], team['suburbia'][body['roundsMaps']]['win'], team['subway'][body['roundsMaps']]['win'], team['tanker'][body['roundsMaps']]['win']]
            });
            dataPoints.push({
                label: team['team'] + ' losses',
                backgroundColor: 'rgba(255,0,0,0.5)',
                borderColor: 'rgb(255,0,0)',
                borderWidth: '2',
                fill: true,
                data: [team['bazaar'][body['roundsMaps']]['loss'], team['cargo'][body['roundsMaps']]['loss'], team['downfall'][body['roundsMaps']]['loss'], team['quarantine'][body['roundsMaps']]['loss'], team['suburbia'][body['roundsMaps']]['loss'], team['subway'][body['roundsMaps']]['loss'], team['tanker'][body['roundsMaps']]['loss']]
            })
            res.json(dataPoints);
        });
    } else if (body['teamNames'] && body['teamNames'].length == 2) {
        TeamFunctions.findTwoTeams(body['season'], body['teamNames'], function (teams) {
            let dataPoints = []
            let count = 0;
            for (let index in teams) {
                let winColor = 'rgba(0,0,255,0.5)';
                let lossColor = 'rgba(255,0,0,0.5)';
                let winBorder = 'rgb(0,0,255)';
                let lossBorder = 'rgb(255,0,0)';
                if (index == 1) {
                    winColor = 'rgba(0,107,107,0.5)';
                    lossColor = 'rgba(255,116,0,0.5)';
                    winBorder = 'rgb(0,107,107)';
                    lossBorder = 'rgb(255,116,0)';
                }
                dataPoints.push({
                    label: teams[index]['team'] + ' wins',
                    backgroundColor: winColor,
                    borderColor: winBorder,
                    borderWidth: '2',
                    fill: true,
                    data: [teams[index]['bazaar'][body['roundsMaps']]['win'], teams[index]['cargo'][body['roundsMaps']]['win'], teams[index]['downfall'][body['roundsMaps']]['win'], teams[index]['quarantine'][body['roundsMaps']]['win'], teams[index]['suburbia'][body['roundsMaps']]['win'], teams[index]['subway'][body['roundsMaps']]['win'], teams[index]['tanker'][body['roundsMaps']]['win']]
                });
                dataPoints.push({
                    label: teams[index]['team'] + ' losses',
                    backgroundColor: lossColor,
                    borderColor: lossBorder,
                    borderWidth: '2',
                    fill: true,
                    data: [teams[index]['bazaar'][body['roundsMaps']]['loss'], teams[index]['cargo'][body['roundsMaps']]['loss'], teams[index]['downfall'][body['roundsMaps']]['loss'], teams[index]['quarantine'][body['roundsMaps']]['loss'], teams[index]['suburbia'][body['roundsMaps']]['loss'], teams[index]['subway'][body['roundsMaps']]['loss'], teams[index]['tanker'][body['roundsMaps']]['loss']]
                })
                if (count == teams.length - 1) {
                    res.json(dataPoints);
                } else {
                    count++;
                }
            }
        });
    } else {
        TeamFunctions.findAllTeams(body['season'], function (teams) {
            let dataPoints = []
            let count = 0;
            for (let team of teams) {
                dataPoints.push({
                    label: team['team'] + ' wins',
                    backgroundColor: '#0000FF',
                    fill: true,
                    data: [team['bazaar'][body['roundsMaps']]['win'], team['cargo'][body['roundsMaps']]['win'], team['downfall'][body['roundsMaps']]['win'], team['quarantine'][body['roundsMaps']]['win'], team['suburbia'][body['roundsMaps']]['win'], team['subway'][body['roundsMaps']]['win'], team['tanker'][body['roundsMaps']]['win']]
                });
                dataPoints.push({
                    label: team['team'] + ' losses',
                    backgroundColor: '#FF0000',
                    fill: true,
                    data: [team['bazaar'][body['roundsMaps']]['loss'], team['cargo'][body['roundsMaps']]['loss'], team['downfall'][body['roundsMaps']]['loss'], team['quarantine'][body['roundsMaps']]['loss'], team['suburbia'][body['roundsMaps']]['loss'], team['subway'][body['roundsMaps']]['loss'], team['tanker'][body['roundsMaps']]['loss']]
                })
                if (count == teams.length - 1) {
                    res.json(dataPoints);
                } else {
                    count++;
                }
            }
        });
    }
})

app.listen(4000, (err) => {
    if (err) console.error(err)
    console.info("server started on port 4000");
})