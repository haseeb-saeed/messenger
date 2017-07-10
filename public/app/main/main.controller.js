'use strict';

(function() {
	angular
		.module('messengerApp')
		.controller('MainController', MainController);

	MainController.$inject = ['$location', 'AuthService', 'ChatService'];

	function MainController($location, AuthService, ChatService) {
		let vm = this;
		vm.name = AuthService.getCurrentUser().name;
		vm.chats = ChatService.query();
		vm.logout = logout;

		function logout() {
			AuthService.logout();
			$location.path('/login');
		}
	}
})();