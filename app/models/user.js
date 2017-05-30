'use strict';

const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const UserSchema = new Schema({
	name: {
		type: String,
		required: true,
	},
	username: {
		type: String,
		trim: true,
		unqiue: true,
		required: true,
	},
	password: {
		type: String,
		required: true,
	},
});

UserSchema.methods.toJSON = function() {
	const user = this.toObject();

	// Only username and name should be known
	delete user.password;

	return user;
};

mongoose.model('User', UserSchema);