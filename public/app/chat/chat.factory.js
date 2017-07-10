'use strict';

(function() {
	angular
		.module('messengerApp')
		.factory('ChatService', ChatService);

	ChatService.$inject = ['$resource'];

	function ChatService($resource) {
		return $resource('/chats/:chatId', null);
	}
})();