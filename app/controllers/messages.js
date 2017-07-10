'use strict';

const config = require('../../config/config.js');
const jwt = require('jsonwebtoken');
const Message = require('mongoose').model('Message');

exports.list = function(req, res, next) {
	const chatId = req.chat._id;

	Message
		.find({chat: chatId})
		.exec(function(err, messages) {
			if (err) {
				return next(err);
			}

			return res.json(messages);
		});
};

exports.create = function(req, res, next) {
	const chatId = req.chat._id;
	const userId = req.decoded._id;

	const message = new Message(req.body.message);
	message.chat = chatId;
	message.author = userId;

	message.save(function(err) {
		if (err) {
			return next(err);
		}

		return res.json(message);
	});
};

exports.read = function(req, res) {
	return res.json(req.message);
};

exports.getMessageById = function(req, res, next, id) {
	Message.findOne({
		_id: id,
	}, function(err, message) {
		if (err) {
			next(err);
		} else {
			req.message = message;
			next();
		}
	});
};