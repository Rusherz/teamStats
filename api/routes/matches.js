const router = require("express").Router();
const MatchFunctions = require("./shared/MatchFunctions");

router.route('/')
	.get((req, res) => {
		MatchFunctions.findAllMatches().then((matches) => {
			res.json(matches);
		});
	});

router.route('/:id')
	.patch((req, res) => {
		MatchFunctions.updateOneMatch(req.params.id, req.body).then(results => {
			res.json(results);
		});
	});

module.exports = router;