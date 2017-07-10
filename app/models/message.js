'use strict';

const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const MessageSchema = new Schema({
	chat: {
		type: Schema.Types.ObjectId,
		ref: 'Chat',
		required: true,
	},
	author: {
		type: Schema.Types.ObjectId,
		ref: 'User',
		required: true,
	},
	content: {
		type: String,
		required: true,

	},
});

MessageSchema.methods.toJSON = function() {
	const message = this.toObject();
	return message;
};

mongoose.model('Message', MessageSchema);