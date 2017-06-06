'use strict';

(function() {
	angular
		.module('messengerApp')
		.controller('RegisterController', RegisterController);

	RegisterController.$inject = ['AuthService'];

	function RegisterController(AuthService) {
		let vm = this;
		vm.register = register;

		function register(user) {
			AuthService.register(user);
		}
	}
})();