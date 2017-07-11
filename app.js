'use strict';

process.env.NODE_ENV = process.env.NODE_ENV || 'development';

const config = require('./config/config');
const express = require('./config/express');
const mongoose = require('./config/mongoose');

const app = express();
const db = mongoose();
const server = require('http').Server(app);
const io = require('socket.io')(server);

// Require routes here
app.use('/users', require('./app/routes/users'));
app.use('/chats', require('./app/routes/chats'));

app.get('/', function(req, res) {
	res.sendFile(__dirname + '/public/index.html');
});

// Require socket files here
require('./app/socket.io/chats')(io);
require('./app/socket.io/messages')(io);

server.listen(config.port, function() {
	console.log('Listening on port ' + config.port);
});