'use strict';

const config = require('../../config/config.js');
const jwt = require('jsonwebtoken');

const TOKEN_EXPIRED_ERROR = 'TokenExpiredError';

module.exports = function(req, res, next) {
	const token = req.body.token || req.query.token || req.headers['x-access-token'];

	if (!token) {
		return res.json({error: 'No token provided'});
	}

	jwt.verify(token, config.jwtSecret, function(err, decoded) {
		if (err) {
			if (err.name === TOKEN_EXPIRED_ERROR) {
				return res.json({error: 'Token expired'});
			}

			return next(err);
		}

		req.decoded = decoded;
		next();
	});
};