'use strict';

const config = require('../../config/config.js');
const jwt = require('jsonwebtoken');
const User = require('mongoose').model('User');

const EXPIRY_TIME = 9999999;

exports.register = function(req, res, next) {
	if (req.body.password !== req.body.confirmedPassword) {
		return res.status(422).json({error: 'The provided passwords do not match'});
	} 

	const newUser = new User(req.body);
	newUser.save(function(err, user) {
		console.log(err);
		if (err) {
			if (err.code = 11000) {
				return res.status(422).json({error: 'A user with the provided username already exists'});
			}

			return next(err);
		}

		return res.json({token: createToken(user), user: user});
	});
};

exports.authenticate = function(req, res, next) {
	User.findOne({
		username: req.body.username,
	}, function(err, user) {
		if (err) {
			return next(err);
		} else if (!user) {
			return res.status(422).json({error: 'The username or password provided is incorrect'});
		} else if (!user.comparePassword(req.body.password)) {
			return res.status(422).json({error: 'The username or password provided is incorrect'});
		}

		return res.json({token: createToken(user), user: user});
	});
};

exports.decode = function(req, res) {
	return res.json({decoded: req.decoded});
}

function createToken(user) {
	return jwt.sign(user.toJSON(), config.jwtSecret, {
		expiresIn: EXPIRY_TIME,
	});
}