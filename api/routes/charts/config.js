"use strict"
const router = require('express').Router();
const SeasonFunctions = require('../shared/SeasonFunctions');

router.route('/createseason')
	.post((req, res, next) => {
		let endOldSeason = req.body.endSeason;
		let oldSeasonName = req.body.oldSeasonName;
		let season = {
			season: req.body.seasonName,
			start_date: req.body.startSeason
		}
		SeasonFunctions.updateOneSeason(oldSeasonName, endOldSeason).then(() => {
			return SeasonFunctions.insertOneSeason(season);
		}).then((inserted) => {
			res.send(inserted);
		}).catch(next);
	});

module.exports = router;
