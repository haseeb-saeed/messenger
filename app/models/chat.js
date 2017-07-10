'use strict';

const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const ChatSchema = new Schema({
	name: {
		type: String,
		required: true,
		unique: true,
	},
	participants: [{
		type: Schema.Types.ObjectId,
		ref: 'User',
	}],
});

ChatSchema.methods.toJSON = function() {
	const chat = this.toObject();
	return chat;
};

mongoose.model('Chat', ChatSchema);