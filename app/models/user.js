'use strict';

const bcrypt = require('bcrypt');
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
		unique: true,
		required: true,
	},
	password: {
		type: String,
		required: true,
	},
});

UserSchema.pre('save', function(next) {
	if (this.password) {
		this.password = bcrypt.hashSync(this.password, 10);
	}

	next();
});

UserSchema.methods.comparePassword = function(password) {
	return bcrypt.compareSync(password, this.password);
};

UserSchema.methods.toJSON = function() {
	const user = this.toObject();

	// Only username and name should be known
	delete user.password;

	return user;
};

mongoose.model('User', UserSchema);