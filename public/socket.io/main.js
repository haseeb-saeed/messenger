'use strict';

$(function() {
	const CONNECTION = 'connection';
	const DISCONNECT = 'disconnect';
	const MESSAGE = 'message';
	const START_TYPING = 'start_typing';
	const STOP_TYPING = 'stop_typing';

	const socket = io();
	let typingTimeout = 1;
	let sentTypingMessage = false;

	const appendUserMessage = function(msg) {
		appendMessage('Me: ' + msg);
	};

	const appendOtherMessage = function(msg) {
		appendMessage('You: ' + msg);
	}

	const appendMessage = function(msg) {
		$('#messages').append($('<li>').text(msg));
	};

	const clearMessage = function() {
		$('#m').val('');
	}

	$('form').submit(function() {
		const msg = $('#m').val();
		socket.emit(MESSAGE, msg);

		appendUserMessage(msg);
		clearMessage();

		return false;
	});

	$('#m').keypress(function() {
		if (typingTimeout) {
			clearTimeout(typingTimeout);
			typingTimeout = null;

			if (!sentTypingMessage) {
				console.log('Started typing');
				socket.emit(START_TYPING);
				sentTypingMessage = true;
			}
		}

		typingTimeout = setTimeout(function() {
			console.log('Stopped typing');
			socket.emit(STOP_TYPING);
			sentTypingMessage = false;
		}, 500);
	});

	socket.on(MESSAGE, function(msg) {
		appendOtherMessage(msg);
	});

	socket.on(START_TYPING, function() {
		$('#typing').show();
	});

	socket.on(STOP_TYPING, function() {
		$('#typing').hide();
	});

	socket.on(CONNECTION, function() {
		$('#connect').show();
		setTimeout(function() {
			$('#connect').hide();
		}, 1000);
	});

	socket.on(DISCONNECT, function() {
		$('#disconnect').show();
		setTimeout(function() {
			$('#disconnect').hide();
		}, 1000);
	});
});