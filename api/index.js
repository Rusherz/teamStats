const express = require('express');
const mongoose = require('mongoose');
const path = require('path');
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');
const passport = require('passport')
const LocalStrategy = require('passport-local').Strategy;

const app = express();
const charts = require('./routes/charts/charts');
const matches = require('./routes/matches');
const users = require('./routes/users');

//Body Parser Middleware
app.use(bodyParser.urlencoded({
	extended: false
}));
app.use(bodyParser.json());
app.use(cookieParser());

app.use(function (req, res, next) {
	res.header('Access-Control-Allow-Origin', '*');
	res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE,PATCH,OPTIONS');
	res.header('Access-Control-Allow-Headers', 'Content-Type, Authorization, Content-Length, X-Requested-With');
	// allow preflight
	if (req.method === 'OPTIONS') {
		res.sendStatus(200);
	} else {
		next();
	}
});

mongoose.connect('mongodb://db_user:db_user_123@ds227853.mlab.com:27853/onward_stats', {
		useNewUrlParser: true
	})
	.then(() => console.log('MongoDB Connected'))
	.catch(err => console.log(err));

app.use(passport.initialize());
app.use(passport.session());

app.use('/api/charts', charts);
app.use('/api/matches', matches);
app.use('/api/users', users);

const port = 4000;

app.listen(port, () => console.log(`Server running on port ${port}`));
