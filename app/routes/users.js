'use strict';

const users = require('../controllers/users');
const verifyToken = require('../middleware/verifyToken');

module.exports = function(app) {
	app.route('/users/register')
		.post(users.register);

	app.route('/users/authenticate')
		.post(users.authenticate);

	app.route('/users/decode')
		.post(verifyToken, users.decode);
};