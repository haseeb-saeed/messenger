'use strict';

const config = require('../../config/config.js');
const jwt = require('jsonwebtoken');
const User = require('mongoose').model('User');

const EXPIRY_TIME = 1440;

exports.register = function(req, res, next) {
	const newUser = new User(req.body);
	newUser.save(function(err, user) {
		if (err) {
			return next(err);
		}

		return res.json(user);
	});
};

exports.authenticate = function(req, res, next) {
	User.findOne({
		username: req.body.username,
	}, function(err, user) {
		if (err) {
			return next(err);
		} else if (!user) {
			return res.json({error: 'User does not exist'});
		} else if (!user.comparePassword(req.body.password)) {
			return res.json({error: 'Incorrect password'});
		}

		const token = jwt.sign(user.toJSON(), config.jwtSecret, {
			expiresIn: EXPIRY_TIME,
		});

		return res.json({token: token});
	});
};

exports.decode = function(req, res) {
	return res.json({decoded: req.decoded});
}