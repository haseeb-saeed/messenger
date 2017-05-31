'use strict';

const config = require('../../config/config.js');
const jwt = require('jsonwebtoken');

modeule.exports = function(req, res, next) {
	const token = req.body.token || req.query.token || req.headers['x-access-token'];

	if (!token) {
		// TODO: Return no token provided
	}

	jwt.verify(token, config.jwtSecret, function(err, decoded) {
		if (err) {
			// TODO: Return error
		}

		req.decoded = decoded;
		next();
	});
};