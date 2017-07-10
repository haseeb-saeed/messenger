'use strict';

const config = require('./config');
const mongoose = require('mongoose');

module.exports = function() {
	mongoose.Promise = global.Promise;
	const db = mongoose.connect(config.db);

	// TODO: Require models here
	require('../app/models/user');
	require('../app/models/chat');
	require('../app/models/message');

	return db;
};