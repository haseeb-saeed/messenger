'use strict';

const config = require('../../config/config.js');
const jwt = require('jsonwebtoken');
const User = require('mongoose').model('User');

const EXPIRY_TIME = 9999999;

exports.register = function(req, res, next) {
	const newUser = new User(req.body);
	newUser.save(function(err, user) {
		console.log(err);
		if (err) {
			if (err.code = 11000) {
				return res.status(422).json({error: 'User already exists'});
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
			return res.status(422).json({error: 'User does not exist'});
		} else if (!user.comparePassword(req.body.password)) {
			return res.status(422).json({error: 'Incorrect password'});
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