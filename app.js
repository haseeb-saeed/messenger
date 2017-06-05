'use strict';

process.env.NODE_ENV = process.env.NODE_ENV || 'development';

const config = require('./config/config');
const express = require('./config/express');
const mongoose = require('./config/mongoose');

const app = express();
const db = mongoose();
const server = require('http').Server(app);
const io = require('socket.io')(server);

const CONNECTION = 'connection';
const DISCONNECT = 'disconnect';
const MESSAGE = 'message';
const START_TYPING = 'start_typing';
const STOP_TYPING = 'stop_typing';

// Require routes here
app.use('/users', require('./app/routes/users'));

app.get('/', function(req, res) {
	res.sendFile(__dirname + '/public/index.html');
});

io.on(CONNECTION, function(socket) {
	console.log('A user connected');
	//socket.broadcast.emit(CONNECTION);

	socket.on(DISCONNECT, function() {
		console.log('User disconnected');
		//socket.broadcast.emit(DISCONNECT);
	});

	socket.on(MESSAGE, function(msg) {
		socket.broadcast.emit(MESSAGE, msg);
		//io.emit('message', msg);
	});

	socket.on(START_TYPING, function() {
		socket.broadcast.emit(START_TYPING);
	});

	socket.on(STOP_TYPING, function() {
		socket.broadcast.emit(STOP_TYPING);
	});
});

server.listen(config.port, function() {
	console.log('Listening on port ' + config.port);
});