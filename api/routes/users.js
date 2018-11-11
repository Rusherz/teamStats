"use strict"
const router = require("express").Router();
const User = require('../models/User');
const passport = require('passport');

router.route('/').post((req, res) => {
	let user = new User(req.body);

	User.createUser(user).then((user) => {
		console.log('Created User', user.username);
		res.json('success');
	});
});



router.route('/test', passport.authenticate('local'), (req, res) => {
	res.send('this worked?');
})

module.exports = router;