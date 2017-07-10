'use strict';

const config = require('../../config/config.js');
const jwt = require('jsonwebtoken');
const Chat = require('mongoose').model('Chat');

exports.list = function(req, res, next) {
	const userId = req.decoded._id;

	Chat
		.find()
		.populate('participants', '-password')
		.exec(function(err, chats) {
			if (err) {
				return next(err);
			}

			return res.json(chats);
		});
};

exports.create = function(req, res, next) {
	const userId = req.decoded._id;
	const chat = new Chat(req.body.chat);

	chat.participants.push(userId);

	chat.save(function(err) {
		if (err) {
			return next(err);
		}

		return res.json(chat);
	});
};

exports.read = function(req, res) {
	return res.json(req.chat);
};

exports.getChatById = function(req, res, next, id) {
	Chat.findOne({
		_id: id,
	}, function(err, chat) {

		if (err) {
			next(err);
		} else {
			req.chat = chat;
			next();
		}
	});

}