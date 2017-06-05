'use strict';

(function() {
	angular
		.module('messengerApp')
		.controller('LoginController', LoginController);

	LoginController.$inject = ['AuthService'];

	function LoginController(AuthService) {
		let vm = this;
		vm.login = login;

		function login(user) {
			AuthService.login(user);
		}
	}
})();