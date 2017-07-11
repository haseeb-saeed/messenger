'use strict';

module.exports = function(io) {
	io.on('connection', function(socket) {
		console.log('CHAT SOCKET TRIGGERED');
	});
};