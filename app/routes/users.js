'use strict';

const users = require('../controllers/users');

module.exports = function(app) {
	app.route('/users/register')
		.post(users.register);

	app.route('/users/authenticate')
		.post(users.authenticate);
};